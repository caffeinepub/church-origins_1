import Text "mo:core/Text";
import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


// (with { migration = Migration.run })

actor {
  module Testimony {
    public type State = {
      #pendingModeration;
      #approved;
      #rejected : Text; // Rejection reason
    };
  };

  // Types and Data Structures
  public type UserProfile = {
    name : Text;
    lifeSituation : Text;
    spiritualNeeds : Text;
  };

  public type Testimony = {
    authorId : Principal;
    content : Text;
    labels : [Text];
    disclaimers : [Text];
    scriptureReferences : [Text];
    state : Testimony.State;
    moderatorNote : ?Text;
  };

  public type ScriptureEntry = {
    text : Text;
    motivation : Text;
    labels : [Text];
    references : [Text];
    contentKind : Text;
  };

  public type DiscernmentReflection = {
    content : Text;
    labels : [Text];
    references : [Text];
    contentKind : Text;
  };

  public type FeedItem = {
    id : Nat;
    authorId : Principal;
    content : Text;
    timestamp : Int;
    itemType : { #userPost; #aiAgentPost; #testimony; #scriptureEntry; #reflection };
    originalItemId : ?Nat;
    references : [Text];
    repostCount : Nat;
  };

  public type Comment = {
    authorId : Principal;
    content : Text;
    timestamp : Int;
    references : [Text];
    isAgentReply : Bool;
  };

  public type AgentResponse = {
    originalMessage : Text;
    agentReply : Text;
    timestamp : Int;
    references : [Text];
  };

  // Data Stores
  let userProfiles = Map.empty<Principal, UserProfile>();
  let testimonies = Map.empty<Principal, Testimony>();
  let scriptureEntries = Map.empty<Text, ScriptureEntry>();
  let discernmentReflections = Map.empty<Text, DiscernmentReflection>();

  var feedItems = Map.empty<Nat, FeedItem>();
  var feedItemReactions = Map.empty<Nat, Map.Map<Principal, Text>>();
  var feedItemComments = Map.empty<Nat, List.List<Comment>>();
  var followerRelationships = Map.empty<Principal, Set.Set<Principal>>();
  var agentResponses = Map.empty<Principal, List.List<AgentResponse>>();
  var nextFeedItemId : Nat = 0;
  let agentPrincipal = Principal.anonymous();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Profile Management - Per instructions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Legacy profile function for backward compatibility
  public shared ({ caller }) func createOrUpdateUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Testimony Management
  public shared ({ caller }) func submitTestimony(
    content : Text,
    labels : [Text],
    disclaimers : [Text],
    scriptureReferences : [Text]
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit testimonies");
    };
    let testimony : Testimony = {
      authorId = caller;
      content;
      labels;
      disclaimers;
      scriptureReferences;
      state = #pendingModeration;
      moderatorNote = null;
    };
    testimonies.add(caller, testimony);
  };

  public shared ({ caller }) func approveTestimony(testimonyId : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve testimonies");
    };
    switch (testimonies.get(testimonyId)) {
      case (?testimony) {
        testimonies.add(
          testimonyId,
          {
            testimony with
            state = #approved;
          },
        );
      };
      case (null) { Runtime.trap("Testimony not found") };
    };
  };

  public shared ({ caller }) func rejectTestimony(testimonyId : Principal, moderatorNote : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reject testimonies");
    };
    switch (testimonies.get(testimonyId)) {
      case (?testimony) {
        testimonies.add(
          testimonyId,
          {
            testimony with
            state = #rejected(moderatorNote);
            moderatorNote = ?moderatorNote;
          },
        );
      };
      case (null) { Runtime.trap("Testimony not found") };
    };
  };

  // Scripture and Reflection Management
  public shared ({ caller }) func createScriptureEntry(
    text : Text,
    motivation : Text,
    labels : [Text],
    references : [Text],
    contentKind : Text
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create scripture entries");
    };
    let entry : ScriptureEntry = {
      text;
      motivation;
      labels;
      references;
      contentKind;
    };
    scriptureEntries.add(text, entry);
  };

  public shared ({ caller }) func createDiscernmentReflection(
    content : Text,
    labels : [Text],
    references : [Text],
    contentKind : Text
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create reflections");
    };
    let reflection : DiscernmentReflection = {
      content;
      labels;
      references;
      contentKind;
    };
    discernmentReflections.add(content, reflection);
  };

  // Query functions - accessible to all authenticated users
  public query ({ caller }) func getDailyFeed() : async ([ScriptureEntry], [DiscernmentReflection], [Testimony]) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view daily feed");
    };
    let scriptures = scriptureEntries.values().toArray();
    let reflections = discernmentReflections.values().toArray();
    let approvedTestimonies = testimonies.values().toArray().filter(
      func(t) {
        switch (t.state) {
          case (#approved) { true };
          case (_) { false };
        };
      }
    );
    (scriptures, reflections, approvedTestimonies);
  };

  public query ({ caller }) func getApprovedTestimonies() : async [Testimony] {
    testimonies.values().toArray().filter(
      func(t) {
        switch (t.state) {
          case (#approved) { true };
          case (_) { false };
        };
      }
    );
  };

  public query ({ caller }) func getScriptureEntries() : async [ScriptureEntry] {
    scriptureEntries.values().toArray();
  };

  public query ({ caller }) func getDiscernmentReflections() : async [DiscernmentReflection] {
    discernmentReflections.values().toArray();
  };

  // Social Feed Functions
  public shared ({ caller }) func createPost(content : Text, references : [Text]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create posts");
    };
    let itemId = nextFeedItemId;
    nextFeedItemId += 1;
    let item : FeedItem = {
      id = itemId;
      authorId = caller;
      content;
      timestamp = Time.now();
      itemType = #userPost;
      originalItemId = null;
      references;
      repostCount = 0;
    };
    feedItems.add(itemId, item);
    feedItemReactions.add(itemId, Map.empty<Principal, Text>());
    feedItemComments.add(itemId, List.empty<Comment>());
    itemId;
  };

  public query ({ caller }) func getFeed(limit : Nat, offset : Nat) : async [FeedItem] {
    let allItems = feedItems.values().toArray();
    let sorted = allItems.sort(
      func(a, b) {
        Int.compare(b.timestamp, a.timestamp);
      }
    );
    let start = Nat.min(offset, sorted.size());
    let end = Nat.min(start + limit, sorted.size());
    Array.tabulate(
      end - start,
      func(i) { sorted[start + i] },
    );
  };

  public shared ({ caller }) func addReaction(itemId : Nat, emoji : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add reactions");
    };
    switch (feedItemReactions.get(itemId)) {
      case (null) { Runtime.trap("Feed item not found") };
      case (?reactions) {
        reactions.add(caller, emoji);
      };
    };
  };

  public shared ({ caller }) func removeReaction(itemId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove reactions");
    };
    switch (feedItemReactions.get(itemId)) {
      case (null) { Runtime.trap("Feed item not found") };
      case (?reactions) {
        reactions.remove(caller);
      };
    };
  };

  public shared ({ caller }) func addComment(
    itemId : Nat,
    content : Text,
    references : [Text],
    isAgentReply : Bool,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add comments");
    };
    // Only system/admin can mark as agent reply
    let actualIsAgentReply = if (isAgentReply) {
      AccessControl.isAdmin(accessControlState, caller);
    } else {
      false;
    };
    switch (feedItemComments.get(itemId)) {
      case (null) { Runtime.trap("Feed item not found") };
      case (?comments) {
        let comment : Comment = {
          authorId = caller;
          content;
          timestamp = Time.now();
          references;
          isAgentReply = actualIsAgentReply;
        };
        comments.add(comment);
        comments.size();
      };
    };
  };

  public shared ({ caller }) func repostItem(itemId : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can repost");
    };
    switch (feedItems.get(itemId)) {
      case (null) { Runtime.trap("Feed item not found") };
      case (?originalItem) {
        let newItemId = nextFeedItemId;
        nextFeedItemId += 1;
        let repost : FeedItem = {
          id = newItemId;
          authorId = caller;
          content = originalItem.content;
          timestamp = Time.now();
          itemType = originalItem.itemType;
          originalItemId = ?itemId;
          references = originalItem.references;
          repostCount = 0;
        };
        feedItems.add(newItemId, repost);
        feedItemReactions.add(newItemId, Map.empty<Principal, Text>());
        feedItemComments.add(newItemId, List.empty<Comment>());
        let updatedOriginal = {
          originalItem with
          repostCount = originalItem.repostCount + 1;
        };
        feedItems.add(itemId, updatedOriginal);
        newItemId;
      };
    };
  };

  // Follow/Unfollow Functions
  public shared ({ caller }) func followUser(userToFollow : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can follow others");
    };
    if (caller == userToFollow) {
      Runtime.trap("Cannot follow yourself");
    };
    let followers = switch (followerRelationships.get(userToFollow)) {
      case (null) { Set.empty<Principal>() };
      case (?existing) { existing };
    };
    followers.add(caller);
    followerRelationships.add(userToFollow, followers);
  };

  public shared ({ caller }) func unfollowUser(userToUnfollow : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can unfollow others");
    };
    switch (followerRelationships.get(userToUnfollow)) {
      case (null) {};
      case (?followers) {
        followers.remove(caller);
      };
    };
  };

  public query ({ caller }) func getFollowersCount(user : Principal) : async Nat {
    switch (followerRelationships.get(user)) {
      case (null) { 0 };
      case (?followers) { followers.size() };
    };
  };

  public query ({ caller }) func getFollowingCount(user : Principal) : async Nat {
    var count = 0;
    for ((followed, followers) in followerRelationships.entries()) {
      if (followers.contains(user)) {
        count += 1;
      };
    };
    count;
  };

  // AI Agent Functions
  public shared ({ caller }) func createAgentPost(content : Text, references : [Text]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create agent posts");
    };
    let itemId = nextFeedItemId;
    nextFeedItemId += 1;
    let item : FeedItem = {
      id = itemId;
      authorId = agentPrincipal;
      content;
      timestamp = Time.now();
      itemType = #aiAgentPost;
      originalItemId = null;
      references;
      repostCount = 0;
    };
    feedItems.add(itemId, item);
    feedItemReactions.add(itemId, Map.empty<Principal, Text>());
    feedItemComments.add(itemId, List.empty<Comment>());
    itemId;
  };

  public query ({ caller }) func getLatestAgentPost() : async ?FeedItem {
    var latest : ?FeedItem = null;
    var latestTime : Int = 0;
    for (item in feedItems.values()) {
      switch (item.itemType) {
        case (#aiAgentPost) {
          if (item.timestamp > latestTime) {
            latest := ?item;
            latestTime := item.timestamp;
          };
        };
        case (_) {};
      };
    };
    latest;
  };

  public shared ({ caller }) func createAgentResponse(
    originalMessage : Text,
    agentReply : Text,
    references : [Text],
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create agent responses");
    };
    let response : AgentResponse = {
      originalMessage;
      agentReply;
      timestamp = Time.now();
      references;
    };
    let responses = switch (agentResponses.get(caller)) {
      case (null) { List.empty<AgentResponse>() };
      case (?existing) { existing };
    };
    responses.add(response);
    agentResponses.add(caller, responses);
  };

  public query ({ caller }) func getResponsesToUser(user : Principal) : async [AgentResponse] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own agent responses");
    };
    switch (agentResponses.get(user)) {
      case (null) { [] };
      case (?responses) { responses.toArray() };
    };
  };

  // Scripture Retrieval with Licensing
  public query ({ caller }) func getScriptureByTranslation(translation : Text) : async ?[ScriptureEntry] {
    let filtered = scriptureEntries.values().toArray();
    if (filtered.size() > 0) {
      ?filtered;
    } else {
      null;
    };
  };

  public query ({ caller }) func getAvailableTranslations() : async [Text] {
    ["NIV", "NKJV", "ESV"];
  };
};

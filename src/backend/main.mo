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
import Array "mo:core/Array";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


// Apply migration during upgrade/downgrade.

actor {
  module Testimony {
    public type State = {
      #pendingModeration;
      #approved;
      #rejected : Text;
    };
  };

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

  public type BibleTranslation = {
    id : Nat;
    name : Text;
    abbreviation : Text;
  };

  public type BibleBook = {
    id : Nat;
    translationId : Nat;
    name : Text;
    abbreviation : Text;
  };

  public type BibleChapter = {
    id : Nat;
    bookId : Nat;
    number : Text;
  };

  public type BibleVerse = {
    id : Nat;
    translationId : Nat;
    bookId : Nat;
    chapterId : Nat;
    verseNumber : Text;
    translationName : Text;
    bookName : Text;
    chapterNumber : Text;
    text : Text;
  };

  public type LastBibleLocation = {
    translationId : Nat;
    bookId : Nat;
    chapterId : Nat;
    verseId : ?Nat;
    scrollAnchor : ?Nat;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let testimonies = Map.empty<Principal, Testimony>();
  let scriptureEntries = Map.empty<Text, ScriptureEntry>();
  let discernmentReflections = Map.empty<Text, DiscernmentReflection>();

  var feedItems = Map.empty<Nat, FeedItem>();
  var feedItemReactions = Map.empty<Nat, Map.Map<Principal, Text>>();
  var feedItemComments = Map.empty<Nat, List.List<Comment>>();
  var followerRelationships = Map.empty<Principal, Set.Set<Principal>>();
  var agentResponses = Map.empty<Principal, List.List<AgentResponse>>();
  var lastBibleLocations = Map.empty<Principal, LastBibleLocation>();
  var nextFeedItemId : Nat = 0;
  let agentPrincipal = Principal.anonymous();

  let bibleTranslations : [BibleTranslation] = [
    {
      id = 2001;
      name = "NJSV - New King James Version";
      abbreviation = "NJKV";
    },
    {
      id = 2002;
      name = "NLT - New Living Translation";
      abbreviation = "NLT";
    },
  ];

  let bibleBooks : [BibleBook] = [
    {
      id = 21001;
      translationId = 2001;
      name = "Matthew";
      abbreviation = "Mt";
    },
    {
      id = 21002;
      translationId = 2001;
      name = "Mark";
      abbreviation = "Mk";
    },
    {
      id = 22001;
      translationId = 2002;
      name = "Matthew";
      abbreviation = "Mt";
    },
    {
      id = 22002;
      translationId = 2002;
      name = "Mark";
      abbreviation = "Mk";
    },
  ];

  let matthewChapters : [BibleChapter] = [
    {
      id = 1;
      bookId = 21001;
      number = "1";
    },
    {
      id = 2;
      bookId = 21001;
      number = "2";
    },
    {
      id = 3;
      bookId = 22001;
      number = "1";
    },
    {
      id = 4;
      bookId = 22001;
      number = "2";
    },
  ];

  let markChapters : [BibleChapter] = [
    {
      id = 5;
      bookId = 21002;
      number = "1";
    },
    {
      id = 6;
      bookId = 22002;
      number = "1";
    },
  ];

  let matthewVerses : [BibleVerse] = [
    {
      id = 1;
      translationId = 2001;
      bookId = 21001;
      chapterId = 1;
      verseNumber = "1";
      translationName = "NKJV";
      bookName = "Matthew";
      chapterNumber = "1";
      text = "The book of the genealogy of Jesus Christ, the Son of David, the Son of Abraham.";
    },
    {
      id = 2;
      translationId = 2001;
      bookId = 21001;
      chapterId = 1;
      verseNumber = "2";
      translationName = "NKJV";
      bookName = "Matthew";
      chapterNumber = "1";
      text = "Abraham begot Isaac, Isaac begot Jacob, and Jacob begot Judah and his brothers.";
    },
    {
      id = 3;
      translationId = 2001;
      bookId = 21001;
      chapterId = 2;
      verseNumber = "1";
      translationName = "NKJV";
      bookName = "Matthew";
      chapterNumber = "2";
      text = "Now after Jesus was born in Bethlehem of Judea in the days of Herod the king, behold, wise men from the East came to Jerusalem.";
    },
    {
      id = 4;
      translationId = 2002;
      bookId = 22001;
      chapterId = 3;
      verseNumber = "1";
      translationName = "NLT";
      bookName = "Matthew";
      chapterNumber = "1";
      text = "This is a record of the ancestors of Jesus the Messiah, a descendant of David and of Abraham (NLT).";
    },
    {
      id = 5;
      translationId = 2002;
      bookId = 22001;
      chapterId = 3;
      verseNumber = "2";
      translationName = "NLT";
      bookName = "Matthew";
      chapterNumber = "1";
      text = "Abraham was the father of Isaac. Isaac was the father of Jacob. Jacob was the father of Judah and his brothers (NLT).";
    },
    {
      id = 6;
      translationId = 2002;
      bookId = 22001;
      chapterId = 4;
      verseNumber = "1";
      translationName = "NLT";
      bookName = "Matthew";
      chapterNumber = "2";
      text = "Jesus was born in Bethlehem in Judea, during the reign of King Herod. About that time, some wise men from eastern lands arrived in Jerusalem (NLT).";
    },
  ];

  let markVerses : [BibleVerse] = [
    {
      id = 7;
      translationId = 2001;
      bookId = 21002;
      chapterId = 5;
      verseNumber = "1";
      translationName = "NKJV";
      bookName = "Mark";
      chapterNumber = "1";
      text = "The beginning of the gospel of Jesus Christ, the Son of God.";
    },
    {
      id = 8;
      translationId = 2002;
      bookId = 22002;
      chapterId = 6;
      verseNumber = "1";
      translationName = "NLT";
      bookName = "Mark";
      chapterNumber = "1";
      text = "This is the Good News about Jesus the Messiah, the Son of God. It began (NLT).";
    },
  ];

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

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

  public shared ({ caller }) func createOrUpdateUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view testimonies");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view scripture entries");
    };
    scriptureEntries.values().toArray();
  };

  public query ({ caller }) func getDiscernmentReflections() : async [DiscernmentReflection] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view reflections");
    };
    discernmentReflections.values().toArray();
  };

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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view feed");
    };
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
    isAgentReply : Bool
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add comments");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view follower counts");
    };
    switch (followerRelationships.get(user)) {
      case (null) { 0 };
      case (?followers) { followers.size() };
    };
  };

  public query ({ caller }) func getFollowingCount(user : Principal) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view following counts");
    };
    var count = 0;
    for ((followed, followers) in followerRelationships.entries()) {
      if (followers.contains(user)) {
        count += 1;
      };
    };
    count;
  };

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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view agent posts");
    };
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
    references : [Text]
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

  public query ({ caller }) func getScriptureByTranslation(translation : Text) : async ?[ScriptureEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view scripture entries");
    };
    let filtered = scriptureEntries.values().toArray();
    if (filtered.size() > 0) {
      ?filtered;
    } else {
      null;
    };
  };

  public query ({ caller }) func getAvailableBibleTranslations() : async [BibleTranslation] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view available translations");
    };
    bibleTranslations;
  };

  public query ({ caller }) func getBooksForTranslation(translationId : Nat) : async [BibleBook] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view available books");
    };
    bibleBooks.filter(func(book) { book.translationId == translationId });
  };

  public query ({ caller }) func getChaptersForBook(bookId : Nat) : async [BibleChapter] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view chapters");
    };
    switch (bookId) {
      case (21001) { matthewChapters.filter(func(chapter) { chapter.bookId == 21001 }) };
      case (22001) { matthewChapters.filter(func(chapter) { chapter.bookId == 22001 }) };
      case (21002) { markChapters.filter(func(chapter) { chapter.bookId == 21002 }) };
      case (22002) { markChapters.filter(func(chapter) { chapter.bookId == 22002 }) };
      case (_) { [] };
    };
  };

  public query ({ caller }) func getVersesForChapter(
    translationId : Nat,
    bookId : Nat,
    chapterId : Nat
  ) : async [BibleVerse] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view verses");
    };

    switch (bookId) {
      case (21001) {
        matthewVerses.filter(
          func(verse) {
            verse.translationId == translationId and verse.bookId == bookId and verse.chapterId == chapterId
          }
        );
      };
      case (22001) {
        matthewVerses.filter(
          func(verse) {
            verse.translationId == translationId and verse.bookId == bookId and verse.chapterId == chapterId
          }
        );
      };
      case (21002) {
        markVerses.filter(
          func(verse) {
            verse.translationId == translationId and verse.bookId == bookId and verse.chapterId == chapterId
          }
        );
      };
      case (22002) {
        markVerses.filter(
          func(verse) {
            verse.translationId == translationId and verse.bookId == bookId and verse.chapterId == chapterId
          }
        );
      };
      case (_) { [] };
    };
  };

  public shared ({ caller }) func setLastBibleLocation(
    translationId : Nat,
    bookId : Nat,
    chapterId : Nat,
    verseId : ?Nat
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can set last Bible location");
    };
    let location : LastBibleLocation = {
      translationId;
      bookId;
      chapterId;
      verseId;
      scrollAnchor = null;
    };
    lastBibleLocations.add(caller, location);
  };

  public shared ({ caller }) func setLastBibleLocationWithScroll(
    translationId : Nat,
    bookId : Nat,
    chapterId : Nat,
    verseId : ?Nat,
    scrollAnchor : ?Nat,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can set last Bible location");
    };
    let location : LastBibleLocation = {
      translationId;
      bookId;
      chapterId;
      verseId;
      scrollAnchor;
    };
    lastBibleLocations.add(caller, location);
  };

  public query ({ caller }) func getLastBibleLocation() : async ?LastBibleLocation {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get last Bible location");
    };
    lastBibleLocations.get(caller);
  };

  public query ({ caller }) func searchVerse(
    translationId : Nat,
    bookId : Nat,
    chapterId : Nat,
    verseNumber : Text,
  ) : async ?BibleVerse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can search verses");
    };

    let matchingVerses = switch (bookId) {
      case (21001) { matthewVerses };
      case (22001) { matthewVerses };
      case (21002) { markVerses };
      case (22002) { markVerses };
      case (_) { [] };
    };

    let filtered = matchingVerses.filter(
      func(verse) {
        verse.translationId == translationId and verse.bookId == bookId and verse.chapterId == chapterId and verse.verseNumber == verseNumber
      }
    );

    switch (filtered.size()) {
      case (0) { null };
      case (_) { ?filtered[0] };
    };
  };
};

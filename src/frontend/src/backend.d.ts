import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BibleVerse {
    id: bigint;
    translationId: bigint;
    bookName: string;
    verseNumber: string;
    chapterNumber: string;
    text: string;
    bookId: bigint;
    chapterId: bigint;
    translationName: string;
}
export interface AgentResponse {
    agentReply: string;
    references: Array<string>;
    originalMessage: string;
    timestamp: bigint;
}
export interface ScriptureEntry {
    references: Array<string>;
    contentKind: string;
    labels: Array<string>;
    text: string;
    motivation: string;
}
export interface BibleBook {
    id: bigint;
    translationId: bigint;
    name: string;
    abbreviation: string;
}
export interface BibleChapter {
    id: bigint;
    bookId: bigint;
    number: string;
}
export interface BibleTranslation {
    id: bigint;
    name: string;
    abbreviation: string;
}
export interface FeedItem {
    id: bigint;
    references: Array<string>;
    content: string;
    authorId: Principal;
    originalItemId?: bigint;
    repostCount: bigint;
    timestamp: bigint;
    itemType: Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony;
}
export interface LastBibleLocation {
    translationId: bigint;
    bookId: bigint;
    chapterId: bigint;
    verseId?: bigint;
    scrollAnchor?: bigint;
}
export interface DiscernmentReflection {
    references: Array<string>;
    content: string;
    contentKind: string;
    labels: Array<string>;
}
export type State = {
    __kind__: "pendingModeration";
    pendingModeration: null;
} | {
    __kind__: "approved";
    approved: null;
} | {
    __kind__: "rejected";
    rejected: string;
};
export interface UserProfile {
    spiritualNeeds: string;
    lifeSituation: string;
    name: string;
}
export interface Testimony {
    moderatorNote?: string;
    content: string;
    disclaimers: Array<string>;
    authorId: Principal;
    labels: Array<string>;
    state: State;
    scriptureReferences: Array<string>;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_userPost_scriptureEntry_aiAgentPost_reflection_testimony {
    userPost = "userPost",
    scriptureEntry = "scriptureEntry",
    aiAgentPost = "aiAgentPost",
    reflection = "reflection",
    testimony = "testimony"
}
export interface backendInterface {
    addComment(itemId: bigint, content: string, references: Array<string>, isAgentReply: boolean): Promise<bigint>;
    addReaction(itemId: bigint, emoji: string): Promise<void>;
    approveTestimony(testimonyId: Principal): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAgentPost(content: string, references: Array<string>): Promise<bigint>;
    createAgentResponse(originalMessage: string, agentReply: string, references: Array<string>): Promise<void>;
    createDiscernmentReflection(content: string, labels: Array<string>, references: Array<string>, contentKind: string): Promise<void>;
    createOrUpdateUserProfile(profile: UserProfile): Promise<void>;
    createPost(content: string, references: Array<string>): Promise<bigint>;
    createScriptureEntry(text: string, motivation: string, labels: Array<string>, references: Array<string>, contentKind: string): Promise<void>;
    followUser(userToFollow: Principal): Promise<void>;
    getApprovedTestimonies(): Promise<Array<Testimony>>;
    getAvailableBibleTranslations(): Promise<Array<BibleTranslation>>;
    getBooksForTranslation(translationId: bigint): Promise<Array<BibleBook>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getChaptersForBook(bookId: bigint): Promise<Array<BibleChapter>>;
    getDailyFeed(): Promise<[Array<ScriptureEntry>, Array<DiscernmentReflection>, Array<Testimony>]>;
    getDiscernmentReflections(): Promise<Array<DiscernmentReflection>>;
    getFeed(limit: bigint, offset: bigint): Promise<Array<FeedItem>>;
    getFollowersCount(user: Principal): Promise<bigint>;
    getFollowingCount(user: Principal): Promise<bigint>;
    getLastBibleLocation(): Promise<LastBibleLocation | null>;
    getLatestAgentPost(): Promise<FeedItem | null>;
    getResponsesToUser(user: Principal): Promise<Array<AgentResponse>>;
    getScriptureByTranslation(translation: string): Promise<Array<ScriptureEntry> | null>;
    getScriptureEntries(): Promise<Array<ScriptureEntry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVersesForChapter(translationId: bigint, bookId: bigint, chapterId: bigint): Promise<Array<BibleVerse>>;
    isCallerAdmin(): Promise<boolean>;
    rejectTestimony(testimonyId: Principal, moderatorNote: string): Promise<void>;
    removeReaction(itemId: bigint): Promise<void>;
    repostItem(itemId: bigint): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchVerse(translationId: bigint, bookId: bigint, chapterId: bigint, verseNumber: string): Promise<BibleVerse | null>;
    setLastBibleLocation(translationId: bigint, bookId: bigint, chapterId: bigint, verseId: bigint | null): Promise<void>;
    setLastBibleLocationWithScroll(translationId: bigint, bookId: bigint, chapterId: bigint, verseId: bigint | null, scrollAnchor: bigint | null): Promise<void>;
    submitTestimony(content: string, labels: Array<string>, disclaimers: Array<string>, scriptureReferences: Array<string>): Promise<void>;
    unfollowUser(userToUnfollow: Principal): Promise<void>;
}

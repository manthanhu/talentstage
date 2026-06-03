// User Types
export type UserRole = "student" | "educator" | "admin";

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
  isVerified: boolean;
  preferredLanguage: string;
  talentCategories: TalentCategory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Talent Types
export type TalentCategory =
  | "Music"
  | "Coding"
  | "Art"
  | "Speaking"
  | "Film"
  | "Research"
  | "Innovation"
  | "Debate"
  | "Dance"
  | "Language";

export interface Talent {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: TalentCategory;
  mediaUrl?: string;
  thumbnail?: string;
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

// Stage Types
export type StageLevel = "local" | "regional" | "national" | "international";

export interface Stage {
  id: string;
  name: string;
  level: StageLevel;
  description: string;
  requiredLikes: number;
  requiredTalents: number;
  icon: string;
  rewards?: string[];
  createdAt: Date;
}

export interface UserStageProgress {
  userId: string;
  stageLevel: StageLevel;
  talentsSubmitted: number;
  totalLikes: number;
  unlockedAt: Date;
}

// Community Types
export interface Community {
  id: string;
  name: string;
  description: string;
  category: TalentCategory;
  memberCount: number;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityMember {
  id: string;
  userId: string;
  communityId: string;
  joinedAt: Date;
  role: "member" | "moderator" | "admin";
}

// Room Types (Voice/Video)
export interface Room {
  id: string;
  name: string;
  description?: string;
  category: TalentCategory;
  isLive: boolean;
  participantCount: number;
  maxParticipants: number;
  hostId: string;
  createdAt: Date;
  expiresAt?: Date;
}

// Safety & Moderation
export interface SafetyReport {
  id: string;
  reporterId: string;
  reportedUserId?: string;
  reportedTalentId?: string;
  reason: string;
  description: string;
  status: "pending" | "under_review" | "resolved" | "dismissed";
  createdAt: Date;
  resolvedAt?: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Common Types
export type Language =
  | "English"
  | "हिन्दी"
  | "தமிழ்"
  | "తెలుగు"
  | "বাংলা"
  | "मराठी"
  | "ગુજરાતી"
  | "ಕನ್ನડ"
  | "മലയാളം"
  | "ਪੰਜਾਬੀ";

export interface ValidationError {
  field: string;
  message: string;
}

export interface SuccessNotification {
  type: "success";
  message: string;
  duration?: number;
}

export interface ErrorNotification {
  type: "error";
  message: string;
  code?: string;
  duration?: number;
}

export type Notification = SuccessNotification | ErrorNotification;

// Screen Navigation Type
export type Screen =
  | "splash"
  | "onboarding"
  | "verify"
  | "feed"
  | "profile"
  | "stages"
  | "communities"
  | "create"
  | "rooms"
  | "safety"
  | "admin";

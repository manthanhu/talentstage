import type {
  User,
  AuthToken,
  Talent,
  Community,
  Stage,
  Room,
  TalentCategory,
} from "./types";

// Mock data generators
const generateId = () => Math.random().toString(36).substring(7);

const mockUsers: Record<string, User> = {
  "user-1": {
    id: "user-1",
    email: "demo@talentstage.com",
    displayName: "Demo User",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
    bio: "Passionate about sharing talent and learning from others.",
    role: "student",
    isVerified: true,
    preferredLanguage: "English",
    talentCategories: ["Music", "Coding"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-06-01"),
  },
};

const mockTalents: Talent[] = [
  {
    id: "talent-1",
    userId: "user-1",
    title: "JavaScript Advanced Concepts",
    description: "Deep dive into closures, prototypes, and async/await patterns.",
    category: "Coding",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    likes: 342,
    views: 1205,
    createdAt: new Date("2024-05-10"),
    updatedAt: new Date("2024-05-10"),
  },
  {
    id: "talent-2",
    userId: "user-1",
    title: "Piano Performance - Moonlight Sonata",
    description: "Classical piano piece performed live.",
    category: "Music",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    likes: 567,
    views: 2103,
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-04-15"),
  },
];

const mockCommunities: Community[] = [
  {
    id: "community-1",
    name: "Web Developers Collective",
    description: "Connect with developers passionate about web technologies.",
    category: "Coding",
    memberCount: 1234,
    icon: "💻",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: "community-2",
    name: "Musicians Network",
    description: "Share your music and inspire other musicians worldwide.",
    category: "Music",
    memberCount: 3421,
    icon: "🎵",
    createdAt: new Date("2023-04-01"),
    updatedAt: new Date("2024-06-01"),
  },
];

const mockStages: Stage[] = [
  {
    id: "stage-local",
    name: "Local Stage",
    level: "local",
    description: "Start your journey. Showcase to 100-500 people.",
    requiredLikes: 10,
    requiredTalents: 1,
    icon: "🌟",
    rewards: ["Starter Badge", "Showcase Boost"],
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "stage-regional",
    name: "Regional Stage",
    level: "regional",
    description: "Reach 500-5,000 people across regions.",
    requiredLikes: 100,
    requiredTalents: 3,
    icon: "⭐",
    rewards: ["Regional Badge", "Featured Profile"],
    createdAt: new Date("2023-01-01"),
  },
];

const mockRooms: Room[] = [
  {
    id: "room-1",
    name: "Live Coding Session - React Hooks",
    description: "Advanced React patterns discussion",
    category: "Coding",
    isLive: true,
    participantCount: 23,
    maxParticipants: 100,
    hostId: "user-1",
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
];

// Simulated API delay
const delay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  async signup(email: string, password: string, displayName: string) {
    await delay();

    if (Object.values(mockUsers).some((u) => u.email === email)) {
      throw new Error("Email already registered");
    }

    const newUser: User = {
      id: `user-${generateId()}`,
      email,
      displayName,
      role: "student",
      isVerified: false,
      preferredLanguage: "English",
      talentCategories: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUsers[newUser.id] = newUser;

    const token: AuthToken = {
      accessToken: `token-${generateId()}`,
      refreshToken: `refresh-${generateId()}`,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    return { user: newUser, token };
  },

  async login(email: string, password: string) {
    await delay();

    const user = Object.values(mockUsers).find((u) => u.email === email);
    if (!user) {
      throw new Error("User not found");
    }

    const token: AuthToken = {
      accessToken: `token-${generateId()}`,
      refreshToken: `refresh-${generateId()}`,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    return { user, token };
  },

  async refreshToken(refreshToken: string) {
    await delay();

    const newToken: AuthToken = {
      accessToken: `token-${generateId()}`,
      refreshToken: `refresh-${generateId()}`,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    return newToken;
  },

  async verifyEmail(code: string) {
    await delay();
    // Simulate verification
    return { success: true };
  },
};

// User API
export const userAPI = {
  async getUser(userId: string) {
    await delay();
    const user = mockUsers[userId];
    if (!user) throw new Error("User not found");
    return user;
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    await delay();
    const user = mockUsers[userId];
    if (!user) throw new Error("User not found");
    const updated = { ...user, ...updates, updatedAt: new Date() };
    mockUsers[userId] = updated;
    return updated;
  },
};

// Talent API
export const talentAPI = {
  async getTalents(filters?: { category?: TalentCategory; userId?: string }) {
    await delay(500);

    let talents = [...mockTalents];

    if (filters?.category) {
      talents = talents.filter((t) => t.category === filters.category);
    }

    if (filters?.userId) {
      talents = talents.filter((t) => t.userId === filters.userId);
    }

    return talents;
  },

  async createTalent(
    userId: string,
    data: Omit<Talent, "id" | "createdAt" | "updatedAt" | "likes" | "views">
  ) {
    await delay(400);

    const talent: Talent = {
      ...data,
      id: `talent-${generateId()}`,
      likes: 0,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockTalents.push(talent);
    return talent;
  },

  async likeTalent(talentId: string) {
    await delay(200);
    const talent = mockTalents.find((t) => t.id === talentId);
    if (!talent) throw new Error("Talent not found");
    talent.likes += 1;
    return talent;
  },
};

// Community API
export const communityAPI = {
  async getCommunities() {
    await delay(400);
    return mockCommunities;
  },

  async joinCommunity(userId: string, communityId: string) {
    await delay(300);
    const community = mockCommunities.find((c) => c.id === communityId);
    if (!community) throw new Error("Community not found");
    community.memberCount += 1;
    return community;
  },
};

// Stages API
export const stagesAPI = {
  async getStages() {
    await delay(300);
    return mockStages;
  },

  async getUserStageProgress(userId: string) {
    await delay(300);
    return {
      userId,
      stageLevel: "local" as const,
      talentsSubmitted: 2,
      totalLikes: 567,
      unlockedAt: new Date("2024-05-01"),
    };
  },
};

// Rooms API
export const roomsAPI = {
  async getRooms() {
    await delay(400);
    return mockRooms;
  },

  async createRoom(
    hostId: string,
    data: Omit<Room, "id" | "createdAt" | "hostId">
  ) {
    await delay(300);

    const room: Room = {
      ...data,
      id: `room-${generateId()}`,
      hostId,
      createdAt: new Date(),
    };

    mockRooms.push(room);
    return room;
  },
};

// Export all APIs as a single object
export const api = {
  auth: authAPI,
  user: userAPI,
  talent: talentAPI,
  community: communityAPI,
  stages: stagesAPI,
  rooms: roomsAPI,
};

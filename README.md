# TalentStage

> **Where Talent Gets Its Stage** — A verified, privacy-first platform for safe talent discovery and growth.

![TalentStage](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/next.js-16.2.6-black)
![React](https://img.shields.io/badge/react-19.2.4-blue)
![TypeScript](https://img.shields.io/badge/typescript-5-blue)

## 🌟 Overview

TalentStage is a safety-first talent showcase platform designed for students, educators, and creators worldwide. We provide:

- **🔒 Verified Identities** - Face verification ensures a trusted community
- **🎭 Performance Stages** - Progress from Local → Regional → National → International
- **🛡️ AI Moderation** - Safe interactions with smart content filtering
- **🌍 Global Community** - Connect with talent creators across 10+ languages
- **📱 Mobile-First** - Beautiful responsive design optimized for mobile
- **✨ Zero Toxicity** - No private DMs, only community-driven interactions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/talentstage.git
cd talentstage

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main app container (screen router)
│   ├── types.ts             # Centralized TypeScript types
│   ├── store.ts             # Zustand state management
│   ├── api-service.ts       # Mock API layer (ready for backend)
│   ├── validators.ts        # Form validation utilities
│   ├── hooks.ts             # Custom React hooks
│   └── globals.css          # Tailwind + design system
├── components/
│   ├── screens/             # Full-page screen components
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── FeedScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── ...
│   ├── ui/                  # Navigation & layout
│   │   └── BottomNav.tsx
│   ├── Button.tsx           # Reusable button component
│   ├── Input.tsx            # Reusable input components
│   ├── NotificationContainer.tsx  # Toast notifications
│   └── ErrorBoundary.tsx    # Error handling boundary
└── public/                  # Static assets

.env.local.example          # Environment variables template
```

## 🏗️ Architecture

### State Management (Zustand)
Persistent global state with localStorage:
- **AuthStore** - User authentication & tokens
- **AppStore** - Language, theme, notifications

```typescript
// Usage in components
import { useAuth, useAppNotification } from '@/app/hooks';

const { user, login, logout } = useAuth();
const { success, error } = useAppNotification();
```

### API Layer
Mock API service with real-world structure, ready to connect to backend:

```typescript
import { api } from '@/app/api-service';

// Talent API
await api.talent.getTalents({ category: 'Music' });
await api.talent.createTalent(userId, talentData);
await api.talent.likeTalent(talentId);

// User API
await api.user.getUser(userId);
await api.user.updateProfile(userId, updates);

// Community API
await api.community.getCommunities();
await api.community.joinCommunity(userId, communityId);
```

### Custom Hooks
Pre-built hooks for common operations:

```typescript
// Authentication
const { user, isAuthenticated, signup, login, logout } = useAuth();

// Notifications
const { success, error } = useAppNotification();

// User data
const { user, updateProfile } = useUser();

// Talents
const { talents, isLoading, fetchTalents, createTalent } = useTalents();
```

### Type Safety
Comprehensive TypeScript interfaces:

```typescript
import type { User, Talent, Community, Screen } from '@/app/types';
```

## ✅ Features Implemented

### MVP Phase
- [x] **Authentication System** - Sign up, login, JWT tokens
- [x] **Type-Safe Architecture** - Full TypeScript implementation
- [x] **State Management** - Zustand with persistence
- [x] **Form Validation** - Comprehensive validators
- [x] **Error Handling** - Error boundary + API error handling
- [x] **Notifications** - Toast system for user feedback
- [x] **Design System** - Tailwind + CSS variables
- [x] **Accessibility** - ARIA labels, semantic HTML
- [x] **Environment Config** - .env validation
- [x] **UI Components** - Button, Input, TextArea, reusable

### Next Phase
- [ ] **Complete Screen Implementations** - Feed, Profile, Create
- [ ] **Real Backend API** - Replace mock service
- [ ] **Database** - User, Talent, Community data
- [ ] **Media Upload** - Image/video handling
- [ ] **Advanced Search** - Filter & discover talents
- [ ] **Social Features** - Follow, like, comment
- [ ] **Voice Rooms** - WebRTC integration
- [ ] **Moderation Tools** - Safety & reporting
- [ ] **Admin Dashboard** - Analytics & management
- [ ] **Testing** - Jest + E2E tests
- [ ] **CI/CD** - GitHub Actions

## 🎨 Design System

### Colors
- Primary: Purple Electric (#7c3aed)
- Success: Green Safe (#10b981)
- Danger: Red (#ef4444)
- Backgrounds: Dark theme optimized

### Components
- Glass-morphism design
- Smooth framer-motion animations
- Responsive mobile-first layout
- Touch-optimized interactions

## 🔒 Security Features

- ✅ **Input Validation** - XSS prevention
- ✅ **Password Strength** - 8+ chars, uppercase, numbers
- ✅ **Email Validation** - RFC compliant
- ✅ **Token Management** - JWT with refresh tokens
- ✅ **Error Boundary** - Graceful error handling
- ✅ **Verified Identities** - (Backend implementation)

## 📚 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

### Adding New Features

1. **Add types** → `src/app/types.ts`
2. **Update API service** → `src/app/api-service.ts`
3. **Create hooks** if needed → `src/app/hooks.ts`
4. **Create components** → `src/components/`
5. **Test in browser** → `npm run dev`

### Creating a New Screen

```typescript
// src/components/screens/MyScreen.tsx
import { motion } from 'framer-motion';
import type { Screen } from '@/app/types';

interface MyScreenProps {
  navigateTo: (screen: Screen) => void;
}

export default function MyScreen({ navigateTo }: MyScreenProps) {
  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-bg-primary">
      {/* Your content */}
    </div>
  );
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t talentstage .
docker run -p 3000:3000 talentstage
```

## 📖 Environment Variables

See `.env.local.example` for complete configuration:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_ENABLE_MOCK_API=true

# Feature Flags
NEXT_PUBLIC_DEBUG_MODE=false

# Auth
NEXT_PUBLIC_JWT_EXPIRES_IN=86400
```

## 🧪 Testing

```bash
# Run tests (when configured)
npm test

# Run with coverage
npm test -- --coverage
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Run linter: `npm run lint`
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📝 License

MIT License - see LICENSE.md for details

## 🎯 Roadmap

**Phase 1 (Current)** - MVP with type-safe architecture
**Phase 2** - Complete screen implementations & real API
**Phase 3** - Media upload & social features
**Phase 4** - Voice/video rooms & moderation tools
**Phase 5** - Admin dashboard & analytics
**Phase 6** - Global scale with 10+ languages

## 📧 Support

- Documentation: [docs/](./docs/)
- Issues: [GitHub Issues](https://github.com/yourusername/talentstage/issues)
- Email: support@talentstage.com

---

**Made with ❤️ for talented people worldwide**

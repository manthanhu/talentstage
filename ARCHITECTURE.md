# TalentStage Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface (Next.js)             │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Screens: Onboarding, Feed, Profile, Create...  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              State Management (Zustand)                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │  AuthStore | AppStore | LocalStorage Persistence│   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Custom React Hooks Layer                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  useAuth | useUser | useAppNotification | useTalents│
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   API Service Layer                     │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Mock API Service (300-500ms delays)             │   │
│  │  Ready to swap with Real HTTP Client             │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Backend Services (Phase 2)                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │  PostgreSQL Database | Redis Cache               │   │
│  │  Authentication Service | Media Upload           │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Directory Structure

```
talentstage/
├── public/                    # Static assets
│   ├── images/
│   └── icons/
├── src/
│   ├── app/                   # Core app logic
│   │   ├── types.ts          # TypeScript domain models
│   │   ├── page.tsx          # Main page & routing
│   │   ├── layout.tsx        # Root layout
│   │   ├── store.ts          # Zustand state management
│   │   ├── hooks.ts          # Custom React hooks
│   │   ├── api-service.ts    # API layer
│   │   ├── validators.ts     # Form validation
│   │   ├── config.ts         # App configuration
│   │   ├── logger.ts         # Logging system
│   │   ├── utils.ts          # Utility functions
│   │   └── http-client-template.ts  # Backend integration template
│   ├── components/
│   │   ├── Button.tsx        # Reusable button
│   │   ├── Input.tsx         # Form input
│   │   ├── ErrorBoundary.tsx # Error handler
│   │   ├── NotificationContainer.tsx # Toast system
│   │   ├── ui/
│   │   │   └── BottomNav.tsx # Bottom navigation
│   │   └── screens/          # Page screens
│   │       ├── SplashScreen.tsx
│   │       ├── OnboardingScreen.tsx
│   │       ├── VerifyScreen.tsx
│   │       ├── FeedScreen.tsx
│   │       ├── ProfileScreen.tsx
│   │       ├── CreateScreen.tsx
│   │       ├── StagesScreen.tsx
│   │       ├── CommunitiesScreen.tsx
│   │       ├── RoomsScreen.tsx
│   │       ├── SafetyScreen.tsx
│   │       └── AdminScreen.tsx
│   └── styles/               # Global styles
│       └── globals.css
├── jest.config.js            # Test configuration
├── jest.setup.js             # Test setup
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS config
├── package.json              # Dependencies
├── README.md                 # Project overview
├── SETUP.md                  # Setup guide
├── ENHANCEMENTS.md           # What's improved
├── ARCHITECTURE.md           # This file
├── ACCESSIBILITY.md          # a11y guide
├── TESTING.md               # Testing guide
└── DEPLOYMENT.md            # Deployment guide
```

## Core Modules

### 1. Type System (`src/app/types.ts`)
Centralized TypeScript interfaces for type safety.

**Key Types:**
- `User` - User account with role and verification
- `AuthToken` - JWT tokens for authentication
- `Talent` - User's talent submission
- `Stage` - Achievement levels
- `Community` - Community groups
- `Room` - Voice/video rooms
- `Screen` - Navigation screen names

**Benefits:**
- Single source of truth for data structures
- Compile-time type safety
- Easy refactoring when schemas change

### 2. State Management (`src/app/store.ts`)
Zustand stores for global state with localStorage persistence.

**AuthStore:**
- User info and authentication state
- Login/signup/logout actions
- Token refresh logic
- Session persistence

**AppStore:**
- Global UI state (notifications, theme, language)
- User preferences
- Temporary data (form drafts)

**Benefits:**
- Simple, lightweight alternative to Redux
- Automatic persistence to localStorage
- No prop drilling
- Time-travel debugging with devtools

### 3. API Service (`src/app/api-service.ts`)
Abstraction layer for all API calls.

**Mock Service:**
- Simulates backend with realistic delays
- Generates consistent test data
- Handles pagination and filtering

**Real Service (Phase 2):**
```typescript
import { httpClient } from '@/app/http-client'

export const api = {
  auth: {
    signup: (data) => httpClient.post('/auth/signup', data),
    login: (credentials) => httpClient.post('/auth/login', credentials),
  },
  // ... etc
}
```

**Benefits:**
- Decouples UI from backend
- Easy testing with mock data
- Simple backend swap without refactoring components

### 4. Custom Hooks (`src/app/hooks.ts`)
React hooks providing clean interface to state and API.

**useAuth:**
- Current user and auth state
- signup, login, logout, refreshToken actions
- Auto-restores session from localStorage

**useAppNotification:**
- Show success/error toasts
- Auto-dismiss after delay
- Multiple notifications stacking

**useUser:**
- Current user profile
- Update profile action
- Error handling

**useTalents:**
- Fetch, create, like talents
- Pagination support
- Loading and error states

**Benefits:**
- Consistent state access pattern
- Built-in error handling
- Reusable across components
- Easier testing than direct store access

### 5. Form Validation (`src/app/validators.ts`)
Pure functions for data validation with XSS prevention.

**Validators:**
- `validateEmail` - RFC 5322 compliant
- `validatePassword` - Complexity requirements
- `validateDisplayName` - Length and character rules
- `sanitizeInput` - XSS prevention
- `validateForm` - Batch validation

**Pattern:**
```typescript
const result = validateEmail(email)
if (result.isValid) {
  // success
} else {
  console.error(result.error) // Type-safe error
}
```

**Benefits:**
- DRY validation logic
- Consistent error messages
- Type-safe validation responses
- Security by default

### 6. Component Library
Reusable UI components following TailwindCSS design system.

**Button**
- 5 variants: primary, secondary, ghost, danger, success
- Loading states with spinner
- Disabled state handling
- Full accessibility support

**Input**
- Type validation (email, password, text)
- Error state display
- Helper text and labels
- Built-in validation feedback

**ErrorBoundary**
- Catches React render errors
- Displays user-friendly error UI
- Provides retry mechanism
- Logs for debugging

**NotificationContainer**
- Toast notifications system
- Auto-dismiss timer
- Stack management
- Smooth animations

**Benefits:**
- Consistency across app
- Reduced code duplication
- Accessibility built-in
- Easy theming

## Data Flow

### Authentication Flow
```
User fills signup form
      ↓
OnboardingScreen validates form
      ↓
Calls useAuth.signup()
      ↓
useAuth calls api.auth.signup()
      ↓
API returns user + tokens
      ↓
useAuth stores in AuthStore + localStorage
      ↓
App auto-redirects to VerifyScreen
      ↓
VerifyScreen completion → redirects to feed
```

### Feed Data Flow
```
FeedScreen mounts
      ↓
Calls useTalents.fetchTalents()
      ↓
useTalents calls api.talent.getTalents()
      ↓
API returns paginated talents
      ↓
useTalents stores in component state
      ↓
Feed renders talent cards
      ↓
User likes talent
      ↓
Call useTalents.likeTalent(id)
      ↓
API updates and returns new count
      ↓
Component state updates, re-renders
```

## Design Patterns

### Separation of Concerns
- **UI Layer** (Components) - Only render, handle user input
- **State Layer** (Store) - Manage global state
- **API Layer** (Service) - Handle data fetching
- **Validation Layer** (Validators) - Ensure data integrity
- **Utility Layer** (Utils) - Shared functions

### Error Handling Strategy
```
Try/Catch in Hooks
         ↓
showError() notification
         ↓
Return error in hook result
         ↓
Component handles gracefully
         ↓
Error Boundary catches render errors
```

### Loading States
```
API Call → Set loading = true
    ↓
Wait for response
    ↓
Update state → Set loading = false
    ↓
Component shows spinner/skeleton while loading
```

## Performance Considerations

### Bundle Size
- Next.js automatic code splitting by route
- Dynamic imports for heavy components
- Tree-shaking removes unused code
- Tailwind CSS with PurgeCSS

### Runtime Performance
- Memoization for expensive calculations
- Debouncing/throttling for frequent events
- Virtual scrolling for long lists (Phase 2)
- Image optimization with Next.js Image

### Network
- Mock API with simulated delays
- Gzip compression automatic
- Cache-busting with asset hashing
- CDN ready (Vercel, Cloudflare)

## Security Architecture

### Input Validation
- All user inputs validated before use
- XSS prevention via sanitization
- Client-side validation with server-side backup

### Authentication
- JWT tokens in localStorage
- Token refresh on expiry
- Logout clears state and localStorage
- Server validates all API calls (Phase 2)

### Data Privacy
- Sensitive data never logged
- Error messages don't expose internals
- HTTPS enforced in production

## Testing Architecture

### Unit Tests
- Validators with edge cases
- Hooks with mock store
- Utilities with multiple inputs

### Component Tests
- Buttons with all variants
- Inputs with validation feedback
- Forms with submission

### Integration Tests
- Auth flow end-to-end
- Screen transitions
- State persistence

### E2E Tests
- Complete user scenarios
- Real browser interaction
- Network condition simulation

## Scalability Path

### Phase 1 (Current MVP)
- ✅ Frontend only with mock API
- ✅ Client-side validation
- ✅ localStorage persistence

### Phase 2 (Backend Integration)
- [ ] PostgreSQL database
- [ ] Redis caching
- [ ] Real authentication server
- [ ] Media upload infrastructure
- [ ] Search & filtering

### Phase 3 (Advanced Features)
- [ ] WebSocket for real-time
- [ ] Full-text search
- [ ] Recommendation engine
- [ ] Moderation tools

### Phase 4 (Enterprise)
- [ ] Multi-region deployment
- [ ] Advanced analytics
- [ ] A/B testing platform
- [ ] Microservices architecture

## Integration Points

### Backend API Integration
```typescript
// Replace mock with real HTTP client
// In api-service.ts:
import { httpClient } from '@/app/http-client'

// All component logic stays the same
// Only API service implementation changes
```

### Authentication Provider (OAuth)
```typescript
// Google, GitHub, Apple OAuth integration
// Replaces custom auth in Phase 2
// Uses NextAuth.js for secure handling
```

### Media Upload
```typescript
// Upload to S3/GCS/Azure Blob
// Component doesn't change
// API service handles upload
// CDN serves optimized media
```

## Monitoring & Observability

### Error Tracking (Sentry)
- Captures production errors
- Environment-specific reporting
- Release tracking
- Performance monitoring

### Analytics
- User journey tracking
- Feature usage metrics
- Conversion funnels
- A/B testing support

### Logging
- Structured logs with context
- Component-level tracking
- Network request logging
- Performance metrics

## Technology Stack Summary

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| Runtime | Node.js | 18+ | Latest LTS |
| Framework | Next.js | 16.2.6 | SSR + SSG, API routes, optimized |
| Language | TypeScript | 5+ | Type safety, developer experience |
| UI Rendering | React | 19+ | Latest with suspense, transitions |
| Styling | Tailwind CSS | 4+ | Utility-first, zero runtime |
| Animation | Framer Motion | 12+ | Smooth, performant animations |
| State | Zustand | 4.4+ | Lightweight, localStorage support |
| Icons | Lucide React | 1.16+ | Beautiful, tree-shakeable |
| Testing | Jest | 29+ | Fast, widely used |
| Testing Lib | React Testing Library | 14+ | Accessible component testing |

## What's Next

**Immediate priorities:**
1. Set up backend API with PostgreSQL
2. Implement real authentication with JWT
3. Build media upload system
4. Connect Stripe for payments (if needed)

**Follow this guide to:**
- Add new features (SETUP.md)
- Fix bugs (use Error Boundary logs)
- Optimize performance (DEPLOYMENT.md)
- Ensure accessibility (ACCESSIBILITY.md)
- Maintain code quality (TESTING.md)

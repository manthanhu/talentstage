# SETUP GUIDE

## System Requirements
- Node.js 18.17 or later
- npm 9+ or yarn 3+
- Modern browser (Chrome, Firefox, Safari, Edge)

## Installation Steps

### 1. Clone & Install
```bash
git clone <repository-url>
cd talentstage
npm install
```

### 2. Environment Setup
```bash
# Copy the example env file
cp .env.local.example .env.local

# Keep default values for local development with mock API
# To connect to real backend, update NEXT_PUBLIC_API_URL and NEXT_PUBLIC_ENABLE_MOCK_API
```

### 3. Start Development Server
```bash
npm run dev
```

Server runs at: [http://localhost:3000](http://localhost:3000)

### 4. Project Structure Tour

**Core Files:**
- `src/app/page.tsx` - Main app container and screen router
- `src/app/types.ts` - All TypeScript interfaces
- `src/app/store.ts` - Zustand state management
- `src/app/api-service.ts` - API layer (mock + real backend ready)
- `src/app/hooks.ts` - Custom React hooks

**Components:**
- `src/components/screens/` - Full-page screens (Feed, Profile, etc.)
- `src/components/ui/` - Navigation and layout
- `src/components/Button.tsx` - Reusable button component
- `src/components/Input.tsx` - Reusable form inputs
- `src/components/ErrorBoundary.tsx` - Error handling
- `src/components/NotificationContainer.tsx` - Toast notifications

## Architecture Overview

### State Flow
```
User Interaction
    ↓
Component Hook (useAuth, useTalents, etc.)
    ↓
Zustand Store (AuthStore, AppStore)
    ↓
API Service (Mock → Real Backend)
    ↓
Component Updates
```

### Authentication Flow
```
1. Sign Up → useAuth.signup() → AuthAPI
2. Login → useAuth.login() → AuthAPI
3. Token stored in Zustand + localStorage
4. Auto-restore on app reload
5. Logout clears token + redirects
```

### Data Fetching
```
1. Component calls hook (useTalents, etc.)
2. Hook calls API service
3. API returns mock data (or real data from backend)
4. Hook updates Zustand store
5. Component re-renders
```

## Adding New Features

### Example: New Talent Category

1. **Update types** (`src/app/types.ts`):
```typescript
export type TalentCategory = "Music" | "Coding" | "Art" | "NewCategory";
```

2. **Update API** (`src/app/api-service.ts`):
```typescript
export const talentAPI = {
  async createTalent(userId, { category, ... }) {
    // Handle new category
  }
};
```

3. **Create component** (`src/components/screens/MyFeature.tsx`):
```typescript
import { useAuth } from '@/app/hooks';

export default function MyFeature() {
  const { user } = useAuth();
  // Build your feature
}
```

4. **Add to router** (`src/app/page.tsx`):
```typescript
{currentScreen === "my-feature" && <MyFeatureScreen />}
```

### Example: New API Call

1. **Add to API service**:
```typescript
export const newAPI = {
  async getData(id: string) {
    await delay(300);
    return { /* data */ };
  }
};
```

2. **Create hook** (`src/app/hooks.ts`):
```typescript
export const useNewData = () => {
  const [data, setData] = useState(null);
  
  const fetch = async (id) => {
    const result = await api.newAPI.getData(id);
    setData(result);
  };
  
  return { data, fetch };
};
```

3. **Use in component**:
```typescript
const { data, fetch } = useNewData();

useEffect(() => {
  fetch(id);
}, [id]);
```

## Form Validation

Pre-built validators in `src/app/validators.ts`:

```typescript
import { validateEmail, validatePassword, validateForm } from '@/app/validators';

// Single field
const { isValid, error } = validateEmail("user@example.com");

// Multiple fields
const { isValid, errors } = validateForm({
  email: { value: email, validator: validateEmail },
  password: { value: password, validator: validatePassword }
});

if (isValid) {
  // Submit form
}
```

## Notifications

Show user feedback with notifications:

```typescript
import { useAppNotification } from '@/app/hooks';

const { success, error } = useAppNotification();

// Success message (3s duration, auto-dismiss)
success("Profile updated successfully");

// Error message
error("Failed to upload image");

// Custom duration (0 = manual dismiss)
success("Copied to clipboard", 2000);
```

## Error Handling

App has two levels of error handling:

### 1. Error Boundary (Crash Recovery)
```typescript
// Automatically catches component errors
// Shows user-friendly error UI
// Provides "Try Again" button
```

### 2. API Error Handling
```typescript
try {
  await api.talent.likeTalent(id);
  success("Liked!");
} catch (err) {
  error(err.message);
}
```

## Database Integration (Future)

When connecting to real backend:

1. **Update environment**:
```env
NEXT_PUBLIC_API_URL=https://api.talentstage.com
NEXT_PUBLIC_ENABLE_MOCK_API=false
```

2. **Replace mock service** with real HTTP client:
```typescript
// src/app/api-service.ts
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const talentAPI = {
  async getTalents(filters) {
    const { data } = await client.get('/talents', { params: filters });
    return data;
  }
};
```

3. **Update authentication**:
```typescript
// Add token to requests
client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
# Follow prompts
```

### Manual Deployment
```bash
npm run build
npm run start
```

### Docker
```bash
docker build -t talentstage .
docker run -p 3000:3000 talentstage
```

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Dependencies won't install
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run dev
```

### Styles not loading
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Restart dev server

## Testing

When testing suite is added:

```bash
# Run tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage
```

## Performance Tips

1. **Images** - Use Next.js Image component
2. **Large lists** - Implement virtual scrolling
3. **API calls** - Use React Query for caching (future)
4. **Bundle** - Monitor with `npm run analyze`

## Need Help?

- Check [README.md](../README.md) for feature overview
- Review component examples in `src/components/screens/`
- Check API structure in `src/app/api-service.ts`
- Look at hook patterns in `src/app/hooks.ts`

---

**Happy coding! 🚀**

# TalentStage Testing Guide

## Overview
This document outlines the testing strategy and implementation for TalentStage MVP.

## Test Types & Coverage

### Unit Tests
Test individual functions and hooks in isolation.

```bash
npm test -- src/app/validators.test.ts
npm test -- src/app/hooks.test.tsx
```

**Coverage targets:**
- ✅ Validators (100%) - All validation functions
- ✅ Hooks (95%+) - useAuth, useAppNotification, useUser, useTalents
- ✅ Utilities (95%+) - formatDate, truncate, debounce, etc.

### Component Tests
Test components in isolation with mocked props and hooks.

```bash
npm test -- src/components/Button.test.tsx
npm test -- src/components/Input.test.tsx
```

**Components to test:**
- Button (5 variants, loading states, disabled)
- Input (validation, error states, accessibility)
- ErrorBoundary (error catching, retry)
- NotificationContainer (toast display, auto-dismiss)

### Integration Tests
Test component interactions and state flows.

**Scenarios:**
- Form submission with validation
- Auth flow: signup → verify → onboarding
- Screen navigation and state persistence
- API error handling and retry

### E2E Tests (Playwright)
Test complete user flows end-to-end.

```bash
npm install --save-dev @playwright/test
npx playwright test
```

**User scenarios:**
1. **Signup Flow**
   - Navigate to onboarding
   - Fill signup form with validation
   - Submit and receive verification
   - Complete verify screen
   - See feed with talents

2. **Feed Interaction**
   - View talent feed
   - Like a talent
   - Navigate to creator profile
   - See profile details

3. **Create Talent**
   - Navigate to create screen
   - Select media type
   - Upload content (simulated)
   - Add metadata
   - Publish talent

4. **Profile Management**
   - View user profile
   - Edit profile information
   - View achievements and skills
   - Browse user's own talents

## Running Tests

### Development
```bash
# Run all tests
npm test

# Watch mode for active development
npm test:watch

# Run specific test file
npm test Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="Button"
```

### CI/CD Pipeline
```bash
# Generate coverage report
npm test:coverage

# Coverage thresholds
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+
```

## Test File Structure

```
src/
  app/
    __tests__/
      validators.test.ts          # Form validation tests
      hooks.test.tsx              # Custom hooks tests
      api-service.test.ts         # API service tests
  components/
    __tests__/
      Button.test.tsx             # Button component tests
      Input.test.tsx              # Input component tests
      ErrorBoundary.test.tsx      # Error boundary tests
    screens/
      __tests__/
        FeedScreen.test.tsx        # Feed screen tests
        ProfileScreen.test.tsx     # Profile screen tests
```

## Example Test Cases

### Validator Tests
```typescript
describe('validateEmail', () => {
  it('returns valid for correct email', () => {
    expect(validateEmail('test@example.com')).toEqual({
      isValid: true
    })
  })

  it('returns invalid for malformed email', () => {
    const result = validateEmail('invalid.email')
    expect(result.isValid).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('prevents XSS attacks', () => {
    const result = validateEmail('<script>alert("xss")</script>')
    expect(result.isValid).toBe(false)
  })
})
```

### Hook Tests
```typescript
describe('useAuth', () => {
  it('returns initial auth state', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('signs up user successfully', async () => {
    const { result } = renderHook(() => useAuth())
    
    act(() => {
      result.current.signup({
        email: 'test@example.com',
        password: 'Test123!',
        displayName: 'Test User'
      })
    })

    await waitFor(() => {
      expect(result.current.user).toBeDefined()
    })
  })
})
```

### Component Tests
```typescript
describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('disables when loading', () => {
    render(<Button loading>Submit</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('calls onClick handler', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})
```

## Continuous Integration

### GitHub Actions Workflow
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v3
```

## Debugging Tests

### Debug in Browser
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
# Open chrome://inspect in Chrome DevTools
```

### Debug in VS Code
```json
{
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/jest/bin/jest.js",
  "args": ["--runInBand"],
  "console": "integratedTerminal"
}
```

### Common Issues

**Issue:** Tests timeout
**Solution:** Increase timeout or check for unresolved promises
```typescript
jest.setTimeout(10000)
```

**Issue:** Component renders warning
**Solution:** Wrap state updates in act()
```typescript
act(() => {
  setState(newValue)
})
```

**Issue:** Hook dependency warnings
**Solution:** Check dependencies array in useEffect
```typescript
useEffect(() => {
  // ...
}, [deps]) // include all used variables
```

## Performance Testing

### Lighthouse
```bash
npm install --save-dev lighthouse
npm run build
npx lighthouse https://localhost:3000
```

**Targets:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

### Bundle Size
```bash
npm install --save-dev @next/bundle-analyzer
ANALYZE=true npm run build
```

## Testing Checklist

- [ ] All unit tests passing (validators, utils, hooks)
- [ ] All component tests passing
- [ ] Integration tests for critical flows
- [ ] E2E tests for user scenarios
- [ ] Code coverage >80%
- [ ] No console errors/warnings
- [ ] Lighthouse score >90 on all metrics
- [ ] Bundle size within limits
- [ ] No accessibility violations

## Resources
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Guide](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

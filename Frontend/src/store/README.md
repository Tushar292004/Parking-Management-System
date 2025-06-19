# Redux Store Documentation

This document provides a detailed explanation of how Redux is implemented and utilized in the Parking Management System frontend.

## Table of Contents
- [Store Configuration](#store-configuration)
- [Redux Persistence](#redux-persistence)
- [State Management](#state-management)
- [Usage in Components](#usage-in-components)
- [Best Practices](#best-practices)

## Store Configuration

### Basic Setup
```javascript
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer';
```

**Key Components:**
1. **@reduxjs/toolkit**
   - Modern Redux setup with built-in best practices
   - Includes utilities for simplified Redux logic
   - Automatic DevTools configuration

2. **redux-persist**
   - Saves Redux state to local storage
   - Rehydrates state on page reload
   - Maintains user session

3. **storage medium**
   - Uses localStorage by default
   - Can be configured for different storage solutions
   - Handles serialization/deserialization

### Persistence Configuration
```javascript
const persistConfig = {
  key: 'root',
  storage,
};
```

**Configuration Options:**
- `key`: Root key for stored data in localStorage
- `storage`: Storage engine (localStorage in this case)
- State structure in localStorage:
  ```javascript
  {
    "root": {
      "user": {
        "id": "...",
        "name": "...",
        "email": "...",
        "token": "...",
        "type": "..."
      }
      // ... other reducers
    }
  }
  ```

### Persisted Reducer Setup
```javascript
const persistedReducer = persistReducer(persistConfig, rootReducer);
```

**Functionality:**
- Wraps root reducer with persistence capability
- Handles:
  - State saving to storage
  - State rehydration
  - Storage synchronization

### Store Creation
```javascript
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
```

**Store Features:**
- Centralized state container
- Automatic DevTools setup
- Thunk middleware included
- State persistence handling

## Redux Persistence

### How Persistence Works

1. **Storage Process:**
   ```javascript
   // When state changes
   dispatch(action) → reducer → new state → persistReducer → localStorage
   ```

2. **Rehydration Process:**
   ```javascript
   // On page load
   localStorage → persistReducer → initial state → components
   ```

3. **Persistence Flow:**
   ```mermaid
   graph TD
      A[Component Action] --> B[Dispatch]
      B --> C[Reducer]
      C --> D[New State]
      D --> E[Persist Reducer]
      E --> F[localStorage]
      F -.-> G[Page Reload]
      G -.-> H[Rehydrate State]
      H -.-> I[Components]
   ```

## State Management

### Current State Structure
```javascript
{
  user: {
    id: string,
    name: string,
    email: string,
    token: string,
    type: 'admin' | 'owner' | 'seeker'
  }
  // ... other state slices
}
```

### Accessing State in Components

1. **Using useSelector:**
   ```javascript
   const user = useSelector((state) => state.user);
   ```

2. **Using useDispatch:**
   ```javascript
   const dispatch = useDispatch();
   dispatch(setUser(userData));
   ```

## Usage in Components

### Authentication Flow
```javascript
// Login.js
const Login = () => {
    const dispatch = useDispatch();
    
    const handleLoginSuccess = (data) => {
        // Updates persisted state
        dispatch(setUser({ 
            ...data?.user, 
            token: data?.token 
        }));
        navigate('/');
    };
};
```

### Protected Routes
```javascript
// Layout.js
const Layout = () => {
    const user = useSelector((state) => state.user);
    
    useEffect(() => {
        if (!user && location.pathname !== '/' && location.pathname !== '/about') {
            navigate('/login');
        }
    }, [user, location]);
};
```

### User Type-Based Rendering
```javascript
// Component example
{user?.type === "admin" && (
    <AdminComponent />
)}

{user?.type === "owner" && (
    <OwnerDashboard />
)}
```

## Best Practices

### 1. State Updates
```javascript
// ✅ Good Practice
dispatch(setUser({ ...user, newProperty: value }));

// ❌ Bad Practice
dispatch(setUser({ newProperty: value })); // Incomplete state
```

### 2. Selector Usage
```javascript
// ✅ Good Practice
const userData = useSelector((state) => state.user);

// ❌ Bad Practice
const state = useSelector((state) => state); // Avoid full state selection
```

### 3. Action Handling
```javascript
// ✅ Good Practice
dispatch(setUser(null)); // For logout

// ❌ Bad Practice
dispatch({ type: 'LOGOUT' }); // Avoid raw actions
```

### 4. Persistence Considerations
- Only persist essential data
- Clear sensitive data on logout
- Handle rehydration errors
- Version state structure

## Security Considerations

1. **Token Storage:**
   - JWT tokens are persisted
   - Cleared on logout
   - Protected against XSS via httpOnly cookies

2. **Sensitive Data:**
   - Minimize persisted sensitive data
   - Clear on session end
   - Encrypt if necessary

3. **State Access:**
   - Role-based state access
   - Validation before actions
   - Error boundary protection

## Performance Optimization

1. **Selective Persistence:**
   - Only persist necessary state
   - Use blacklist/whitelist
   - Clear temporary data

2. **State Structure:**
   - Normalize state shape
   - Minimize nested objects
   - Use proper selectors

3. **Rehydration:**
   - Handle loading states
   - Fallback UI during rehydration
   - Error recovery

This documentation provides a comprehensive overview of how Redux is implemented and utilized in the application. The store configuration ensures proper state management with persistence, while following Redux best practices and maintaining security considerations. 
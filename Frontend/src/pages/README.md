# Pages Documentation

This document provides a detailed overview of each page component in the Parking Management System, including their security measures and functionality.

## Table of Contents
- [Layout (Layout.js)](#layout)
- [Authentication Pages](#authentication-pages)
  - [Login](#login)
  - [Register](#register)
- [User Management](#user-management)
  - [Profile](#profile)
  - [Users](#users)
- [Parking Management](#parking-management)
  - [Parking](#parking)
  - [ParkingForm](#parkingform)
  - [Space](#space)
  - [SpaceForm](#spaceform)
- [Booking Management](#booking-management)
  - [Booking](#booking)
  - [BookingForm](#bookingform)
- [Reviews](#reviews)
- [Other Pages](#other-pages)
  - [Home](#home)
  - [About](#about)
  - [NoPage](#nopage)

## Layout
**File:** `Layout.js`
- **Security:** Acts as the main authentication wrapper
- **Features:**
  - Checks user authentication status on every route change
  - Redirects unauthenticated users to login page
  - Manages navigation menu based on user type (admin/owner/seeker)
  - Handles user logout
- **Protected Routes:** All routes except '/' and '/about'
- **State Management:** Uses Redux for user state
- **Outlet Component:**
  ```jsx
  <main>
      <Outlet />
  </main>
  ```
  - The `Outlet` is a special React Router component that renders the child route's element
  - It enables nested routing in the application
  - When a child route is matched (e.g., '/parking' or '/profile'), its component is rendered inside the Layout where the Outlet is placed
  - This allows the Layout (navigation, footer, etc.) to remain constant while only the main content area changes
  - Benefits:
    - Consistent UI layout across pages
    - Shared authentication logic
    - Common navigation and footer
    - Reduced code duplication
  - Example flow:
    1. User visits '/parking'
    2. Layout component renders
    3. Outlet renders the Parking component inside Layout
    4. Navigation and other Layout elements remain unchanged

## Authentication Pages

### Login
**File:** `Login.js`
- **Security:**
  - Form validation for email and password
  - JWT token-based authentication
  - Error handling for invalid credentials
- **Features:**
  - User login form
  - Stores user data and token in Redux
  - Redirects to home page after successful login
- **Access:** Public
- **React Hooks Usage:**
  ```javascript
  const navigate = useNavigate()
  const dispatch = useDispatch();
  ```
  - **Hook Explanation:**
    1. **useNavigate Hook:**
       - Part of React Router DOM
       - Used for programmatic navigation
       - Allows redirecting users to different routes
       - Example usages:
         - `navigate('/')` - Redirect to home page
         - `navigate(-1)` - Go back to previous page
         - `navigate('/profile')` - Go to profile page

    2. **useDispatch Hook:**
       - Part of React Redux
       - Returns the dispatch function from Redux store
       - Used to dispatch actions to update Redux state
       - Essential for updating global state
       - Example usage:
         - `dispatch(setUser(userData))` - Update user state
         - `dispatch(clearUser())` - Clear user state on logout

    3. **Benefits of These Hooks:**
       - Clean and functional approach to routing
       - Centralized state management
       - Type-safe dispatching of actions
       - Better code organization
       - Easier testing and maintenance

- **Login Process Implementation:**
  ```javascript
  // Login API call with callback functions for handling response
  const handleLogin = () => {
      login({ email, password, handleLoginSuccess, handleLoginFailure })
  }

  const handleLoginSuccess = (data) => {
      dispatch(setUser({ ...data?.user, token: data?.token }));
      navigate('/')
  }

  const handleLoginFailure = (error) => {
      setError(error)
  }
  ```
  - **Code Explanation:**
    1. **handleLogin Function:**
       - Main login handler that triggers when user clicks login button
       - Calls the `login` API function with:
         - User credentials (email, password)
         - Success and failure callback functions
       - Uses callback pattern for better error handling and success management

    2. **handleLoginSuccess Function:**
       - Executes when login is successful
       - Receives user data and JWT token from backend
       - Uses Redux dispatch to:
         - Store user information in global state
         - Store JWT token for authentication
       - Navigates user to home page after successful login
       - Preserves login state across page refreshes (via Redux persist)

    3. **handleLoginFailure Function:**
       - Executes when login fails
       - Sets error state with failure message from backend
       - Displays error message to user
       - Common failure scenarios:
         - Invalid credentials
         - Server errors
         - Network issues

    4. **Security Considerations:**
       - JWT token stored securely in Redux state
       - Error messages handled gracefully
       - No sensitive data logged to console
       - Proper state management for user feedback

### Register
**File:** `Register.js`
- **Security:**
  - Input validation for all fields
  - Password strength requirements
  - User type validation
- **Features:**
  - Registration form for new users
  - User type selection (owner/seeker)
  - Success/error message handling
- **Access:** Public

## User Management

### Profile
**File:** `Profile.js`
- **Security:**
  - Protected route (requires authentication)
  - Password change validation
  - User data validation
- **Features:**
  - Display user information
  - Update payment methods
  - Change password functionality
- **Access:** Authenticated users only

### Users
**File:** `Users.js`
- **Security:**
  - Admin-only access
  - Protected route
- **Features:**
  - List all users
  - User management functions
  - Filter users by type
- **Access:** Admin users only

## Parking Management

### Parking
**File:** `Parking.js`
- **Security:**
  - Protected route
  - Owner-specific data filtering
- **Features:**
  - Display parking locations
  - Search and filter functionality
  - Owner ratings display
- **Access:** Authenticated users

### ParkingForm
**File:** `ParkingForm.js`
- **Security:**
  - Owner-only access
  - Protected route
  - Input validation
- **Features:**
  - Create new parking locations
  - Update existing parking details
  - Location validation
- **Access:** Owner users only

### Space
**File:** `Space.js`
- **Security:**
  - Protected route
  - Booking validation
- **Features:**
  - Display parking spaces
  - Space availability check
  - Booking integration
- **Access:** Authenticated users

### SpaceForm
**File:** `SpaceForm.js`
- **Security:**
  - Owner-only access
  - Protected route
  - Time slot validation
- **Features:**
  - Create parking spaces
  - Set availability and pricing
  - Time slot management
- **Access:** Owner users only

## Booking Management

### Booking
**File:** `Booking.js`
- **Security:**
  - Protected route
  - User-specific booking access
- **Features:**
  - View bookings
  - Booking status management
  - Filter by date/status
- **Access:** Authenticated users

### BookingForm
**File:** `BookingForm.js`
- **Security:**
  - Protected route
  - Space availability validation
  - User authentication check
- **Features:**
  - Create new bookings
  - Vehicle information input
  - Space selection
- **Access:** Authenticated users

## Reviews
**File:** `Reviews.js`
- **Security:**
  - Protected route
  - One review per user per owner
- **Features:**
  - Add/view reviews
  - Rating system
  - Owner-specific reviews
- **Access:** Authenticated users

## Other Pages

### Home
**File:** `Home.js`
- **Security:** Public access
- **Features:**
  - Landing page
  - Search functionality
  - Featured spaces
- **Access:** Public

### About
**File:** `About.js`
- **Security:** Public access
- **Features:**
  - Static information
  - Contact details
  - System overview
- **Access:** Public

### NoPage
**File:** `NoPage.js`
- **Security:** N/A
- **Features:**
  - 404 error page
  - Redirect to home
- **Access:** Public

## Security Overview

### Global Security Measures
1. **Route Protection:**
   - Layout component checks authentication
   - Automatic redirect to login for unauthenticated users
   - Role-based access control

2. **State Management:**
   - Redux for user state
   - Persistent login state
   - Secure token storage

3. **API Security:**
   - JWT token authentication
   - Request validation
   - Error handling

4. **Input Validation:**
   - Form data validation
   - Type checking
   - Error messaging

### User Role Access
- **Admin:** Full access to all features
- **Owner:** Access to parking/space management
- **Seeker:** Access to booking and reviews 
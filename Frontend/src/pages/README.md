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
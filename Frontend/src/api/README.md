# API Documentation

This document provides a detailed explanation of all API functions used in the Frontend of the Parking Management System. These functions handle communication between the frontend and backend services.

## Table of Contents
- [Configuration](#configuration)
- [Authentication APIs](#authentication-apis)
- [User Management APIs](#user-management-apis)
- [Parking Management APIs](#parking-management-apis)
- [Space Management APIs](#space-management-apis)
- [Booking Management APIs](#booking-management-apis)
- [Review Management APIs](#review-management-apis)
- [Payment Method APIs](#payment-method-apis)

## Configuration
```javascript
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/';
```
- Base URL configuration for all API calls
- Uses environment variable with fallback to localhost
- Axios for HTTP requests

## Authentication APIs

### Login
```javascript
export const login = async ({ 
    email, 
    password, 
    handleLoginSuccess, 
    handleLoginFailure 
}) => {
    try {
        const result = await axios.post(
            `${BASE_URL}user/login`, 
            { email, password }
        );
        if (result?.data?.token) {
            return handleLoginSuccess(result.data)
        }
    } catch (error) {
        handleLoginFailure(error?.response?.data?.error)
    }
}
```
**Features:**
- User authentication
- JWT token handling
- Success/failure callbacks
- Error handling

### Register
```javascript
export const register = async ({ 
    name, 
    email, 
    password, 
    type, 
    handleRegisterSuccess, 
    handleRegisterFailure 
}) => {
    try {
        const result = await axios.post(
            `${BASE_URL}user/register`, 
            { name, email, password, type }
        );
        if (result?.data?.name) {
            return handleRegisterSuccess()
        }
        handleRegisterFailure('Registration failed')
    } catch (error) {
        handleRegisterFailure(error?.response?.data?.error)
    }
}
```
**Features:**
- New user registration
- User type specification
- Input validation
- Error handling

## User Management APIs

### Reset Password
```javascript
export const resetPassword = async ({ 
    user_id, 
    body, 
    handleResetPasswordSuccess, 
    handleResetPasswordFailure 
}) => {
    try {
        const result = await axios.post(
            `${BASE_URL}user/resetPassword/${user_id}`, 
            { ...body }
        );
        if (result?.data?.user) {
            return handleResetPasswordSuccess(result.data)
        }
    } catch (error) {
        handleResetPasswordFailure(error?.response?.data?.error)
    }
}
```
**Features:**
- Password reset functionality
- User verification
- Success/failure handling

### Update User
```javascript
export const updateUser = async ({ 
    user_id, 
    body, 
    handleUpdateUserSuccess, 
    handleUpdateUserFailure 
}) => {
    try {
        const result = await axios.put(
            `${BASE_URL}user/${user_id}`, 
            { ...body }
        );
        if (result?.data?.user) {
            return handleUpdateUserSuccess(result.data)
        }
    } catch (error) {
        handleUpdateUserFailure(error?.response?.data?.error)
    }
}
```
**Features:**
- Profile updates
- Data validation
- Response handling

## Parking Management APIs

### Create Parking
```javascript
export const createParking = async ({ 
    body, 
    handleCreateParkingSuccess, 
    handleCreateParkingFailure 
}) => {
    try {
        const result = await axios.post(
            `${BASE_URL}parking`, 
            { ...body }
        );
        if (result?.data?.parking) {
            return handleCreateParkingSuccess(result.data)
        }
    } catch (error) {
        handleCreateParkingFailure(error?.response?.data?.error)
    }
}
```
**Features:**
- New parking location creation
- Location data validation
- Owner verification

### Fetch Parking
```javascript
export const fetchParking = async ({ 
    setParking, 
    user_id 
}) => {
    try {
        const result = await axios.get(
            `${BASE_URL}parking${user_id ? `?user_id=${user_id}` : ''}`
        );
        if (result?.data?.length) {
            setParking(result?.data)
        }
    } catch (error) {
        console.error('fetchParking ', error);
    }
}
```
**Features:**
- List all parking locations
- Filter by owner
- State management integration

## Space Management APIs

### Create Space
```javascript
export const createSpace = async ({ 
    body, 
    handleCreateSpaceSuccess, 
    handleCreateSpaceFailure 
}) => {
    try {
        const result = await axios.post(
            `${BASE_URL}space`, 
            { ...body }
        );
        if (result?.data?.space) {
            return handleCreateSpaceSuccess(result.data)
        }
    } catch (error) {
        handleCreateSpaceFailure(error?.response?.data?.error)
    }
}
```
**Features:**
- Parking space creation
- Availability settings
- Price configuration

### Fetch Spaces
```javascript
export const fetchSpaces = async ({ 
    setSpaces, 
    filters 
}) => {
    try {
        let queryString = '';
        if (filters) {
            queryString = Object.keys(filters)
                .map(key => `${key}=${filters[key]}`)
                .join('&');
        }
        const result = await axios.get(
            `${BASE_URL}space${queryString ? `?${queryString}` : ''}`
        );
        if (result?.data?.length) {
            setSpaces(result?.data)
        }
    } catch (error) {
        console.error('fetchSpaces ', error);
    }
}
```
**Features:**
- List available spaces
- Advanced filtering
- Availability checking

## Booking Management APIs

### Create Booking
```javascript
export const createBooking = async ({ 
    body, 
    handleCreateBookingSuccess, 
    handleCreateBookingFailure 
}) => {
    try {
        const result = await axios.post(
            `${BASE_URL}booking`, 
            { ...body }
        );
        if (result?.data?.booking) {
            return handleCreateBookingSuccess(result.data)
        }
    } catch (error) {
        handleCreateBookingFailure(error?.response?.data?.error)
    }
}
```
**Features:**
- New booking creation
- Vehicle details handling
- Booking confirmation

### Fetch Bookings
```javascript
export const fetchBookings = async ({ 
    setBookings, 
    user_id, 
    owner_id 
}) => {
    try {
        let url = `${BASE_URL}booking`;
        if (user_id) url += `?user_id=${user_id}`;
        if (owner_id) url += `${user_id ? '&' : '?'}owner_id=${owner_id}`;
        
        const result = await axios.get(url);
        if (result?.data?.length) {
            setBookings(result?.data)
        }
    } catch (error) {
        console.error('fetchBookings ', error);
    }
}
```
**Features:**
- List user bookings
- Filter by owner/user
- Booking status tracking

## Review Management APIs

### Create Review
```javascript
export const createReview = async ({ 
    body, 
    handleCreateReviewSuccess, 
    handleCreateReviewFailure 
}) => {
    try {
        const result = await axios.post(
            `${BASE_URL}review`, 
            { ...body }
        );
        if (result?.data?.review) {
            return handleCreateReviewSuccess(result.data)
        }
    } catch (error) {
        handleCreateReviewFailure(error?.response?.data?.error)
    }
}
```
**Features:**
- Review submission
- Rating system
- Duplicate prevention

## Common Features

### Error Handling
```javascript
catch (error) {
    console.error('API Error: ', error);
    handleFailure(error?.response?.data?.error)
}
```
- Consistent error handling
- Detailed error messages
- Client-side logging

### Success Handling
```javascript
if (result?.data?.someData) {
    return handleSuccess(result.data)
}
```
- Response validation
- Data transformation
- State updates

### URL Construction
```javascript
const constructUrl = (base, params) => {
    const queryString = Object.keys(params)
        .filter(key => params[key])
        .map(key => `${key}=${params[key]}`)
        .join('&');
    return `${base}${queryString ? `?${queryString}` : ''}`;
};
```
- Dynamic query parameters
- Clean URL construction
- Parameter validation

## Best Practices

1. **Error Handling**
   - Consistent error format
   - Meaningful error messages
   - Client-side logging

2. **Response Processing**
   - Data validation
   - Type checking
   - Null checking

3. **State Management**
   - Redux integration
   - Local state updates
   - Loading states

4. **Security**
   - Token handling
   - Input validation
   - Secure data transmission

This documentation provides a comprehensive overview of the frontend API functions and their implementations. Each API function is designed to handle specific aspects of the parking management system while maintaining consistency in error handling, data validation, and state management. 
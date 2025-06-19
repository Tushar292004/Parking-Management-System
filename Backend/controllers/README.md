# Controllers Documentation

This document provides a detailed explanation of all controllers in the Parking Management System backend, including their routes, middleware, and functionality.

## Table of Contents
- [Authentication Middleware](#authentication-middleware)
- [User Controller](#user-controller)
- [Parking Controller](#parking-controller)
- [Space Controller](#space-controller)
- [Booking Controller](#booking-controller)
- [Review Controller](#review-controller)
- [Payment Method Controller](#payment-method-controller)

## Authentication Middleware
**File:** `middleware.js`

The authentication middleware verifies JWT tokens for protected routes.

```javascript
const isLoggedIn = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                const payload = await jwt.verify(token, process.env.SECRET || "jafha71yeiqquy1#@!");
                if (payload) {
                    req.user = payload;
                    next();
                } else {
                    res.status(400).json({ error: "token verification failed" });
                }
            }
        } else {
            res.status(400).json({ error: "No authorization header" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};
```

**Key Features:**
- Extracts JWT token from Authorization header
- Verifies token authenticity
- Attaches user payload to request object
- Error handling for invalid/missing tokens

## User Controller
**File:** `user.js`

Manages user authentication and profile operations.

### Key Endpoints:

1. **Register User**
```javascript
userRouter.post("/register", async (req, res) => {
    try {
        let { name, email, password, type } = req.body;
        // Input validation using Joi
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().min(8).max(50).required().email(),
            password: Joi.string().min(6).required().max(20)
                .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/),
            type: Joi.string().valid("admin", "seeker", "owner"),
        });
        // Password encryption & user creation
        password = bcrypt.hashSync(password, 10);
        const user = await User.create({ name, email, password, type });
    }
});
```

2. **Login User**
```javascript
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                const token = await jwt.sign({ email: user.email }, SECRET_JWT_CODE);
                res.json({ user, token });
            }
        }
    }
});
```

**Features:**
- User registration with role selection
- Secure password hashing
- JWT token generation
- Input validation using Joi
- Password strength requirements

## Parking Controller
**File:** `parking.js`

Manages parking locations and their details.

### Key Endpoints:

1. **Create Parking**
```javascript
parkingRouter.post("/", async (req, res) => {
    try {
        let { name, address, city, lat, long, user_id } = req.body;
        const schema = Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            lat: Joi.string().required(),
            long: Joi.string().required(),
            user_id: Joi.string().required(),
        });
        const parking = await Parking.create({ 
            name, address, city, lat, long, user_id 
        });
    }
});
```

2. **Get Parking List with Ratings**
```javascript
parkingRouter.get("/", async (req, res) => {
    try {
        const { user_id } = req.query;
        let parking = await Parking.find(user_id ? { user_id } : {})
            .populate('user_id');
        
        const reviews = await Review.find();
        const parkingWithOwnerRatings = parking.map((item) => {
            // Calculate average rating
            let rating = 0;
            let count = 0;
            const userReviews = reviews.filter((review) => 
                review.owner_id.equals(item?.user_id?._id)
            );
            // Add rating to parking object
            return { ...item.toObject(), owner_rating };
        });
    }
});
```

**Features:**
- Create parking locations
- Fetch parking with owner ratings
- Location validation
- Owner-specific queries

## Space Controller
**File:** `spaceRouter.js`

Manages individual parking spaces within parking locations.

### Key Endpoints:

1. **Get Available Spaces**
```javascript
spaceRouter.get("/", async (req, res) => {
    try {
        const { user_id, parking_id, date, city, time, availability } = req.query;
        let query = {};
        
        // Build query based on filters
        if (parking_id) query.parking_id = parking_id;
        if (date) query.date = new Date(date);
        if (time) query.slot_start_time = time;

        // Check space availability
        const bookings = await Booking.find();
        const bookedSpaces = new Set();
        bookings.forEach(booking => {
            if (booking.confirm_booking === 'approved') {
                bookedSpaces.add(booking.space_id.toString());
            }
        });

        let spaces = await Space.find(query).populate('parking_id');
        
        // Add booking status to spaces
        const spacesWithBookedFlag = spaces.map(space => ({
            ...space.toJSON(),
            is_booked: bookedSpaces.has(space._id.toString())
        }));
    }
});
```

**Features:**
- Space availability checking
- Filtering by various parameters
- Booking status integration
- Complex query building

## Booking Controller
**File:** `booking.js`

Manages parking space bookings.

### Key Endpoints:

1. **Create Booking**
```javascript
bookingRouter.post("/", async (req, res) => {
    try {
        let { vehicle_company, vehicle_model, plate_number, 
              car_color, space_id, user_id, 
              confirm_booking = "pending" } = req.body;

        // Validate booking data
        const schema = Joi.object({
            vehicle_company: Joi.string().required(),
            vehicle_model: Joi.string().required(),
            plate_number: Joi.string().required(),
            car_color: Joi.string().required(),
            space_id: Joi.string().required(),
            user_id: Joi.string().required(),
            confirm_booking: Joi.string()
                .valid("approved", "pending", "rejected"),
        });

        // Check for existing booking
        const existsBooking = await Booking.findOne({ user_id, space_id });
        if (!existsBooking) {
            const booking = await Booking.create({ 
                vehicle_company, vehicle_model, plate_number,
                car_color, space_id, user_id, confirm_booking 
            });
        }
    }
});
```

2. **Update Booking Status**
```javascript
bookingRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { confirm_booking } = req.body;

        if (updatedBookingObj?.confirm_booking === 'approved') {
            // Reject other bookings for same space
            await Booking.updateMany(
                { space_id }, 
                { $set: { confirm_booking: 'rejected' } }
            );
        }
    }
});
```

**Features:**
- Booking creation with validation
- Booking status management
- Duplicate booking prevention
- Automatic rejection of conflicting bookings

## Review Controller
**File:** `review.js`

Manages user reviews for parking space owners.

### Key Endpoints:

1. **Create Review**
```javascript
reviewRouter.post("/", async (req, res) => {
    try {
        let { message, rating, owner_id, user_id } = req.body;

        // Validate review data
        const schema = Joi.object({
            message: Joi.string().required(),
            rating: Joi.number().required(),
            owner_id: Joi.string().required(),
            user_id: Joi.string().required(),
        });

        // Prevent duplicate reviews
        const reviewExists = await Review.findOne({ owner_id, user_id });
        if (!reviewExists) {
            const review = await Review.create({ 
                message, rating, owner_id, user_id 
            });
        }
    }
});
```

**Features:**
- Review creation with rating
- Duplicate review prevention
- Input validation
- Owner-specific reviews

## Payment Method Controller
**File:** `paymentMethod.js`

Manages payment methods for parking spaces.

### Key Endpoints:

1. **Create Payment Method**
```javascript
paymentMethodRouter.post("/", async (req, res) => {
    try {
        let { cash, interac } = req.body;

        const schema = Joi.object({
            cash: Joi.boolean().required(),
        });

        const paymentMethod = await PaymentMethod.create({ 
            cash, interac 
        });
    }
});
```

**Features:**
- Payment method creation
- Multiple payment type support
- Input validation
- Payment method updates

## Common Features Across Controllers

1. **Input Validation**
- All controllers use Joi for request validation
- Structured validation schemas
- Consistent error handling

2. **Error Handling**
```javascript
try {
    // Controller logic
} catch (error) {
    console.error("error - ", error);
    res.status(400).json({ error });
}
```

3. **Response Format**
- Success responses include data/message
- Error responses include error details
- Consistent HTTP status codes

4. **Database Operations**
- Mongoose models for data operations
- Population of related data
- Transaction handling where needed

5. **Security**
- JWT authentication
- Input sanitization
- Role-based access control
- Data validation

This documentation provides a comprehensive overview of the backend controllers and their functionality. Each controller is designed to handle specific aspects of the parking management system while maintaining consistency in error handling, validation, and security measures. 
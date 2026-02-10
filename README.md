# WanderLust 🌍

WanderLust is an Airbnb-inspired web application that allows users to explore travel listings, create accounts, and manage property listings.  
The project is built using **Node.js, Express.js, MongoDB, and EJS**, following a clean **MVC (Model–View–Controller)** architecture.

This project focuses on backend logic, authentication, database relationships, and real-world web development practices.

---

## Problem Statement

Many travel platforms are complex and overloaded with features.  
WanderLust aims to provide a **simple, clean, and user-friendly platform** where users can explore stays, list properties, and share reviews with ease.

---

## Features

### User Authentication
- User Sign Up
- User Login & Logout
- Password hashing and secure sessions using Passport.js

### Listings Management
- Create new travel listings
- Edit existing listings
- Delete listings
- View all listings with images and prices

### Reviews System
- Add reviews to listings
- Delete reviews
- Relationship between listings and reviews using MongoDB

### UI & UX
- Clean and minimal user interface
- Light and Dark mode
- Responsive layout
- Flash messages for success and error handling

---

## Tech Stack

### Frontend
- EJS (Embedded JavaScript Templates)
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose (ODM)

### Authentication & Security
- Passport.js
- Express-session
- Password hashing

### Other Tools
- Cloudinary (image storage)
- Git & GitHub (version control)

---

## Project Architecture

The project follows **MVC architecture**:

- **Models** → MongoDB schemas (User, Listing, Review)
- **Views** → EJS templates for UI
- **Controllers** → Business logic
- **Routes** → RESTful routing
- **Middleware** → Authentication & authorization logic
- **Utils** → Error handling and async wrappers

This structure improves scalability, readability, and maintainability.

---

## Folder Structure

controllers/
models/
routes/
views/
public/
utils/
init/
app.js
middleware.js
schema.js


---

## How to Run the Project Locally

1. Clone the repository
git clone https://github.com/your-username/WanderLust.git


2. Navigate to the project folder
cd WanderLust


3. Install dependencies
npm install


4. Create a `.env` file and add:
DB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
SECRET=your_session_secret


5. Start the server
node app.js


6. Open browser and visit:
http://localhost:8080


---

## Learning Outcomes

- Practical understanding of MVC architecture
- Authentication and authorization using Passport.js
- RESTful APIs with Express
- MongoDB schema design and relationships
- Session management and flash messages
- Real-world project structuring
- GitHub project management

---

## Future Enhancements

- Booking and reservation system
- User profile pages
- Map integration for listings
- Payment gateway integration
- Admin dashboard
- Deployment to cloud platforms

---

## Author

**Syeda Muskan SR**  
Engineering Student | MERN Stack Developer

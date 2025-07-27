# Megal Water Well Drilling Website

A full-stack dynamic website for Megal Water Well Drilling PLC built with the MERN stack.

## Features

- Dynamic content management via admin panel
- Services, Projects, Gallery, Videos, and Testimonials management
- Contact information and About Us customization
- Quote request submission and management
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React.js + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Project Structure

- `/megal` - React frontend
- `/server` - Express.js backend

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/megal
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd megal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the megal directory with the following variables:
   ```
   VITE_APP_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

5. The site should now be accessible at `http://localhost:5173`

### Initial Admin Setup

1. Access MongoDB and manually create an admin user:
   ```javascript
   db.users.insertOne({
     username: "admin",
     password: "admin123", // Change this to a secure password
     role: "admin"
   })
   ```

2. Login to the admin panel at `http://localhost:5173/login` with the created credentials

## Deployment

### Backend

1. Update the `.env` file with production settings:
   ```
   NODE_ENV=production
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_jwt_secret
   ```

2. Build and deploy to your hosting provider of choice

### Frontend

1. Build the frontend:
   ```
   cd megal
   npm run build
   ```

2. The built files will be in the `dist` directory, which can be deployed to any static web hosting service

## License

All rights reserved © Megal Water Well Drilling PLC 

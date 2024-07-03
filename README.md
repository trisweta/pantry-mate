# Pantry Mate

Pantry Mate is a comprehensive recipe management web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This app allows users to create, save, delete, and update recipes with image uploads.

## Features

- **User Authentication**: Secure user registration and login using JWT authentication.
- **Recipe Management**: Create, view, edit, delete, and save recipes.
- **Image Uploads**: Upload recipe images to Cloudinary.
- **Responsive UI**: User-friendly and responsive interface using React and Redux.
- **Secure Sessions**: Maintain secure user sessions with cookies and JWT.

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB
- Cloudinary Account (for image uploads)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/pantrymate.git
    cd pantrymate
    ```

2. **Backend Setup**:
    ```bash
    cd server
    npm install
    ```

3. **Create a `.env` file in the backend directory and add the following**:
    ```env
    PORT = your_desired_port_number
    MONGO_URI=your_mongodb_uri
    ACCESS_TOKEN_SECRET=your_jwt_secret
    ACCESS_TOKEN_EXPIRY=1h
    ```

4. **Start the backend server**:
    ```bash
    npm run devStart
    ```

5. **Frontend Setup**:
    ```bash
    cd client
    npm install
    ```

6. **Start the frontend server**:
    ```bash
    npm run dev
    ```

### Running the Application

- Navigate to `http://localhost:5173` in your web browser to see the application running.

## Tech Stack

- **Frontend**: React.js, Redux, CSS, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT
- **Image Storage**: Cloudinary

![image](https://github.com/trisweta/pantry-mate/assets/92795084/7f76aef8-cd25-4a45-b444-932a0885d88a)

![image](https://github.com/trisweta/pantry-mate/assets/92795084/e2c46f54-2cb4-4f17-8bf9-632dca4ad5e5)

![image](https://github.com/trisweta/pantry-mate/assets/92795084/d6180d08-0d7f-4c09-b034-5405adb60c07)

![image](https://github.com/trisweta/pantry-mate/assets/92795084/30230888-cea0-4be0-8fe4-b8cf3412d3a3)

![image](https://github.com/trisweta/pantry-mate/assets/92795084/4d4b7392-a993-4322-9d33-be10e87dffed)

![image](https://github.com/trisweta/pantry-mate/assets/92795084/f933ed81-3076-4879-bc92-8f5eac134285)

![image](https://github.com/trisweta/pantry-mate/assets/92795084/63a9250d-f809-4e06-91e3-3c707e5816c7)


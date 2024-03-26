# Blog Post Project

## Overview

This is a full-stack blog post project built using MongoDB, Express.js, React with Vite, and Tailwind CSS. The project allows users to write, edit, read, and delete their own blogs. Users can also search for blogs by keywords in titles and they can also filter their own blogs. The application features an awesome design crafted using Tailwind CSS. Additionally, the project utilizes various libraries and tools such as Multer for image upload, JSON Web Token (JWT) for authentication, Bcrypt for message encryption and decryption, Input validation with Zod and Dotenv for managing environment variables.

![home1](https://github.com/halas77/gucha_blog_posts/assets/138193176/17570c9a-baf8-489b-88b6-e245ac643af4)


## Features

- **User Authentication:** Utilizes JSON Web Tokens for user authentication and authorization.
- **Blog Management:** Users can write, edit, read, and delete their own blogs.
- **Search and Filter:** Users can search for blogs by keywords in their titles and filter for their own blogs only.
- **Image Upload:** Integrated Multer for uploading images to the server.
- **Input Validation:** Integrated input validation with zod in both client and server side.
- **Secure Data Storage:** Employs Bcrypt for secure message encryption and decryption.
- **Responsive Design:** Utilizes Tailwind CSS for creating responsive and visually appealing user interfaces.
- **Environment Variables:** Dotenv is used for managing environment variables, ensuring secure configuration management.

## Tech Stack

- **Frontend:** React (with Vite)
- **Backend:** Express.js
- **Database:** MongoDB
- **CSS Framework:** Tailwind CSS

## Installation

1. Clone the repository: https://github.com/halas77/gucha_blog_posts.git 
2. Install dependencies for both frontend and backend:

```bash
cd gucha-blog-posts
cd frontend
npm install
cd ../backend
npm install
```

## Set up environment variables

1. Create a `.env` file in the backend directory.
2. Define your environment variables in the `.env` file. Example:

    ```bash
    PORT=5000
    MONGODB_URL=YOUR_MONGODB_URI
    SECRET=your_secret_key
    ```

## Usage

1. Start the backend server:

    ```bash
    cd backend
    nodemon app.js
    ```

2. Start the frontend development server:

    ```bash
    cd frontend
    npm run dev
    ```







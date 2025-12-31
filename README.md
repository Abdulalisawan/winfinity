# 🏆 WinfinityHub – Contest Management Platform

🔗 Live Website: https://winfinityhub.netlify.app/

---

## 📌 Project Overview

WinfinityHub is a full-stack contest management platform where users can explore contests, securely participate, submit tasks, and compete to win prizes.  
The platform supports role-based access control with separate dashboards for Admins, Contest Creators, and Normal Users, ensuring a smooth and secure experience.

This project focuses on real-world application architecture, secure authentication, payment handling, and scalable backend logic.

---

## 📸 Project Screenshot

Add a clean screenshot of the homepage or contest listing page.  
Save the image as `screenshot.png` in the root directory.

![WinfinityHub Screenshot](./screenshot.jpeg)

---

## 🚀 Key Features

- Secure authentication using Firebase (Email/Password + Google)
- JWT-based authentication with HTTP-only cookies
- Role-based access control (Admin, Contest Creator, User)
- Contest creation, update, and deletion with admin approval
- Stripe payment integration for contest registration
- Payment verification before participation
- Real-time participation tracking and duplicate prevention
- Task submission system (one submission per user)
- Winner declaration with automatic stats update
- User dashboard for participation and winning history
- Leaderboard showing top users by total wins
- Search contests by category and popularity
- Fully responsive UI for mobile, tablet, and desktop devices

---

## 🧰 Technologies Used

Frontend:
- React
- React Router
- React Query
- Tailwind CSS
- DaisyUI

Backend:
- Node.js
- Express.js
- MongoDB

Authentication & Security:
- Firebase Authentication
- JSON Web Token (JWT)
- HTTP-only cookies

Payments:
- Stripe

---

## 📦 Main Dependencies

- react
- react-router-dom
- @tanstack/react-query
- firebase
- axios
- stripe
- express
- mongodb
- jsonwebtoken

---

## ⚙️ How to Run the Project Locally

Step 1: Clone the repository  
git clone https://github.com/your-username/winfinityhub.git  
cd winfinityhub  

Step 2: Install dependencies  
npm install  

Step 3: Environment variables  
Create a .env file in the root directory and add the following:

VITE_FIREBASE_API_KEY=your_firebase_api_key  
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain  
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key  
JWT_SECRET=your_jwt_secret  

Never commit the .env file to GitHub.

Step 4: Start the project  
npm run dev  

The application will run at: http://localhost:5173

---

## 🔗 Project Resources

Live Website: https://winfinityhub.netlify.app/  
Frontend Repository: https://github.com/your-username/winfinityhub  
Backend Repository: https://github.com/your-username/winfinityhub-server  

---

## 🎯 Why This Project Matters

- Demonstrates real-world full-stack MERN development
- Implements secure authentication and payment systems
- Uses role-based access control
- Designed with scalability and maintainability in mind
- Built using modern industry-standard tools

---

## 👤 Author

Abdul Ali Sawan  
Full Stack MERN Developer  
Dhaka, Bangladesh  

Email: dev.abdulalisawan@gmail.com  
GitHub: https://github.com/Abdulalisawan  
LinkedIn: https://www.linkedin.com/in/abdul-ali-sawan  




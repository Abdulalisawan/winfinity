🏆 WinfinityHub – Contest Management Platform

🔗 Live Website: https://winfinityhub.netlify.app/

📌 Project Overview

WinfinityHub is a full-stack contest management platform where users can explore contests, securely participate, submit tasks, and compete to win prizes.
The platform supports role-based access control with separate dashboards for Admins, Contest Creators, and Users, ensuring a smooth and secure experience.

This project focuses on real-world application architecture, secure authentication, payment handling, and scalable backend logic.

📸 Project Screenshot

📌 Add a clean screenshot of the homepage or contest listing page
Name the file screenshot.png and place it in the root folder

![WinfinityHub Screenshot](./screenshot.png)

🚀 Key Features

🔐 Secure Authentication

Email/password login and Google authentication using Firebase

JWT authentication with HTTP-only cookies

👥 Role-Based Access Control

Admin, Contest Creator, and Normal User roles

Protected dashboards for each role

🏗️ Contest Creation & Management

Contest creators can create, update, and delete contests

Admin approval required before contests go live

💳 Stripe Payment Integration

Secure contest registration via Stripe

Payment verification before participation

🧾 Participation Tracking

Prevents duplicate contest registration

Tracks participant count in real time

📝 Task Submission System

Paid users can submit contest tasks

Prevents multiple submissions per user

🏆 Winner Declaration

Contest creators can declare winners

Automatically updates winner history and user stats

📊 User Dashboard

View participated contests and payment history

Track winning contests and achievements

🥇 Leaderboard

Displays top users ranked by total wins

🔍 Search & Discovery

Search contests by category/type

Popular contests sorted by highest participation

📱 Fully Responsive Design

Optimized for mobile, tablet, and desktop

Built with Tailwind CSS and DaisyUI

🧰 Technologies Used
Frontend

React

React Router

React Query

Tailwind CSS

DaisyUI

Backend

Node.js

Express.js

MongoDB

Authentication & Security

Firebase Authentication

JSON Web Token (JWT)

HTTP-only cookies

Payments

Stripe

📦 Main Dependencies

react

react-router-dom

@tanstack/react-query

firebase

axios

stripe

node

express

mongodb

jsonwebtoken

⚙️ How to Run the Project Locally
1️⃣ Clone the Repository
git clone https://github.com/your-username/winfinityhub.git
cd winfinityhub

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create a .env file in the root directory and add:

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
JWT_SECRET=your_jwt_secret


⚠️ Never commit .env files to GitHub

4️⃣ Start the Project
npm run dev


The application will run at:
http://localhost:5173

🔗 Project Resources

🌐 Live Website: https://winfinityhub.netlify.app/

💻 Frontend Repository: https://github.com/your-username/winfinityhub

🛠 Backend Repository: https://github.com/your-username/winfinityhub-server

🎯 Why This Project Matters

Demonstrates real-world full-stack development

Implements secure authentication & payments

Uses role-based access control

Focuses on scalable backend logic

Built with modern industry-standard tools

👤 Author

Abdul Ali Sawan
Full Stack MERN Developer
📍 Dhaka, Bangladesh

📧 Email: dev.abdulalisawan@gmail.com

🔗 GitHub: https://github.com/Abdulalisawan

🔗 LinkedIn: https://www.linkedin.com/in/abdul-ali-sawan

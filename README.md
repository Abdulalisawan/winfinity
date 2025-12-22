# 🏆 WinfinityHub – Contest Management Platform

🔗 **Live Website:** https://winfinityhub.netlify.app/

---

## 📌 About the Project

**WinfinityHub** is a modern, full-stack contest management platform where users can discover contests, participate securely, submit tasks, and compete to win prizes. The platform supports multiple user roles with a smooth, responsive, and professional user experience.

---

## 🚀 Key Features

- 🔐 **Secure Authentication System**
  - Email/password login and Google authentication using Firebase
  - JWT-based authentication with HTTP-only cookies for security

- 👥 **Role-Based Access Control**
  - Three roles: Admin, Contest Creator, and Normal User
  - Each role has its own protected dashboard and permissions

- 🏗️ **Contest Creation & Management**
  - Contest creators can create, update, and delete contests
  - Admin approval required before contests go live

- 💳 **Stripe Payment Integration**
  - Secure Stripe Checkout for contest registration
  - Demo card support for testing payments
  - Payment verification before allowing participation

- 🧾 **Participation Tracking**
  - Prevents duplicate contest registration
  - Tracks participant count in real time

- 📝 **Task Submission System**
  - Paid users can submit contest tasks
  - Prevents multiple submissions per user

- 🏆 **Winner Declaration System**
  - Contest creators can declare winners
  - Automatically updates winner history and user stats

- 📊 **User Dashboard**
  - View participated contests and payment history
  - See winning contests and total achievements

- 🥇 **Leaderboard**
  - Displays top users ranked by total wins

- 🔍 **Search & Discovery**
  - Search contests by category/type
  - Popular contests sorted by highest participation

- 📱 **Fully Responsive UI**
  - Optimized for mobile, tablet, and desktop devices
  - Built with Tailwind CSS and DaisyUI

- ⚙️ **Modern Tech Stack**
  - Frontend: React, React Router, React Query, Tailwind CSS
  - Backend: Node.js, Express.js, MongoDB
  - Payments: Stripe
  - Authentication: Firebase + JWT

---

## 🛠️ Installation & Setup (Optional)

```bash
git clone https://github.com/your-username/winfinityhub.git
cd winfinityhub
npm install
npm run dev

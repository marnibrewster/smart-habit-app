# **Habit Tracker with AI-Powered Insights**

This project is a **full-stack habit tracking application** built with **Next.js (App Router)**, **Supabase**, and AI/ML integration for personalized insights and data analysis. It highlights my expertise in frontend and backend development, integrating cutting-edge technologies to deliver an intuitive and data-driven user experience.

## 🚀 **Features**

### **Core Functionality**

- **User Authentication:** Secure sign-up and login using Supabase Auth with role-based access control (Admin/Non-Admin users).
- **Habit Management:**
  - Admins can create, edit, and delete habits, assign users, and view detailed habit logs.
  - Non-admins can view assigned habits, log their progress, and add optional comments for each habit.
- **Dynamic Habit Assignment:** Easily assign habits to specific users with a clean and intuitive interface.

### **AI/ML Integration**

- **Personalized Feedback:** AI-generated motivational messages and feedback using OpenAI's GPT-4 API.
- **Habit Insights:** Machine learning models analyze habit logs (using Scikit-learn) to identify patterns, predict streaks, and provide actionable insights.

### **Enhanced User Experience**

- **Real-Time Updates:** Supabase's real-time features ensure instant updates across the app.
- **Responsive Design:** Optimized for mobile, tablet, and desktop using Chakra UI for accessible and consistent styling.
- **Logging Flexibility:** Log habits with one click, add comments, and view detailed statistics.

## 🛠️ **Technologies Used**

### **Frontend**

- **[Next.js (App Router)](https://nextjs.org/):** Dynamic routing, server-side rendering (SSR), and API routes for a seamless user experience.
- **[MUI](https://mui.com/):** Component library for building a responsive, accessible, and visually appealing interface.
- **TypeScript:** Strongly typed codebase for enhanced reliability and maintainability.

### **Backend**

- **[Supabase](https://supabase.com/):** Handles authentication, real-time database, and role-based access control.
- **API Routes:** Built-in Next.js API routes for interacting with the database and handling AI/ML requests.

### **AI/ML Integration**

- **OpenAI GPT-4 API:** Provides motivational messages and feedback for habit improvement.
- **Scikit-learn:** Implements time-series analysis to track user patterns and predict streaks.

### **DevOps and Deployment**

- **[Vercel](https://vercel.com/):** Deploys the app with CI/CD for production-ready performance.
- **GitHub Actions:** Automated workflows for linting, testing, and building the application.

## 📊 **Database Design**

The app features a relational database schema designed for scalability:

- **Users Table:** Stores user details and roles (Admin/Non-Admin).
- **Habits Table:** Tracks habits created by admins and assigned to users.
- **Habit Logs Table:** Logs user activity for each habit with timestamps, comments, and completion status.

## 🌟 **Key Highlights**

- **Frontend Expertise:** Demonstrates proficiency with Next.js 13 (App Router), TypeScript, and Chakra UI.
- **Backend Proficiency:** Robust integration with Supabase for authentication, database management, and real-time updates.
- **AI/ML Innovation:** Showcases how to use OpenAI and Scikit-learn for practical, user-focused applications.
- **Clean, Maintainable Code:** Organized file structure, modular components, and strongly typed codebase.

## 🛠️ **Setup and Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/habit-tracker.git
   cd habit-tracker
   ```
1. Install dependencies:
   ```bash
    npm install
   ```
1. Configure environment variables:

   1. Create a supabase project
   1. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
   1. Add your OpenAI API key (`OPENAI_API_KEY`) to `.env.local`.

1. Start the development server:
   ```bash
    npm run dev
   ```
1. Open the app in your browser:
   ```bash
   http://localhost:3000
   ```

## 🌟 **Deployment**

This project is deployed on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) for seamless performance in production.

## 📄 **License**

This project is licensed under the MIT License.

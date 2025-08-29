# 🎓 School Management System (SMS)

A modern **School Management System** built with a full-stack approach, combining a powerful Laravel backend with a Vite-powered frontend. The system provides role-based dashboards for administrators, admissions, and students to streamline school operations.

---

## 🛠️ Tech Stack

- ⚡ **Frontend**: [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- 🎨 **Styling**: [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- ✅ **Validation**: [Zod](https://zod.dev/)
- 🗄️ **Backend**: [Laravel](https://laravel.com/) (RESTful API)
- ☁️ **Database & Auth**: [Supabase](https://supabase.com/)
- 📱 **Planned Upgrade**: Progressive Web App (PWA) support

---

## ✨ Features

- 🔑 **Admin Dashboard**

  - Manage teachers, students, and classes
  - Admissions approval and monitoring
  - Analytics & reports

- 📝 **Admission System**

  - Online application submission
  - Applicant tracking & approval workflow

- 🎓 **Student Portal**
  - Profile management
  - View classes, schedules, and grades
  - Enrollment status tracking

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Composer](https://getcomposer.org/) (for Laravel)
- [PHP](https://www.php.net/) (v8.1+)
- [Supabase Account](https://supabase.com/)

---

### 🔧 Backend Setup (Laravel)

```bash
# Go to backend folder
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate Laravel key
php artisan key:generate

# Run database migrations
php artisan migrate

# Start the backend server
php artisan serve
```

### 🔧 Frontend Setup (Vite)

```bash
# Go to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 🔗 API and Database Setup (Supabase)

```bash
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
```

### 📂 Project Structure

```bash
SMS/
│── backend/      # Laravel backend (API, DB logic)
│── frontend/     # Vite + React frontend
│── README.md     # Documentation
```

### 🗺️ Roadmap

- ✅ Core features: Admin, Admissions, Student Portal
- 🔄 Role-based access & permissions
- 📊 Reporting & Analytics
- 🔔 Notifications (Email/SMS)
- 💳 Tuition & Payments Module
- 📱 Upgrade to PWA (Progressive Web App) for offline access and mobile app-like experience

---

### 🛡️ License

⚡ This README is **clean, professional, and explains setup** so other devs (or your professor if it’s a capstone) can run it easily.

👉 Do you want me to also add a **“Features Roadmap”** section (like future enhancements: grading system, payments, notifications)? That looks good for school projects.

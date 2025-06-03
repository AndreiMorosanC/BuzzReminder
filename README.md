# 🧠 BuzzReminder – Smart Task & Reminder Manager

**BuzzReminder** is a full-stack application to manage your daily tasks and receive automatic email reminders.
It combines a responsive calendar with smart notifications to help you stay on track.

---

## 🚀 Features

* 🗖️ Create, edit and delete tasks directly from the calendar
* 🔔 Receive automatic email reminders before a task starts
* 🔐 Secure login and registration using Firebase Authentication
* ✉️ Password recovery via email with SendGrid
* 📂 Task data saved permanently in MongoDB
* 💻 Clean and responsive UI built with TailwindCSS

---

## 🛠️ Technologies Used

**Frontend:**

* React (Vite)
* FullCalendar
* TailwindCSS
* Firebase Authentication

**Backend:**

* Node.js + Express.js
* MongoDB with Mongoose
* SendGrid (for sending emails)

---

## 📁 Project Structure

```
BuzzReminder/
├── client/           # Frontend (React)
│   ├── components/   # Reusable components like TaskModal, TaskForm...
│   ├── context/      # Auth provider (Firebase)
│   ├── hooks/        # Custom hooks like useTasks, useAuth...
│   └── pages/        # Main views like Home, SignUp...
├── server/           # Backend (Express)
│   ├── controllers/  # Task & user controllers
│   ├── middlewares/  # Auth token middleware
│   ├── models/       # Mongoose models
│   └── routes/       # Task and user routes
└── README.md
```

---

## ⚙️ How to Run It Locally

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/BuzzReminder.git
cd BuzzReminder
```

### 2. Install dependencies

**Frontend**

```bash
cd client
npm install
```

**Backend**

```bash
cd ../server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside `/server`:

```ini
MONGO_URI=your_mongo_connection_string
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=verified_sender_email@example.com
```

### 4. Start the development servers

**Backend**

```bash
cd server
npm run dev
```

**Frontend**

```bash
cd ../client
npm run dev
```

---

## ✅ What's Working

* Full CRUD for tasks
* Authenticated access per user
* Emails sent automatically before each task
* Secure signup with password validation
* Clean and fast frontend experience

---

## 🧹 Next Improvements

* Support for recurring tasks
* User profile settings
* Dark mode
* UI accessibility improvements



🙏 Agradecimientos

Hecho con esfuerzo, café y mucho debug. Proyecto creado como parte del camino para ser Full Stack Developer.

🌟 Autor Andrei

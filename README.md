🧠 BuzzReminder – Smart Task & Reminder Manager
BuzzReminder is a full-stack application to manage your daily tasks and receive automatic email reminders. It combines a responsive calendar with smart notifications to help you stay on track.

🚀 Features
📆 Create, edit and delete tasks directly from the calendar

🔔 Receive automatic email reminders before a task starts

🔐 Secure login and registration using Firebase Authentication

✉️ Password recovery via email with SendGrid

📂 Task data saved permanently in MongoDB

💻 Clean and responsive UI built with TailwindCSS

🛠️ Technologies Used
Frontend:

React (Vite)

FullCalendar

TailwindCSS

Firebase Authentication

Backend:

Node.js + Express.js

MongoDB with Mongoose

SendGrid (for sending emails)

📁 Project Structure
bash
Copiar
Editar
BuzzReminder/
├── client/         # Frontend (React)
│   ├── components/       # Reusable components like TaskModal, TaskForm...
│   ├── context/          # Auth provider (Firebase)
│   ├── hooks/            # Custom hooks like useTasks, useAuth...
│   └── pages/            # Main views like Home, SignUp...
│
├── server/         # Backend (Express)
│   ├── controllers/      # Task & user controllers
│   ├── middlewares/      # Auth token middleware
│   ├── models/           # Mongoose models
│   └── routes/           # Task and user routes
│
└── README.md
⚙️ How to Run It Locally
Clone the repository:

bash
Copiar
Editar
git clone https://github.com/yourusername/BuzzReminder.git
cd BuzzReminder
Install dependencies:

bash
Copiar
Editar
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
Configure environment variables:

Create a .env file inside /server:

ini
Copiar
Editar
MONGO_URI=your_mongo_connection_string
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=verified_sender_email@example.com
Start the development servers:

bash
Copiar
Editar
# Start the backend
cd server
npm run dev

# Start the frontend
cd ../client
npm run dev
✅ What's Working
Full CRUD for tasks

Authenticated access per user

Emails sent automatically before each task

Secure signup with password validation

Clean and fast frontend experience

🧩 Next Improvements
Support for recurring tasks

User profile settings

Dark mode

UI accessibility improvements



🙏 Agradecimientos

Hecho con esfuerzo, café y mucho debug. Proyecto creado como parte del camino para ser Full Stack Developer.

🌟 Autor Andrei

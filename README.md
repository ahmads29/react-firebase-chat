# React Firebase Chat

A modern, real-time chat application built with React and Firebase, designed for seamless private messaging and a smooth user experience. Effortlessly connect, chat, and share with others in a secure and intuitive environment.

---

## 🚀 Features

- **User Authentication:** Secure registration and login with email and password.
- **Profile Avatars:** Upload a profile image during sign-up for a personalized experience.
- **User Search & Add:** Find users by username and start new private chats instantly.
- **Real-Time Messaging:** Enjoy instant, two-way messaging powered by Firebase Firestore.
- **Image & Emoji Support:** Share images and express yourself with emoji picker integration.
- **Chat List Management:** View, search, and manage all your conversations in one place.
- **User Blocking:** Block or unblock users to control your privacy and interactions.
- **Persistent History:** All messages and media are stored securely in the cloud.
- **Responsive UI:** Clean, modern interface optimized for desktop and mobile.
- **Logout:** One-click secure sign out.

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd react-firebase-chat
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Email/Password), **Firestore Database**, and **Storage**.
   - In your project root, create a `.env` file and add your Firebase config:
     ```env
     VITE_API_KEY=your_api_key
     VITE_AUTH_DOMAIN=your_auth_domain
     VITE_PROJECT_ID=your_project_id
     VITE_STORAGE_BUCKET=your_storage_bucket
     VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_APP_ID=your_app_id
     ```
   - Replace the values with your Firebase project credentials.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Visit [http://localhost:5173](http://localhost:5173) to use the app.

---

## 📦 Available Scripts

- `npm run dev` – Start the development server with hot reloading
- `npm run build` – Build the app for production
- `npm run preview` – Preview the production build
- `npm run lint` – Run ESLint on the codebase

---

## 🧩 Tech Stack

- **React** – Frontend UI
- **Firebase** – Authentication, Firestore Database, Storage
- **Zustand** – State management
- **Vite** – Lightning-fast build tool
- **React Toastify** – Elegant notifications

---

## 📁 Project Structure

```
react-firebase-chat/
├── public/           # Static assets (images, icons, etc.)
├── src/
│   ├── components/   # React components (chat, login, list, detail, etc.)
│   ├── lib/          # Firebase config, state stores, upload utilities
│   ├── App.jsx       # Main app component
│   ├── main.jsx      # Entry point
│   └── index.css     # Global styles
├── .env              # Firebase environment variables (not committed)
├── package.json      # Project metadata and scripts
└── README.md         # Project documentation
```

---

## 🙋‍♂️ Developed By

**Ahmad Sharkawi**

---


This project is for educational and demonstration purposes. 

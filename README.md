📌 React Todo Dashboard (Frontend Assessment)

This is a production-ready React application built as part of a frontend assessment.
It demonstrates modern React practices, clean architecture, and scalable state management using Redux Toolkit.

🚀 Tech Stack
⚛️ React (Vite)
🧠 Redux Toolkit (with createAsyncThunk)
🌐 React Router DOM
📡 Axios
🎨 Tailwind CSS
🔔 react-hot-toast
✨ Features
🔐 Authentication
Login using API
Stores user data in:
Redux store
LocalStorage (for persistence)
Auto-login on page refresh
Redirect:
✅ Login → Dashboard
❌ Unauthorized → Login page
Toast notifications for:
Success login
Error handling
📋 Todo Dashboard
Fetch and display todos from API
Clean card-based UI
Handles:
Loading state (spinner)
Error state
Empty state
🔍 Filter Todos
Toggle between:
All Todos
My Todos
Uses logged-in user ID from Redux
Fetches user-specific todos dynamically
➕ Add Todo
Form with validation
Adds new todo via API
Instant UI update (smooth UX)
Toast notification on success
🔄 Pagination
Next / Previous buttons
Fetches limited todos per page
Smooth navigation between pages
📊 Visit Counter
Tracks how many times user visits dashboard
Stored in LocalStorage
Displayed on dashboard
🔒 Protected Routing
Private routes implemented
Prevents unauthorized access
Smart redirects:
Logged-in users can't access login page
Non-auth users redirected to login
🎨 UI / UX Highlights
Clean and modern design using Tailwind CSS
Fully responsive (mobile + desktop)
Centered login form for better focus
Card-style todo layout
Smooth user interactions
Minimal and user-friendly interface


📁 Folder Structure
src/
│
├── app/
│   └── store.js
│
├── features/
│   ├── auth/
│   │   └── authSlice.js
│   └── todos/
│       └── todoSlice.js
│
├── pages/
│   ├── Login.jsx
│   └── Dashboard.jsx
│
├── components/
│   ├── TodoList.jsx
│   ├── Pagination.jsx
│   ├── AddTodo.jsx
│   └── Loader.jsx
│
├── services/
│   └── api.js
│
├── utils/
│   └── auth.js


🔗 API Used
Login API
Fetch Todos API
User Todos API
Add Todo API

(All APIs are from DummyJSON)

📌 Key Concepts Used
Redux Toolkit (Slices + Async Thunks)
Global state management
API handling with Axios
Protected routing
LocalStorage persistence
Optimistic UI updates
Clean component architecture

💡 Notes
Proper error handling is implemented
Loading states are handled for better UX
Code is modular and scalable
Follows modern React best practices

📷 Preview

<img width="1177" height="862" alt="image" src="https://github.com/user-attachments/assets/d12d7613-1201-4032-b542-95981c71e564" />


👨‍💻 Author

Madhav Jagad

# 📦 Parcel Delivery Frontend

A secure, role-based, and user-friendly **Parcel Delivery System Frontend** built with **React.js, Redux Toolkit, RTK Query, and Tailwind CSS**.  
This application provides Senders, Receivers, and Admins a seamless interface to manage parcel deliveries, track shipments, and perform role-specific operations.  
It consumes the backend [Parcel Delivery API](https://github.com/najrulislam38/SomoyXpress-Courier) (Node.js + Express + MongoDB).

---

## 🚀 Project Overview

The **Parcel Delivery Frontend** is inspired by real-world courier services like **Pathao Courier** or **Sundarban Courier**.  
It includes:

- Public landing pages (Home, About, Contact)
- JWT-based Authentication (Login, Register, Logout)
- **Role-based Dashboards**:
  - **Sender**: Create/cancel parcels, track status, view history
  - **Receiver**: View/confirm parcels, delivery history
  - **Admin**: Manage users, parcels, update statuses
- **Parcel Tracking** by unique tracking ID (public search)
- Interactive dashboards with statistics, charts, and parcel timelines
- Responsive, accessible UI with global state management and API integration

---

## 🛠️ Tech Stack

**Frontend**

- ⚛️ React + React Router
- 🗂 Redux Toolkit + RTK Query
- ⌨️ TypeScript
- 🎨 Tailwind CSS + shadcn/ui (components)
- 🔔 React Hot Toast (notifications)
- 📊 Recharts (charts/visualizations)

**Backend**

- 🟢 Node.js + Express (REST API)
- 🍃 MongoDB + Mongoose
- 🔑 JWT + bcrypt (authentication & security)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/najrulislam38/somoyXpress-parcel-delivery-system-client
cd somoyXpress-parcel-delivery-system-client
2. Install dependencies
bash
Copy code
npm install
# or
yarn install
# or
bun install
3. Configure environment variables
Create a .env file in the project root:

env
Copy code
VITE_API_BASE_URL=http://localhost:5000/api/v1
4. Run the development server
bash
Copy code
npm run dev

```

### The app will be available at:

👉 http://localhost:5173/

### 🌐 Live Demo

🔗 Live URL ([Somoy Xpress Courier](https://somoy-xpress-courier.vercel.app/))

### 📌 Minimum Functional Features

- Public Landing Section

  - Home, About, Contact

- Authentication

  - Login, Register (Sender/Receiver), Logout

  - JWT Auth + role-based redirection

  - Persisted login state

- Sender Dashboard

  - Create, cancel, view parcels

- Receiver Dashboard

  - View incoming parcels, confirm deliveries

- Admin Dashboard

  - Manage users & parcels

  - Update parcel delivery statuses

- Parcel Tracking

  - Search by unique tracking ID (with status timeline)

- General

  - Role-based sidebar/navigation

  - Global loading & error handling

  - Validations & advanced filtering

  - Pagination for long lists

  - Toast notifications

  - Charts & overview cards for dashboard insights

  - Fully responsive UI

### 📊 Dashboard & Data Visualization

- Overview Cards: total parcels, delivered, pending, cancelled

- Charts: bar/pie charts for delivery trends & monthly shipments

- Tables: searchable, filterable, paginated

- Status Timeline: parcel history with timestamps & notes

### 📝 Notes

- Built with modular architecture for scalability

- Uses RTK Query for optimized API calls (caching, deduplication)

- Codebase written in TypeScript for type safety

- UI styled with Tailwind CSS and accessible components from shadcn/ui

- Ready for deployment to Vercel, Netlify, or similar platforms

### 👨‍💻 Author

Developed by [Md. Najrul Islam](https://github.com/najrulislam38)

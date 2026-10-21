# 🛒 Full-Stack E-Commerce Platform

### A production-style MERN e-commerce application with secure authentication, Razorpay payments, a full admin panel and instant Telegram alerts.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-0C2451?style=for-the-badge&logo=razorpay&logoColor=white)
![Status](https://img.shields.io/badge/Status-Deployed-brightgreen?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://full-stack-ecommerce-aadi.vercel.app)

---

## 📖 About The Project

This is a complete **full-stack e-commerce application** built from scratch with the **MERN stack** while learning and applying real-world development concepts.

It goes well beyond a basic CRUD shop. It covers the problems real stores run into: **refresh-token rotation with reuse detection**, **oversell-safe stock handling using MongoDB transactions and conditional updates**, **verified online payments with signed webhooks**, **automatic release of unpaid stock**, and a **role-based admin panel**, all backed by rate limiting and security headers.

---

## 🌐 Live Demo

| | Link |
|---|---|
| 🖥️ **Frontend (Vercel)** | [https://full-stack-ecommerce-aadi.vercel.app](https://full-stack-ecommerce-aadi.vercel.app) |
| ⚙️ **Backend API (Render)** | [https://full-stack-ecommerce-2-4trd.onrender.com](https://full-stack-ecommerce-2-4trd.onrender.com) |


The admin panel needs an account with the `admin` role (see [Create an admin user](#5-create-an-admin-user)).

---

## ✨ Features

### 🛍️ Customer Side

- **Authentication**
  - Register and login with **bcrypt**-hashed passwords
  - **Email OTP verification** (6-digit code, 5-minute expiry, resend supported); login is blocked until the email is verified
  - **Forgot / reset password** via a secure, hashed, time-limited email link
  - **Access token + refresh token** flow with HTTP-only cookies
  - Silent auto-refresh on the frontend with a single shared refresh request for concurrent calls
- **Product Browsing**
  - Category pages with **pagination**
  - Product detail pages
  - Home page with hero banner, categories, featured and top-rated products, deals of the day, brand slider and promo banners
- **Search & Filters**
  - Navbar search by product name or category, with a dedicated results page and **pagination**
  - Filter by **price range**, **minimum rating** and **in-stock only** (filters live in the URL query string)
- **Cart**
  - **Guest cart** that works without login (persisted in `localStorage`)
  - Guest cart is **merged into the database cart** after login
  - Update quantity and remove items, with server-side validation
- **Checkout & Payments**
  - Multi-step flow: **Cart → Address → Payment → Order Success**
  - Address validation middleware
  - **Cash on Delivery (COD)** and **Online payment via Razorpay**
  - Protected routes so users cannot skip checkout steps
- **Orders**
  - Order history and detailed order view with status tracking

### 🧑‍💼 Admin Panel

- **Dashboard** with total users, orders, active products, total sales, latest orders and a **low-stock list**
- **Product management**: add, edit, delete, update stock, and activate/deactivate products
- **Image uploads** to **Cloudinary** using Multer (image-type filter, 5 MB limit)
- **Order management**: view all orders, view details, update order status
- **User management**: list users, view user details, and **change roles (Super Admin only)**
- Role-based access control with `isAdmin` and `isSuperAdmin` middleware
- **Debounced search** on the admin product, order and user tables

### 🤖 Telegram Bot Integration

- 🛍️ **New-order alerts** sent to the admin: for COD orders when they are placed, and for online orders once Razorpay confirms the payment through the webhook
- ⚠️ **Low-stock alerts** when a COD order brings a product down to 5 units or fewer
- 📊 `/sales` command returns today's revenue, order count and COD vs online split, built on a **MongoDB aggregation pipeline**
- `/sales` is restricted to the admin's chat ID (`ADMIN_TELEGRAM_CHAT_ID`); other chats get an unauthorized response

### 🔐 Security & Reliability

| Area | Implementation |
|------|----------------|
| **Token security** | Short-lived access token (15 min) and 7-day refresh token in an HTTP-only cookie |
| **Refresh token rotation** | Tokens are stored **hashed**, grouped by `familyId`, and **reuse detection** invalidates the entire token family |
| **Payment integrity** | Razorpay **HMAC-SHA256 signature verification** on both the verify endpoint and the webhook |
| **Overselling protection** | Stock is checked and decremented in a single conditional update (`stock >= quantity`) inside **MongoDB transactions** |
| **Stock reservation** | Online orders reserve stock for **15 minutes** |
| **Auto cleanup** | Cron job runs every 5 minutes to release stock from unpaid orders and cancel them |
| **Account hygiene** | Daily cron removes accounts that never verified their email within 24 hours |
| **Rate limiting** | Separate limiters for auth, OTP, password reset, search, payments and general APIs |
| **HTTP hardening** | `helmet` security headers and a CORS allow-list (`FRONTEND_URL` plus local dev origins) with credentials |
| **Cookies** | Refresh token cookie is HTTP-only; `secure` and `SameSite=None` in production, `SameSite=Lax` in development |
| **User enumeration** | Forgot-password returns the same response whether or not the email exists |

---

## 🧰 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library |
| **Vite 7** | Build tool and dev server |
| **React Router 7** | Client-side routing and protected routes |
| **Context API** | Global state (Auth, Cart, Alerts) |
| **Lucide React** | Icons |
| **Custom CSS** | Styling, skeleton loaders, toasts and modals |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose 9** | Database and ODM |
| **JWT (jsonwebtoken)** | Access and refresh tokens |
| **bcrypt** | Password hashing |
| **Razorpay** | Online payments |
| **Cloudinary + Multer** | Product image storage and upload |
| **Brevo (`@getbrevo/brevo`)** | OTP and password reset emails via the Brevo HTTP API |
| **Telegraf** | Telegram bot |
| **node-cron** | Scheduled background jobs |
| **express-rate-limit + helmet + cors** | API protection |
| **csvtojson + @faker-js/faker** | Database seeding |

---

## 📂 Project Structure

```
Full-Stack-Ecommerce/
│
├── Backend/
│   ├── Admin/
│   │   ├── AdminController/     # Dashboard, products, orders, users logic
│   │   └── AdminRoutes/         # /api/admin/* routes
│   ├── config/                  # Razorpay, Cloudinary, Multer, Telegram bot
│   ├── Controller/              # Auth, cart, checkout, orders, payments, webhook
│   ├── Middleware/              # Auth, admin, validation, image upload
│   ├── Model/                   # User, Product, Cart, Orders, tokens
│   ├── routes/                  # Public and user API routes
│   ├── utils/                   # Rate limiters, cron jobs, JWT helpers, email, seeder
│   ├── database.js              # MongoDB connection
│   └── server.js                # App entry point
│
└── Frontend/
    ├── Context/                 # AuthContext, CartContext, AlertContext
    ├── Hooks/                   # useDebounce
    ├── helper/                  # Product form validation
    ├── public/
    ├── utils/                   # fetchApi with auto token refresh
    ├── index.html
    ├── vercel.json
    ├── vite.config.js
    └── src/
        ├── Admin/               # Admin pages, layout and components
        ├── components/          # Reusable UI + skeleton loaders
        ├── Pages/               # Home, Category, Cart, Search, Orders, Auth, etc.
        ├── styles/              # Page and component CSS
        ├── App.jsx              # Routes
        └── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB with a replica set**: the checkout and payment flows use MongoDB transactions, which only work on a replica set. **MongoDB Atlas** (free tier) provides one by default; a local MongoDB must be run as a single-node replica set
- Accounts for: **Razorpay** (test mode), **Cloudinary**, a **Brevo** account with an API key and a verified sender email (used to send OTP and password-reset emails), and a **Telegram bot** from [@BotFather](https://t.me/BotFather)

### 1. Clone the repository

```bash
git clone https://github.com/code-aadi/Full-Stack-Ecommerce.git
cd Full-Stack-Ecommerce
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
# Server
PORT=5000
NODE_ENV=development   # set to "production" when deploying
FRONTEND_URL=http://localhost:5173

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
ACCESS_SECRET=your_access_token_secret
REFRESH_SECRET=your_refresh_token_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (OTP + password reset) via Brevo
BREVO_API_KEY=your_brevo_api_key
SENDER_EMAIL=your_verified_sender_email

# Telegram bot
TELEGRAM_BOT_TOKEN=your_bot_token
ADMIN_TELEGRAM_CHAT_ID=your_telegram_chat_id
```

> ⚠️ The Telegram bot is required: the server exits at startup if `TELEGRAM_BOT_TOKEN` is missing.

Start the backend:

```bash
npm start
```

### 3. Frontend setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file inside `Frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start the frontend:

```bash
npm run dev
```

The app will be live at **http://localhost:5173** 🎉

### 4. Add products

Products are added from the **admin panel** (Products → Add Product), which uploads images to Cloudinary.

> `Backend/utils/seeder.js` is an older CSV import script and is **not** part of the normal setup. It expects a `products.csv` that is not included in the repository, uses a hardcoded local MongoDB URI, clears the whole `Product` collection before importing, and does not set the `imagePublicId` field that the current product schema requires.

### 5. Create an admin user

Register and verify a normal account, then open your database and set `role: "admin"` on that user document. To also manage other users' roles, additionally set `isSuperAdmin: true` (the role-update endpoint requires both the `admin` role and the Super Admin flag). Then open `/admin/dashboard`.

> For local development only. In a production environment, administrator provisioning should be handled through a controlled process.

### 6. Razorpay webhook (optional but recommended)

To test webhooks locally, expose your backend with a tunnel (e.g. ngrok) and add this URL in the Razorpay dashboard with events `payment.captured` and `payment.failed`:

```
https://<your-tunnel-url>/api/payment/razorpay-webhook
```

---

## 🔌 API Overview

### 🔑 Auth — `/api/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Create account and send OTP |
| POST | `/verify-otp` | Verify OTP and log in |
| POST | `/resend-otp` | Resend OTP |
| POST | `/login` | Log in |
| GET | `/me` | Get current user 🔒 |
| POST | `/refresh` | Rotate refresh token and issue a new access token |
| POST | `/logout` | Log out and invalidate token family |
| POST | `/forgot-password` | Send reset link |
| GET | `/verify-token/:token` | Validate reset token |
| POST | `/reset-password/:token` | Set a new password |

### 📦 Products — `/api/products`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/category/:category` | Products by category (paginated) |
| GET | `/id/:id` | Single product |
| GET | `/topProducts` | Top-rated products |
| GET | `/search?q=&minPrice=&maxPrice=&rating=&inStock=` | Search with filters |

### 🛒 Cart — `/api/cart`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add` | Add item 🔒 |
| GET | `/get` | Get cart 🔒 |
| POST | `/localCart` | Resolve guest cart items |
| POST | `/localCartToDb` | Merge guest cart into DB 🔒 |
| PATCH | `/quantity` | Update quantity 🔒 |
| DELETE | `/:productId` | Remove item 🔒 |
| DELETE | `/removeCart` | Clear cart 🔒 |

### 💳 Checkout, Orders & Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/checkout` | Validate checkout 🔒 |
| POST | `/api/order` | Place COD order 🔒 |
| GET | `/api/order/userOrder` | My orders 🔒 |
| GET | `/api/order/:id` | Order details 🔒 |
| POST | `/api/payment/create` | Create Razorpay order and reserve stock 🔒 |
| POST | `/api/payment/verify` | Verify payment signature 🔒 |
| POST | `/api/payment/razorpay-webhook` | Razorpay webhook (signature verified) |

### 🧑‍💼 Admin — `/api/admin` (requires admin role)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard` | Dashboard stats |
| GET / POST | `/product` | List / create product |
| GET / PUT / DELETE | `/product/:id` | View / edit / delete product |
| GET | `/product/categories` | List categories |
| PATCH | `/product/:id/stock` | Update stock |
| PATCH | `/product/:id/status` | Activate / deactivate |
| GET | `/orders` | All orders |
| GET / PATCH | `/orders/:orderId` | Order details / update status |
| GET | `/users` | All users |
| GET | `/users/:id` | User details |
| PATCH | `/users/:id` | Update role (Super Admin only) |

> 🔒 = requires authentication

---

## 🔄 How The Payment Flow Works

```
Cart ─► Address ─► Create Payment Order   (POST /api/payment/create)
                         │
                         ├─ Validate cart items + stock
                         ├─ Atomically decrement stock (MongoDB transaction)
                         ├─ Create Razorpay order
                         └─ Save order as "pending" + reserve stock for 15 min
                                      │
                           Razorpay checkout (frontend)
                                      │
                    ┌─────────────────┴──────────────────┐
                    ▼                                    ▼
           Payment succeeds                    Payment fails / abandoned
                    │                                    │
  POST /api/payment/verify                 Webhook "payment.failed":
  (HMAC-SHA256 signature check)              stock restored, order cancelled
  → order "paid" / "confirmed",
    cart cleared                           Never completed: cron (every 5 min)
                                             restores stock and cancels orders
  Webhook "payment.captured":                whose 15-min reservation expired
  → idempotent confirmation, cart cleared,
    admin notified on Telegram
```

**Cash on Delivery** skips this flow: stock is decremented, the order is created and the cart is cleared inside a single MongoDB transaction, and the admin is notified on Telegram.

---

## 📸 Screenshots

### 🛍️ Storefront

| Home: Hero Banner | Home: Categories |
|:---:|:---:|
| ![Home: Hero Banner](https://github.com/user-attachments/assets/ed218a42-945f-4d2e-aed2-678883206512) | ![Home: Categories](https://github.com/user-attachments/assets/49625d2d-9733-45b6-aec1-07c6b55e646c) |

| Home: Trending Products | Product Detail |
|:---:|:---:|
| ![Home: Trending Products](https://github.com/user-attachments/assets/9dbc6e88-3a33-4681-84fc-7aae1f658c62) | ![Product Detail](https://github.com/user-attachments/assets/b271ffb9-98a3-4d8c-8dab-75bbe2fc5590) |

| Search with Filters | Cart |
|:---:|:---:|
| ![Search with Filters](https://github.com/user-attachments/assets/49d9a6d1-b555-4dcc-85f9-1caf379b1d11) | ![Cart](https://github.com/user-attachments/assets/fd041b07-9859-403e-b63e-f4e6bae08662) |

| Checkout | Mobile View |
|:---:|:---:|
| ![Checkout](https://github.com/user-attachments/assets/4655c3a1-a258-4caa-8fcf-2bbf8c398215) | ![Mobile View](https://github.com/user-attachments/assets/20908e6f-04b9-4a1e-a070-ee0cfe93274f) |

### 🧑‍💼 Admin Panel

| Dashboard | Orders |
|:---:|:---:|
| ![Dashboard](https://github.com/user-attachments/assets/eebaeaf1-42ab-4838-99e5-4291fdf163b4) | ![Orders](https://github.com/user-attachments/assets/492a09a5-7f31-4b6d-a9b2-f11f8544b6a3) |

| Products | |
|:---:|:---:|
| ![Products](https://github.com/user-attachments/assets/06ae4f63-949a-4115-9bd3-cd9e673642e3) | |

### 🤖 Telegram Bot

| New Order Alert | Low Stock Warning |
|:---:|:---:|
| ![New Order Alert](https://github.com/user-attachments/assets/2988524f-f9db-4ac6-bf61-42b68b32621a) | ![Low Stock Warning](https://github.com/user-attachments/assets/bff82855-42e7-4917-abc0-ef5fc0df457a) |

| Today's Sales (`/sales`) | |
|:---:|:---:|
| ![Today's Sales (`/sales`)](https://github.com/user-attachments/assets/381e2a29-952f-47f7-8a00-03c993024f92) | |

---

## 📚 What I Learned

This project helped me move beyond basic MERN CRUD and understand how the different parts of a full-stack application work together.

**Frontend**
- React component architecture and the Context API (auth, cart, alerts)
- Protected routes and multi-step checkout
- Debounced search in the admin tables
- Skeleton loading states
- A central fetch wrapper with automatic token refresh

**Backend**
- REST API design and Express middleware (auth, validation, uploads)
- JWT authentication with refresh-token rotation
- Role-based authorization
- Rate limiting and security headers
- File uploads and scheduled background jobs

**Database**
- MongoDB schema design with Mongoose
- Transactions and conditional (atomic) stock updates
- Aggregation pipelines
- TTL indexes and inventory management

**Integrations**
- Razorpay payments and webhooks
- Cloudinary, Brevo (transactional email API) and Telegram

**Real-world concepts**
- Refresh-token reuse detection
- Preventing overselling
- Temporary stock reservation
- Payment verification
- Guest cart → authenticated cart merging
- Scheduled cleanup jobs

---

## ☁️ Deployment

This project is deployed with the frontend on **Vercel** and the backend on **Render**.

- **Frontend (Vercel):** `Frontend/vercel.json` rewrites all routes to the app so client-side routes like `/cart` work on refresh. Set `VITE_API_BASE_URL` to the backend URL and `VITE_RAZORPAY_KEY_ID` in the Vercel environment variables.
- **Backend (Render):** add all the variables from the [Backend setup](#2-backend-setup) section, set `NODE_ENV=production` and set `FRONTEND_URL` to the Vercel URL (it is used for CORS and for the password-reset link). In production, cookies are sent with `secure` and `SameSite=None`.
- **Razorpay webhook:** point it to `<backend-url>/api/payment/razorpay-webhook`.

---

## 🗺️ Roadmap

- [x] JWT auth with refresh-token rotation
- [x] Email OTP verification and password reset
- [x] Cart (guest + logged-in) with merge on login
- [x] Razorpay + COD checkout
- [x] Admin panel (products, orders, users, dashboard)
- [x] Telegram bot alerts and sales report
- [ ] Persistent **wishlist** (UI exists, not yet connected to the backend)
- [ ] Product reviews and ratings by users
- [ ] Coupons and discount codes
- [ ] User-initiated order cancellation and refund flow
- [ ] Sales charts on the admin dashboard
- [x] Deployment (Vercel + Render)
- [ ] Automated tests

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m "Add some AmazingFeature"`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project was built for learning and portfolio purposes. No open-source license has been added to the repository yet.

---

## 👨‍💻 Author

**Aditya Kourav**

[![GitHub](https://img.shields.io/badge/GitHub-code--aadi-181717?style=for-the-badge&logo=github)](https://github.com/code-aadi)

---

### ⭐ If you found this project helpful, please give it a star!

*Built with ❤️ while learning the MERN stack*
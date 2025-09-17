# Learneazy

**Learneazy** is a modern, full-stack Learning Management System (LMS) built with Next.js and Express. It empowers instructors to create and manage courses while students can browse, purchase, and learn through a clean and responsive interface with secure Stripe payments, comprehensive analytics, and real-time course management.

## Technologies Used

- **Frontend:** Next.js, TypeScript, Tailwind CSS, Redux Toolkit (Query)
- **Backend:** Express.js, TypeScript, MongoDB
- **Authentication & Security:** NextAuth.js, JWT (JSON Web Token), bcrypt, VidoCipher (video protection against screenshots and screen recording)
- **Payments:** Stripe Integration with secure checkout flow
- **Media Storage:** Cloudinary for image uploads and management
- **Real-time Communication:** Socket.io for notifications and updates
- **Email Service:** NodeMailer with Gmail SMTP
- **Database:** MongoDB with Redis for session management
- **UI Components:** Material-UI (MUI), React Icons, Formik + Yup validation
- **Charts & Analytics:** Recharts for data visualization
- **Deployment:** Vercel (Frontend & Backend)

---

## Features

- **Responsive Design** — Seamless experience across desktop, tablet, and mobile devices
- **Dark/Light Mode** — Toggle between themes for comfortable learning
- **Account Management** — Secure registration/login, profile updates, and avatar uploads
- **Course Discovery** — Browse all available courses with advanced filtering and search capabilities
- **Course Preview** — View course details, curriculum, and instructor information before purchase
- **Secure Checkout** — Stripe-powered payment processing with SSL encryption
- **Learning Dashboard** — Access purchased courses, track progress, and manage learning path
- **User Profile** — Update personal information, change passwords, and view purchase history
- **Course Creation & Management** — Comprehensive course builder with curriculum management
- **Content Upload** — Upload video lectures, documents, and multimedia content via Cloudinary
- **Video Security with VidoCipher** — Prevents screenshots or video recording of courses
- **Private Video Data** — Restricts access for public users
- **Q&A System** — Question asking option for all course users, with reply support
- **Review System** — Add reviews with reply option by admin
- **Dynamic Data Management** — Easily manage Hero section, FAQs, categories, and courses
- **Analytics Dashboard** — Visual insights into user behavior, course performance, and revenue using Recharts
- **Student Analytics** — Track enrollment numbers and engagement
- **Revenue Tracking** — Monitor earnings and sales performance with detailed analytics
- **Order Management** — Track and manage all transactions and payments
- **User & Role Management** — View, edit, and manage all registered users and instructors
- **Instructor Management** — Add, manage, and monitor instructor accounts
- **System Configuration** — Manage platform settings and content sections

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher) and npm installed
- MongoDB database (local or cloud)
- Redis instance for session management
- Cloudinary account for media storage
- Stripe account for payment processing
- VS Code or any other code editor
- Git (optional, for cloning the repository)

### Project Structure

```plaintext
learneazy/
├── client/                            # Next.js Frontend Application
│   ├── app/                          # Next.js 13 App Directory
│   │   ├── components/               # Reusable UI components
│   │   │   ├── admin/               # Admin-specific components
│   │   │   ├── auth/                # Authentication components
│   │   │   ├── course/              # Course-related components
│   │   │   ├── home/                # Homepage components
│   │   │   └── profile/             # User profile components
│   │   ├── admin/                   # Admin dashboard pages
│   │   ├── api/                     # API routes and NextAuth config
│   │   ├── course/                  # Course viewing pages
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── providers/               # Context providers (Redux, Theme)
│   │   ├── redux/                   # Redux store and slices
│   │   │   └── features/            # Feature-based Redux slices
│   │   └── styles/                  # Global styles and Tailwind config
│   ├── public/                      # Static assets and images
│   └── package.json                 # Frontend dependencies
│
├── server/                           # Express.js Backend API
│   ├── controllers/                 # Route controllers (business logic)
│   ├── models/                      # Mongoose database models
│   ├── routes/                      # Express route definitions
│   ├── middleware/                  # Custom middleware (auth, error handling)
│   ├── services/                    # Business logic services
│   ├── utils/                       # Utility functions and helpers
│   ├── db/                         # Database connection configuration
│   ├── @types/                     # TypeScript type definitions
│   └── package.json                # Backend dependencies
│
└── README.md                       # Project documentation
```

### 1. Clone the Repository

```bash
git clone https://github.com/ahadalireach/learneazy.git
cd learneazy
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory with the following variables:

```env
PORT=4000
NODE_ENV=production
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
ACCESS_TOKEN_EXPIRE=5
REFRESH_TOKEN_EXPIRE=3

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_MAIL=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_SERVICE=Gmail

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# VdoCipher (Video Streaming)
VDOCIPHER_API_KEY=your_vdocipher_api_key

# Rate Limiting (Server)
RATE_LIMIT_MAX=1000 (Max requests per window per IP. Defaults to 100 if unset.)
# RATE_LIMIT_WINDOW_MS=900000 (Optional: window size in ms (default 900000 = 15 minutes))
```

Start the backend server:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_SERVER_URI=http://localhost:4000/api
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Stripe Public Key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Social Auth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Start the frontend development server:

```bash
npm run dev
```

---

### 4. Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:4000](http://localhost:4000)

---

## Key Features Breakdown

### 🔐 Authentication & Security

- JWT-based authentication with access and refresh tokens
- Social login integration (Google, GitHub)
- Role-based access control (Student, Instructor, Admin)
- Protected routes and middleware
- Secure password hashing with bcrypt

### 💳 Payment Integration

- Stripe checkout for secure course purchases
- Payment history and invoice management
- Automated enrollment after successful payment
- Coupon and discount code support

### 📊 Analytics & Reporting

- User registration and engagement analytics
- Course performance metrics
- Revenue tracking and financial reports
- Real-time dashboard updates

### 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Dark/light mode theme switching
- Optimized for all screen sizes
- Progressive Web App (PWA) ready

---

## API Endpoints

### Authentication & User

- `POST /api/users/auth/register` — Register new user
- `POST /api/users/auth/activate` — Activate user account
- `POST /api/users/auth/login` — User login
- `GET /api/users/auth/logout` — Logout current user
- `GET /api/users/auth/refresh-token` — Refresh access token
- `POST /api/users/auth/social-login` — Social login (Google/GitHub)
- `GET /api/users/profile/me` — Get current user profile
- `PUT /api/users/profile/update-info` — Update user profile info
- `PUT /api/users/profile/change-password` — Change user password
- `PUT /api/users/profile/update-avatar` — Update user avatar
- `GET /api/users/admin/users` — Get all users (admin)
- `PUT /api/users/admin/change-user-role` — Change user role (admin)
- `DELETE /api/users/admin/delete/:id` — Delete user (admin)

### Courses

- `POST /api/courses/admin/create` — Create new course (admin)
- `PUT /api/courses/admin/update/:id` — Update course (admin)
- `GET /api/courses/admin/all-courses` — Get all courses (admin)
- `DELETE /api/courses/admin/delete/:id` — Delete course (admin)
- `GET /api/courses/public/preview/:id` — Get public course preview
- `GET /api/courses/public/all-previews` — Get all public course previews
- `GET /api/courses/enrolled/content/:id` — Get enrolled course content
- `PUT /api/courses/enrolled/question` — Ask question in course
- `PUT /api/courses/enrolled/answer` — Answer question in course
- `PUT /api/courses/enrolled/review/:id` — Add course review
- `PUT /api/courses/enrolled/review-reply` — Reply to review (admin)
- `POST /api/courses/video/getVdoCipherOTP` — Get VdoCipher video OTP

### Orders

- `GET /api/orders/admin/all-orders` — Get all orders (admin)
- `POST /api/orders/process-order` — Process order (purchase)
- `GET /api/orders/stripe-publishable-key` — Get Stripe publishable key
- `POST /api/orders/create-payment-intent` — Create Stripe payment intent

### Notifications

- `GET /api/notifications/admin/all-notifications` — Get all notifications (admin)
- `PUT /api/notifications/admin/mark-read/:id` — Mark notification as read (admin)

### Layout & Content

- `POST /api/layout/admin/create-layout` — Create website layout (admin)
- `PUT /api/layout/admin/update-layout` — Update website layout (admin)
- `GET /api/layout/public/layout/:type` — Get public layout by type

### Analytics

- `GET /api/analytics/admin/users` — User analytics (admin)
- `GET /api/analytics/admin/orders` — Order analytics (admin)
- `GET /api/analytics/admin/courses` — Course analytics (admin)

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Live Links

- **Live Web:** [learneazy.vercel.app](https://learneazy.vercel.app)
- **Live Video Demo:** [Watch Now](https://youtu.be/PC2D0_RNu4k?si=te4ichbQcF7rBYbp)
- **GitHub Repo:** [github.com/ahadalireach/learneazy](https://github.com/ahadalireach/learneazy) (Give it a Star!)

---

## Contact

For any questions, feedback, or collaboration opportunities, reach out at [ahadali.reach@gmail.com](mailto:ahadali.reach@gmail.com)

- 📧 Email: ahadali.reach@gmail.com
- 🐙 GitHub: [github.com/ahadalireach](https://github.com/ahadalireach)
- 💼 LinkedIn: [linkedin.com/in/ahadalireach](https://linkedin.com/in/ahadalireach)

---

> Built with 💻, ☕, and ❤️ by Ahad Ali

# PaperFlow 📄

**Smart Paper Management System for Academic Workflows**

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive role-based academic paper creation, review, and printing workflow system built with modern web technologies. PaperFlow streamlines the entire academic paper lifecycle from creation to final printing with intuitive role-based dashboards.

## 🌟 Key Features

### 🎯 **Role-Based Access Control**
- **Admin Dashboard**: Complete paper lifecycle management
- **Reviewer Interface**: Streamlined review and approval process  
- **Teacher Portal**: Access to finalized and printed papers

### 🔐 **Security & Authentication**
- Secure user authentication with session management
- Role-based authorization and route protection
- Protected API endpoints with middleware validation

### 📊 **Workflow Management**
- Real-time status tracking and updates
- Automated workflow transitions
- Email notifications for status changes
- Audit trail for all paper activities

### 🎨 **Modern User Experience**
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive and clean interface
- Dark/light mode support

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | Next.js 13+ | React framework with App Router |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Language** | TypeScript | Type-safe development |
| **Database** | MongoDB | NoSQL database with Mongoose ODM |
| **Authentication** | NextAuth.js | Secure authentication solution |
| **State Management** | React Context | Global state management |
| **API** | Next.js API Routes | Backend API endpoints |

## 📂 Project Structure

```
PaperFlow_EM/
├── app/                          # Next.js 13+ App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/route.ts
│   │   │   └── logout/route.ts
│   │   ├── papers/               # Paper management endpoints
│   │   │   ├── route.ts          # GET, POST papers
│   │   │   ├── [id]/route.ts     # GET, PUT, DELETE specific paper
│   │   │   └── [id]/review/route.ts # Review endpoints
│   │   └── users/                # User management endpoints
│   ├── dashboard/                # Role-based dashboards
│   │   ├── admin/                # Admin dashboard
│   │   │   ├── page.tsx
│   │   │   ├── papers/page.tsx
│   │   │   └── users/page.tsx
│   │   ├── reviewer/             # Reviewer dashboard
│   │   │   ├── page.tsx
│   │   │   └── papers/page.tsx
│   │   └── teacher/              # Teacher dashboard
│   │       ├── page.tsx
│   │       └── papers/page.tsx
│   ├── login/                    # Authentication pages
│   │   └── page.tsx
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable components
│   ├── ui/                       # UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Input.tsx
│   ├── dashboard/                # Dashboard components
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── StatusBadge.tsx
│   ├── papers/                   # Paper-related components
│   │   ├── PaperCard.tsx
│   │   ├── PaperForm.tsx
│   │   ├── ReviewForm.tsx
│   │   └── PaperList.tsx
│   ├── auth/                     # Authentication components
│   │   ├── LoginForm.tsx
│   │   └── RoleGuard.tsx
│   └── common/                   # Common components
│       ├── Loading.tsx
│       └── ErrorBoundary.tsx
├── lib/                          # Utility libraries
│   ├── mongodb.ts                # Database connection
│   ├── auth.ts                   # Authentication utilities
│   └── utils.ts                  # Common utilities
├── models/                       # Database models
│   ├── User.ts                   # User model
│   ├── Paper.ts                  # Paper model
│   └── Review.ts                 # Review model
├── types/                        # TypeScript type definitions
│   ├── auth.ts
│   ├── paper.ts
│   └── user.ts
├── middleware.ts                 # Next.js middleware
├── tailwind.config.js            # Tailwind configuration
├── next.config.js                # Next.js configuration
└── package.json                  # Project dependencies
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/PaperFlow_EM.git
   cd PaperFlow_EM
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/PaperFlow_EM
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/PaperFlow_EM
   
   # Authentication
   NEXTAUTH_SECRET=your-super-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   
   # Email Configuration (optional)
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-email-password
   EMAIL_FROM=noreply@paperflow-em.com
   ```

4. **Set up the database**
   ```bash
   # Run database migrations/setup (if you have seed scripts)
   npm run db:setup
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔐 User Roles & Permissions

### 👨‍💼 **Admin**
- Create new papers and assign metadata
- Assign reviewers to papers
- Monitor paper workflow status
- Manage user accounts and roles
- Configure system settings
- Access complete audit logs
- Manage printing queue

### 👩‍🔬 **Reviewer**
- View assigned papers for review
- Submit reviews with comments and ratings
- Approve or request changes to papers
- Track review history and deadlines
- Receive notifications for new assignments

### 👨‍🏫 **Teacher**
- Browse approved and printed papers
- Download finalized documents
- Search and filter papers by criteria
- View paper metadata and reviews
- Access personal paper history

## 📋 Workflow Process

```mermaid
graph TD
    A[Admin Creates Paper] --> B[Assign Reviewer]
    B --> C[Reviewer Reviews Paper]
    C --> D{Review Decision}
    D -->|Approved| E[Paper Approved]
    D -->|Changes Requested| F[Return to Admin]
    F --> G[Admin Makes Changes]
    G --> C
    E --> H[Ready for Printing]
    H --> I[Teacher Access]
```

## 🎨 UI Components

The application uses a consistent design system with:
- **Color Palette**: Modern, accessible colors
- **Typography**: Clear, readable fonts
- **Spacing**: Consistent spacing system
- **Components**: Reusable UI components
- **Animations**: Smooth transitions and micro-interactions

## 📱 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Get current session

### Paper Management
- `GET /api/papers` - List papers (filtered by role)
- `POST /api/papers` - Create new paper (Admin only)
- `GET /api/papers/[id]` - Get specific paper
- `PUT /api/papers/[id]` - Update paper (Admin only)
- `DELETE /api/papers/[id]` - Delete paper (Admin only)

### Review System
- `POST /api/papers/[id]/review` - Submit review
- `GET /api/papers/[id]/reviews` - Get paper reviews
- `PUT /api/papers/[id]/review/[reviewId]` - Update review

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push

### Docker
```bash
# Build the Docker image
docker build -t paperflow-em .

# Run the container
docker run -p 3000:3000 paperflow-em
```

### Manual Deployment
```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for your changes
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Write tests for new features
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) for the flexible database solution
- [Vercel](https://vercel.com/) for seamless deployment

## 📞 Support

If you have any questions or need help with setup, please:
- Open an issue on GitHub
- Check the [Wiki](https://github.com/your-username/PaperFlow_EM/wiki) for detailed documentation
- Contact the maintainers at [your-email@example.com](mailto:your-email@example.com)

---

<div align="center">
  <p>Made with ❤️ by the PaperFlow Team</p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>
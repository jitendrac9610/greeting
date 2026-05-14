# 🏗️ Architecture Overview

This document describes the architecture and design of the Greeting Card application.

## 🎯 System Overview

The Greeting Card application is a full-stack web application built with a **client-server architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           React Frontend (Vite + Tailwind)             │ │
│  │  - Home Page (Template Gallery)                        │ │
│  │  - Preview Page (Template Editor)                      │ │
│  │  - Profile Setup                                       │ │
│  │  - Authentication (Clerk)                              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────┬──────────────────────────────────────┘
                      │ HTTP/REST API
                      │
┌─────────────────────▼──────────────────────────────────────┐
│                   Express.js Server                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              API Routes & Controllers                  │ │
│  │  - Template CRUD operations                            │ │
│  │  - File upload/download                                │ │
│  │  - Authentication middleware                           │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Business Logic                            │ │
│  │  - Template validation                                 │ │
│  │  - Image processing                                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────┬──────────────────────────────────────┘
         │            │            │
         │            │            │
    ┌────▼─┐  ┌──────▼──────┐  ┌──▼──────────┐
    │MongoDB│  │ Cloudinary  │  │   Clerk    │
    │       │  │             │  │            │
    │- Data │  │- Image      │  │- Auth      │
    │-Store │  │  Storage    │  │- Sessions  │
    └───────┘  └─────────────┘  └────────────┘
```

## 📦 Architecture Layers

### 1. **Presentation Layer** (Frontend)

- **Technology**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Responsibilities**:
  - User interface rendering
  - User input handling
  - Client-side routing
  - Local state management

### 2. **API Layer** (Backend)

- **Technology**: Express.js
- **Responsibilities**:
  - REST API endpoints
  - Request validation
  - Authentication/Authorization
  - Response formatting

### 3. **Business Logic Layer** (Backend)

- **Technology**: Node.js Controllers
- **Responsibilities**:
  - Template management
  - Image processing
  - Data validation
  - Business rules enforcement

### 4. **Data Layer** (Backend)

- **Technology**: MongoDB + Mongoose
- **Responsibilities**:
  - Data persistence
  - Schema validation
  - Database queries

### 5. **External Services**

- **Clerk**: User authentication and session management
- **Cloudinary**: Cloud-based image storage and processing
- **Vercel**: Frontend hosting and deployment
- **Render**: Backend hosting and deployment

## 🔄 Data Flow

### 1. User Browsing Templates

```
User Browser → React Component
    ↓
Fetches from API
    ↓
Express API Handler
    ↓
MongoDB Query
    ↓
Returns Template Array
    ↓
React Renders Grid
```

### 2. User Creating/Downloading Card

```
User Input (Canvas/Text)
    ↓
html2canvas (Frontend)
    ↓
Base64 Image Data
    ↓
Send to Backend API
    ↓
Express Uploads to Cloudinary
    ↓
Save URL in Database
    ↓
Return Download Link
```

### 3. Authentication Flow

```
User Login Attempt
    ↓
Clerk Sign-in Widget
    ↓
Clerk Authenticates User
    ↓
Issues JWT Token
    ↓
Frontend Stores Token
    ↓
Includes in API Requests
    ↓
Backend Validates JWT
```

## 📊 Database Schema

### Template Collection

```javascript
{
  _id: ObjectId,
  title: String,
  image: String (Cloudinary URL),
  category: String (enum),
  isPremium: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes

```javascript
// For efficient queries
db.templates.createIndex({ category: 1 });
db.templates.createIndex({ isPremium: 1 });
db.templates.createIndex({ createdAt: -1 });
```

## 🔐 Authentication & Security

### JWT Token Flow

1. User logs in via Clerk
2. Clerk issues JWT token
3. Frontend stores token in localStorage
4. Frontend includes token in `Authorization` header
5. Backend verifies token signature
6. Backend validates token expiration

### CORS Configuration

```javascript
// Backend allows requests from:
- http://localhost:5173 (dev)
- https://greeting-bh6x.vercel.app (production)
```

### HTTPS & Security Headers

- All production endpoints use HTTPS
- Security headers configured on Vercel/Render
- Sensitive data encrypted in transit

## 📝 API Contract

### Request Format

```http
GET /api/templates HTTP/1.1
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Response Format

```json
{
  "success": true,
  "message": "Templates retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Birthday Bash",
      "image": "https://res.cloudinary.com/...",
      "category": "birthday",
      "isPremium": false
    }
  ]
}
```

## 🚀 Deployment Architecture

### Frontend (Vercel)

```
GitHub Repository
    ↓
Git Push
    ↓
Vercel Detects Changes
    ↓
Runs Build: npm run build
    ↓
Generates dist/ folder
    ↓
Deploys to CDN
    ↓
Available at: https://greeting-bh6x.vercel.app
```

### Backend (Render)

```
GitHub Repository
    ↓
Git Push
    ↓
Render Detects Changes
    ↓
Installs Dependencies: npm install
    ↓
Runs Server: npm start
    ↓
Exposes Port 5000
    ↓
Available at: https://greeting-hbps.onrender.com
```

## 📱 Client-Side Architecture

### Component Tree

```
<App>
  ├── <AppRoutes>
  │   ├── <Login>
  │   ├── <ProfileSetup>
  │   ├── <Home>
  │   │   ├── <CategoryTabs>
  │   │   ├── <TemplateGrid>
  │   │   │   └── <TemplateCard> (multiple)
  │   │   └── <PremiumModal>
  │   └── <Preview>
```

### State Management

- Local component state (useState)
- URL params for routing
- localStorage for user profile
- Clerk for authentication state

## 🔧 Middleware Stack

### Frontend Middleware

1. **React Router** - Route protection and navigation
2. **Clerk Provider** - Authentication context
3. **Axios Interceptors** - API request/response handling

### Backend Middleware

1. **CORS** - Cross-origin request handling
2. **Express JSON** - Request body parsing
3. **Authentication** - JWT validation
4. **Error Handler** - Exception handling

## 📦 External Dependencies

### Frontend

- **@clerk/clerk-react**: Authentication library
- **axios**: HTTP client
- **html2canvas**: Screenshot/image export
- **react-router-dom**: Routing library
- **tailwindcss**: Utility-first CSS

### Backend

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cloudinary**: Image hosting SDK
- **jsonwebtoken**: JWT implementation
- **bcryptjs**: Password hashing
- **multer**: File upload handling

## 🎯 Key Design Patterns

### 1. **MVC Pattern** (Backend)

- **Model**: Mongoose schemas
- **View**: JSON responses
- **Controller**: Route handlers

### 2. **Component Pattern** (Frontend)

- Reusable React components
- Props-based composition
- Hooks for state/effects

### 3. **Repository Pattern** (Backend)

- Data access abstraction
- Centralized query logic

### 4. **Middleware Pattern** (Backend)

- Request/response processing
- Cross-cutting concerns

## 🔄 Error Handling

### Frontend

```javascript
try {
  const response = await axios.get("/api/templates");
} catch (error) {
  if (error.response?.status === 401) {
    // Handle unauthorized
  }
}
```

### Backend

```javascript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: err.message,
  });
});
```

## 📊 Performance Considerations

### Frontend Optimization

- Lazy loading of components
- Image optimization via Cloudinary
- Caching with localStorage
- Bundle size minimization with Vite

### Backend Optimization

- Database indexing
- Request validation
- Response compression
- Connection pooling

## 🧪 Testing Strategy

### Frontend Testing

- Unit tests for components
- Integration tests for routes
- E2E tests for user flows

### Backend Testing

- Unit tests for controllers
- Integration tests for APIs
- Load testing for scalability

## 🚦 Scalability Considerations

### Horizontal Scaling

- Stateless API servers
- Load balancing at Render
- Database replication

### Vertical Scaling

- Increase server resources
- Database indexing
- Caching layer (Redis)

---

**Architecture Document - Version 1.0**

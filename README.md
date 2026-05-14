# 🎉 Greeting Card Application

A modern, full-stack web application for creating and sharing personalized greeting cards with customizable templates. Users can browse through different categories (birthday, festival, love, motivation), customize templates, and download their creations.

## 🌟 Features

- ✅ **User Authentication** - Secure login with Clerk
- ✅ **Template Gallery** - Browse greeting card templates by category
- ✅ **Premium Templates** - Exclusive templates for premium users
- ✅ **Template Customization** - Edit templates with custom text and designs
- ✅ **Download as Image** - Convert customized cards to downloadable images
- ✅ **User Profiles** - Save user profile information and preferences
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile devices
- ✅ **Cloud Storage** - Images hosted on Cloudinary

## 🏗️ Project Structure

```
greeting2/
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── app.js          # Express app configuration
│   │   ├── server.js       # Server entry point
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   └── package.json
│
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── routes/         # Route definitions
│   │   ├── utils/          # Utility functions
│   │   ├── data/           # Static data
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json
│
├── VERCEL_SETUP.md         # Deployment guide
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- Clerk authentication account

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with:
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000

# Start development server
npm run dev

# Or start production server
npm start
```

### Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env file with:
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_API_URL=http://localhost:5000

# Start development server
npm run dev

# Build for production
npm run build
```

## 📖 API Documentation

### Base URL

- Development: `http://localhost:5000`
- Production: `https://greeting-hbps.onrender.com`

### Endpoints

#### Templates

- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get template by ID
- `POST /api/templates` - Create new template (admin only)
- `PUT /api/templates/:id` - Update template (admin only)
- `DELETE /api/templates/:id` - Delete template (admin only)

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Image Export**: html2canvas

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer
- **Image Hosting**: Cloudinary
- **Package Manager**: npm

## 📝 Environment Variables

### Backend (.env)

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/greeting
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (.env)

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=https://api.yourdomain.com
```

## 🚀 Deployment

The application is deployed on:

- **Frontend**: [Vercel](https://greeting-bh6x.vercel.app)
- **Backend**: [Render](https://greeting-hbps.onrender.com)

See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for detailed deployment instructions.

## 📸 Screenshots

See the [screenshots](./screenshots/) directory for application previews.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Created as part of the StudyNotion initiative.

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Happy Greeting! 🎊**

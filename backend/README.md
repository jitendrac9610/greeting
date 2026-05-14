# 🖥️ Backend API Server

Express.js REST API server for the Greeting Card application. Handles authentication, template management, and file uploads.

## 🚀 Quick Start

### Prerequisites

- Node.js v16+
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/greeting_db

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_12345

# Server
PORT=5000
NODE_ENV=development
```

### Running the Server

**Development mode** (with hot reload):

```bash
npm run dev
```

**Production mode**:

```bash
npm start
```

The server will start at `http://localhost:5000`

## 📁 Project Structure

```
src/
├── app.js              # Express app configuration
├── server.js           # Server entry point
├── config/
│   └── db.js          # MongoDB connection setup
├── controllers/
│   └── template.controller.js  # Template request handlers
├── middleware/         # Custom middleware
├── models/
│   └── Template.js     # Template MongoDB schema
├── routes/
│   └── template.routes.js      # Template API routes
└── utils/
    └── seedTemplates.js        # Database seeding utilities
```

## 🔌 API Endpoints

### Health Check

```
GET /
Response: { message: "🚀 Backend is running successfully" }
```

### Templates

```
GET    /api/templates                    - Get all templates
GET    /api/templates/:id                - Get template by ID
POST   /api/templates                    - Create new template
PUT    /api/templates/:id                - Update template
DELETE /api/templates/:id                - Delete template
```

## 📊 Database Schema

### Template Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  image: String (required) - Cloudinary URL,
  category: String (enum: ['birthday', 'festival', 'love', 'motivation']),
  isPremium: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in via Clerk (frontend)
2. Frontend receives Clerk token
3. Frontend sends Clerk token with API requests
4. Backend validates token with Clerk

## 🛠️ Dependencies

| Package      | Version | Purpose               |
| ------------ | ------- | --------------------- |
| express      | ^5.2.1  | Web framework         |
| mongoose     | ^9.6.2  | MongoDB ODM           |
| dotenv       | ^17.4.2 | Environment variables |
| cors         | ^2.8.6  | Cross-origin requests |
| multer       | ^2.1.1  | File uploads          |
| cloudinary   | ^2.10.0 | Image hosting         |
| bcryptjs     | ^3.0.3  | Password hashing      |
| jsonwebtoken | ^9.0.3  | JWT authentication    |

## 👨‍💻 Development Dependencies

| Package | Purpose |
| ------- | ------- | ---------------------------- |
| nodemon | ^3.1.14 | Auto-restart on file changes |

## 📝 Sample API Requests

### Get All Templates

```bash
curl http://localhost:5000/api/templates
```

### Get Template by ID

```bash
curl http://localhost:5000/api/templates/507f1f77bcf86cd799439011
```

### Create Template

```bash
curl -X POST http://localhost:5000/api/templates \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Birthday Bash",
    "image": "https://cloudinary.com/...",
    "category": "birthday",
    "isPremium": false
  }'
```

## 🗄️ Database Connection

The backend uses MongoDB with Mongoose ODM. Connection is established in `src/config/db.js`:

```javascript
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

## ☁️ Cloudinary Integration

Images are uploaded to Cloudinary for reliable cloud storage:

1. Frontend captures canvas as image
2. Sends to backend
3. Backend uploads to Cloudinary
4. Returns Cloudinary URL

## 🚀 Deployment

### Render.com (Current)

1. Push code to GitHub
2. Connect GitHub repo to Render
3. Set environment variables in Render dashboard
4. Deploy

### Heroku (Alternative)

```bash
heroku login
heroku create your-app-name
git push heroku main
```

## 🐛 Troubleshooting

### MongoDB Connection Error

- Verify `MONGO_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database exists

### Cloudinary Upload Fails

- Verify credentials in `.env`
- Check API key and secret
- Ensure account has upload permissions

### CORS Errors

- Verify frontend URL is in CORS allowed origins
- Check `app.js` cors configuration

## 📚 API Response Format

All responses follow this format:

```javascript
{
  success: Boolean,
  message: String,
  data: Object | Array | null,
  error: String | null
}
```

## 🔄 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [JWT Documentation](https://jwt.io)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

**Happy coding! 🚀**

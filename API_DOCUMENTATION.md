# 📚 API Documentation

Complete API reference for the Greeting Card application backend.

## 🔗 Base URL

- **Development**: `http://localhost:5000`
- **Production**: `https://greeting-hbps.onrender.com`

## 🔐 Authentication

All requests should include the JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

Tokens are obtained from Clerk after user authentication.

---

## 📋 Endpoints

### Health Check

#### Get Server Status

```
GET /
```

**Response** (200 OK):

```json
{
  "message": "🚀 Backend is running successfully"
}
```

---

## 🎨 Template Endpoints

### Get All Templates

**Request**:

```
GET /api/templates
```

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category (optional) |
| `isPremium` | boolean | Filter by premium status (optional) |
| `page` | number | Page number for pagination (optional) |
| `limit` | number | Items per page (optional) |

**Example**:

```
GET /api/templates?category=birthday&isPremium=false&page=1&limit=10
```

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Templates retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Birthday Bash",
      "image": "https://res.cloudinary.com/greeting/image/upload/...",
      "category": "birthday",
      "isPremium": false,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Happy Birthday",
      "image": "https://res.cloudinary.com/greeting/image/upload/...",
      "category": "birthday",
      "isPremium": true,
      "createdAt": "2024-01-15T10:31:00Z",
      "updatedAt": "2024-01-15T10:31:00Z"
    }
  ]
}
```

**Error Response** (500):

```json
{
  "success": false,
  "message": "Error retrieving templates",
  "error": "Database connection failed"
}
```

---

### Get Template by ID

**Request**:

```
GET /api/templates/:id
```

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Template ID (MongoDB ObjectId) |

**Example**:

```
GET /api/templates/507f1f77bcf86cd799439011
```

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Template retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Birthday Bash",
    "image": "https://res.cloudinary.com/greeting/image/upload/...",
    "category": "birthday",
    "isPremium": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response** (404):

```json
{
  "success": false,
  "message": "Template not found",
  "error": "No template with ID 507f1f77bcf86cd799439011"
}
```

---

### Create Template

**Request**:

```
POST /api/templates
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

**Request Body**:

```json
{
  "title": "New Template",
  "image": "https://res.cloudinary.com/greeting/image/upload/...",
  "category": "birthday",
  "isPremium": false
}
```

**Response** (201 Created):

```json
{
  "success": true,
  "message": "Template created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "New Template",
    "image": "https://res.cloudinary.com/greeting/image/upload/...",
    "category": "birthday",
    "isPremium": false,
    "createdAt": "2024-01-15T11:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

**Error Response** (400):

```json
{
  "success": false,
  "message": "Validation error",
  "error": "Title is required"
}
```

---

### Update Template

**Request**:

```
PUT /api/templates/:id
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Template ID |

**Request Body**:

```json
{
  "title": "Updated Title",
  "image": "https://new-image-url.com",
  "category": "festival",
  "isPremium": true
}
```

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Template updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Title",
    "image": "https://new-image-url.com",
    "category": "festival",
    "isPremium": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:05:00Z"
  }
}
```

**Error Response** (404):

```json
{
  "success": false,
  "message": "Template not found",
  "error": "No template with ID 507f1f77bcf86cd799439011"
}
```

---

### Delete Template

**Request**:

```
DELETE /api/templates/:id
Authorization: Bearer <jwt_token>
```

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Template ID |

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Template deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011"
  }
}
```

**Error Response** (404):

```json
{
  "success": false,
  "message": "Template not found",
  "error": "No template with ID 507f1f77bcf86cd799439011"
}
```

---

## 📊 Response Format

All API responses follow this format:

```json
{
  "success": boolean,
  "message": "Human-readable message",
  "data": null | object | array,
  "error": null | "Error message"
}
```

---

## 🔄 Status Codes

| Code | Meaning                              |
| ---- | ------------------------------------ |
| 200  | OK - Request successful              |
| 201  | Created - Resource created           |
| 400  | Bad Request - Invalid input          |
| 401  | Unauthorized - Invalid/missing token |
| 404  | Not Found - Resource doesn't exist   |
| 500  | Server Error - Unexpected error      |

---

## 📦 Data Types

### Template Object

```typescript
interface Template {
  _id: string; // MongoDB ObjectId
  title: string; // Template name (required)
  image: string; // Cloudinary image URL (required)
  category: "birthday" | "festival" | "love" | "motivation";
  isPremium: boolean; // Premium flag
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
}
```

---

## 🧪 Example Requests

### Using cURL

```bash
# Get all templates
curl -X GET http://localhost:5000/api/templates

# Get template by ID
curl -X GET http://localhost:5000/api/templates/507f1f77bcf86cd799439011

# Create template
curl -X POST http://localhost:5000/api/templates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_jwt_token" \
  -d '{
    "title": "Happy Birthday",
    "image": "https://res.cloudinary.com/...",
    "category": "birthday",
    "isPremium": false
  }'

# Update template
curl -X PUT http://localhost:5000/api/templates/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_jwt_token" \
  -d '{
    "title": "Updated Title"
  }'

# Delete template
curl -X DELETE http://localhost:5000/api/templates/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer your_jwt_token"
```

### Using JavaScript/Fetch

```javascript
// Get all templates
const response = await fetch("http://localhost:5000/api/templates");
const data = await response.json();
console.log(data);

// Get template by ID
const templateId = "507f1f77bcf86cd799439011";
const response = await fetch(
  `http://localhost:5000/api/templates/${templateId}`,
);
const template = await response.json();

// Create template
const response = await fetch("http://localhost:5000/api/templates", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwtToken}`,
  },
  body: JSON.stringify({
    title: "New Template",
    image: "https://res.cloudinary.com/...",
    category: "birthday",
    isPremium: false,
  }),
});
const newTemplate = await response.json();

// Update template
const templateId = "507f1f77bcf86cd799439011";
const response = await fetch(
  `http://localhost:5000/api/templates/${templateId}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({
      title: "Updated Title",
    }),
  },
);

// Delete template
const templateId = "507f1f77bcf86cd799439011";
const response = await fetch(
  `http://localhost:5000/api/templates/${templateId}`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  },
);
```

### Using Axios (Frontend)

```javascript
import axios from "axios";

const API_URL = "http://localhost:5000";

// Get all templates
const getTemplates = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/templates`);
    return response.data;
  } catch (error) {
    console.error("Error fetching templates:", error);
  }
};

// Get template by ID
const getTemplateById = async (templateId) => {
  try {
    const response = await axios.get(`${API_URL}/api/templates/${templateId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching template:", error);
  }
};

// Create template
const createTemplate = async (templateData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/templates`,
      templateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating template:", error);
  }
};
```

---

## ⚙️ Pagination Example

```javascript
// Get templates with pagination
const getTemplatesPage = async (page = 1, limit = 10) => {
  const response = await fetch(
    `http://localhost:5000/api/templates?page=${page}&limit=${limit}`,
  );
  return response.json();
};

// Usage
const firstPage = await getTemplatesPage(1, 10);
console.log(`Showing ${firstPage.data.length} templates`);
```

---

## 🔍 Filtering Examples

```javascript
// Get birthday templates only
const birthdayTemplates = await fetch(
  "http://localhost:5000/api/templates?category=birthday",
);

// Get premium templates
const premiumTemplates = await fetch(
  "http://localhost:5000/api/templates?isPremium=true",
);

// Combine filters
const premiumBirthdayTemplates = await fetch(
  "http://localhost:5000/api/templates?category=birthday&isPremium=true",
);
```

---

## 📝 Common Errors

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation error",
  "error": "Title is required"
}
```

**Possible causes**:

- Missing required fields
- Invalid data format
- Invalid category enum value

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized",
  "error": "No token provided"
}
```

**Possible causes**:

- Missing Authorization header
- Invalid token
- Expired token

### 404 Not Found

```json
{
  "success": false,
  "message": "Template not found",
  "error": "No template with ID ..."
}
```

**Possible causes**:

- Wrong template ID
- Template was deleted
- Typo in ID

### 500 Server Error

```json
{
  "success": false,
  "message": "Server error",
  "error": "Internal server error"
}
```

**Possible causes**:

- Database connection failed
- Unexpected server error
- Unhandled exception

---

## 🧠 Rate Limiting

Currently, there is no rate limiting. For production, consider implementing:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

---

## 🔐 Security Considerations

1. **Always use HTTPS** in production
2. **Validate all inputs** on the server
3. **Don't expose sensitive data** in responses
4. **Use environment variables** for secrets
5. **Implement rate limiting** to prevent abuse
6. **Add authentication** to all protected routes
7. **Log API access** for monitoring
8. **Update dependencies** regularly

---

## 📖 Related Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./client/README.md)
- [Architecture Guide](./ARCHITECTURE.md)
- [Deployment Guide](./DEPLOYMENT.md)

---

**Last Updated**: 2024  
**Version**: 1.0  
**Status**: Active

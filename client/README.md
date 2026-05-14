# 🎨 Frontend - React + Vite

Modern, responsive React frontend for the Greeting Card application. Built with Vite for lightning-fast development and Tailwind CSS for beautiful styling.

## 🚀 Quick Start

### Prerequisites

- Node.js v16+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_API_URL=http://localhost:5000
```

### Running the Application

**Development mode**:

```bash
npm run dev
```

Server runs at `http://localhost:5173`

**Build for production**:

```bash
npm run build
```

**Preview production build**:

```bash
npm run preview
```

**Linting**:

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── premium/
│   │   └── PremiumModal.jsx        # Premium upgrade modal
│   └── templates/
│       ├── CategoryTabs.jsx        # Category filter tabs
│       ├── TemplateCard.jsx        # Individual template card
│       └── TemplateGrid.jsx        # Grid layout for templates
├── pages/
│   ├── Home.jsx                    # Main template browsing page
│   ├── Login.jsx                   # Login/authentication page
│   ├── Preview.jsx                 # Template preview and editor
│   └── ProfileSetup.jsx            # User profile setup
├── routes/
│   └── AppRoutes.jsx               # Route configuration
├── data/
│   └── templates.js                # Static template data
├── utils/
│   └── storage.js                  # Local storage utilities
├── App.jsx                         # Root component
├── main.jsx                        # Application entry point
├── App.css                         # Global styles
└── index.css                       # Tailwind CSS imports
```

## 🛠️ Tech Stack

| Technology       | Version | Purpose                 |
| ---------------- | ------- | ----------------------- |
| React            | ^19.2.6 | UI library              |
| Vite             | ^8.0.12 | Build tool & dev server |
| Tailwind CSS     | ^3.4.3  | Styling                 |
| React Router DOM | ^7.15.0 | Client-side routing     |
| Clerk            | ^5.61.6 | Authentication          |
| Axios            | ^1.16.0 | HTTP client             |
| html2canvas      | ^1.4.1  | Screenshot/image export |

## 📄 Pages

### 🔐 Login Page (`pages/Login.jsx`)

- Clerk-based authentication
- Social login options
- Redirects to profile setup after login

### 👤 Profile Setup (`pages/ProfileSetup.jsx`)

- User information collection
- Profile picture upload
- Account customization

### 🏠 Home Page (`pages/Home.jsx`)

- Browse all templates
- Filter by category
- View premium templates
- Download templates
- User profile display

### 👁️ Preview Page (`pages/Preview.jsx`)

- Full template preview
- Edit template text
- Customize colors/styling
- Download as image
- Share options

## 🧩 Components

### `CategoryTabs.jsx`

Filters templates by category:

- Birthday
- Festival
- Love
- Motivation

### `TemplateCard.jsx`

Individual template display:

- Thumbnail preview
- Title and description
- Premium badge
- Quick actions

### `TemplateGrid.jsx`

Responsive grid layout for templates with filtering and sorting.

### `PremiumModal.jsx`

Prompts users to upgrade for premium features:

- Upgrade options
- Feature showcase
- Pricing information

## 🔐 Authentication

Uses **Clerk** for secure authentication:

1. Users sign up/log in with email or social accounts
2. Clerk manages sessions and tokens
3. Protected routes check authentication status
4. User data stored in localStorage

### Setup Clerk

1. Create account at [clerk.com](https://clerk.com)
2. Create an application
3. Get your publishable key
4. Add to `.env` as `VITE_CLERK_PUBLISHABLE_KEY`

## 💾 Local Storage

User profile data stored in browser:

```javascript
{
  name: "User Name",
  image: "base64_encoded_image",
  email: "user@example.com"
}
```

See `utils/storage.js` for storage utilities.

## 🎨 Styling

### Tailwind CSS

Global styling with Tailwind CSS utility classes.

### PostCSS

Configured in `postcss.config.js` for Tailwind processing.

### ESLint

Code quality with ESLint configuration in `eslint.config.js`.

## 🔄 API Integration

### Base URL

Configured via `VITE_API_URL` environment variable.

### Example Requests

```javascript
// Get all templates
const response = await axios.get(`${API_URL}/api/templates`);

// Get template by ID
const response = await axios.get(`${API_URL}/api/templates/${id}`);
```

## 🖼️ Image Export

Convert greeting cards to images using `html2canvas`:

```javascript
import html2canvas from "html2canvas";

const canvas = await html2canvas(element);
const image = canvas.toDataURL("image/png");
```

## 🚀 Deployment

### Vercel (Current)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Netlify (Alternative)

```bash
npm run build
# Deploy the dist/ folder
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## ✅ Environment Variables Reference

| Variable                     | Description              | Example                   |
| ---------------------------- | ------------------------ | ------------------------- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk authentication key | `pk_test_...`             |
| `VITE_API_URL`               | Backend API URL          | `https://api.example.com` |

## 📱 Responsive Design

The application is fully responsive:

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

Built with mobile-first approach using Tailwind's responsive classes.

## 🧪 Testing

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint --fix
```

## 🚫 Common Issues & Solutions

### Blank Page on Load

- Check browser console for errors
- Verify `VITE_API_URL` environment variable
- Ensure backend is running

### Images Not Loading

- Verify Cloudinary URLs are accessible
- Check CORS settings on backend
- Inspect network tab in DevTools

### Authentication Issues

- Verify Clerk public key is correct
- Check Clerk dashboard for configuration
- Clear browser localStorage and try again

## 📚 Component Props

### TemplateCard

```javascript
{
  id: string,
  title: string,
  image: string,
  isPremium: boolean,
  onSelect: function
}
```

### CategoryTabs

```javascript
{
  categories: array,
  activeCategory: string,
  onCategoryChange: function
}
```

## 🔗 Useful Links

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Clerk Documentation](https://clerk.com/docs)
- [html2canvas](https://html2canvas.herokuapp.com)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linter: `npm run lint`
4. Test thoroughly
5. Submit a pull request

---

**Happy designing! 🎨**

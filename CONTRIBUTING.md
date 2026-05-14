# 🤝 Contributing to Greeting Card Application

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing](#testing)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## 📝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Report issues responsibly
- Respect intellectual property

## 🚀 Getting Started

### Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/greeting2.git
cd greeting2
```

### Create a Branch

```bash
# Create a feature branch
git checkout -b feature/YourFeatureName

# Or create a bugfix branch
git checkout -b bugfix/YourBugName
```

## 💻 Development Setup

### Prerequisites

- Node.js v16+
- MongoDB account (Atlas)
- Cloudinary account
- Clerk account

### Backend Setup

```bash
cd backend
npm install

# Create .env
echo "MONGO_URI=your_mongodb_uri" > .env
echo "CLOUDINARY_NAME=your_cloudinary_name" >> .env
echo "CLOUDINARY_API_KEY=your_api_key" >> .env
echo "CLOUDINARY_API_SECRET=your_api_secret" >> .env
echo "JWT_SECRET=your_jwt_secret" >> .env
echo "PORT=5000" >> .env

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd client
npm install

# Create .env
echo "VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key" > .env
echo "VITE_API_URL=http://localhost:5000" >> .env

# Start development server
npm run dev
```

## 🔧 Making Changes

### 1. Follow Project Structure

- Frontend components in `client/src/components/`
- Backend routes in `backend/src/routes/`
- Models in `backend/src/models/`
- Utilities in appropriate `utils/` folders

### 2. Create New Components (Frontend)

```javascript
// client/src/components/MyComponent.jsx
export default function MyComponent({ prop1, prop2 }) {
  return <div>{/* Component JSX */}</div>;
}
```

### 3. Create New Routes (Backend)

```javascript
// backend/src/routes/new.routes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Success" });
});

module.exports = router;
```

### 4. Update Tests

- Add tests for new features
- Ensure all tests pass
- Maintain test coverage above 80%

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build, dependencies, etc.

### Examples

```bash
git commit -m "feat(templates): add category filtering"
git commit -m "fix(auth): fix token validation error"
git commit -m "docs(readme): update installation instructions"
```

## 🔄 Pull Request Process

### Before Submitting

1. Update `main` branch

   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. Run tests

   ```bash
   npm test
   ```

3. Run linter

   ```bash
   npm run lint
   ```

4. Build project
   ```bash
   npm run build
   ```

### Submitting PR

1. Push to your fork

   ```bash
   git push origin feature/YourFeatureName
   ```

2. Open Pull Request on GitHub
3. Fill out PR template completely
4. Reference related issues

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change

## Related Issues

Fixes #(issue)

## Testing

- [ ] Unit tests added
- [ ] Manual testing completed
- [ ] Screenshots/videos attached (if UI change)

## Checklist

- [ ] Code follows project style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
```

## 🎨 Code Style

### JavaScript/React

```javascript
// Use const/let instead of var
const name = "value";

// Use arrow functions
const myFunction = () => {
  // function body
};

// Use destructuring
const { prop1, prop2 } = object;

// Use template literals
const message = `Hello ${name}`;

// Use descriptive names
const getUserTemplates = async () => {};

// Add comments for complex logic
// Filter templates by premium status
const premiumTemplates = templates.filter((t) => t.isPremium);
```

### Component Naming

- Use PascalCase: `MyComponent.jsx`
- One component per file
- Export default: `export default MyComponent;`

### File Organization

```
client/src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   └── Card.jsx
│   ├── templates/
│   │   └── TemplateCard.jsx
│   └── index.js
├── pages/
│   ├── Home.jsx
│   └── index.js
├── utils/
│   └── api.js
└── hooks/
    └── useTemplates.js
```

### Backend Naming

```
backend/src/
├── controllers/
│   └── templateController.js (camelCase)
├── models/
│   └── Template.js (PascalCase for schemas)
├── routes/
│   └── template.routes.js
└── middleware/
    └── auth.middleware.js
```

## 🧪 Testing

### Frontend Tests

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- TemplateCard.test.jsx
```

### Backend Tests

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

### Writing Tests

```javascript
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
## Description

Clear description of the bug

## Steps to Reproduce

1. Step one
2. Step two
3. Step three

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- OS: [e.g., Windows 10, macOS]
- Browser: [e.g., Chrome 95]
- Node Version: [e.g., 16.13]

## Screenshots

Attach images if applicable

## Additional Context

Any other context
```

### Where to Report

- Frontend bugs: Open issue with `[Frontend]` label
- Backend bugs: Open issue with `[Backend]` label
- Security issues: Email maintainers privately

## 💡 Suggesting Features

### Feature Request Template

```markdown
## Description

Clear description of feature

## Problem Statement

What problem does this solve?

## Proposed Solution

How should this be implemented?

## Alternative Solutions

Other possible approaches

## Additional Context

Examples, mockups, references
```

## 📚 Resources

- [Git Commit Best Practices](https://www.gitwiki.org/en/best-practices/)
- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Best Practices](https://docs.mongodb.com)

## ✅ Contribution Checklist

- [ ] Code follows project style guide
- [ ] Self-reviewed the code
- [ ] Comments added for unclear parts
- [ ] Tests added for new features
- [ ] Tests pass locally
- [ ] No console errors/warnings
- [ ] Updated documentation
- [ ] Changes don't break existing features
- [ ] Commit messages are clear
- [ ] Branch is updated with main

## 🎉 Thank You!

Your contributions make this project better. Thank you for taking the time to contribute!

---

**Happy contributing! 🚀**

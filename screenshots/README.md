# 📸 Application Screenshots

This directory contains screenshots of the Greeting Card application across different pages and features.

## 📋 Screenshot Index

### Authentication

- **`01_login_page.png`** - Login/Sign-up page with Clerk authentication
- **`02_profile_setup.png`** - User profile creation and setup page

### Main Features

- **`03_home_page_desktop.png`** - Home page on desktop showing template gallery
- **`04_home_page_mobile.png`** - Home page on mobile device
- **`05_category_tabs.png`** - Category filtering (Birthday, Festival, Love, Motivation)
- **`06_template_grid.png`** - Template grid with multiple cards

### Premium Features

- **`07_premium_modal.png`** - Premium upgrade modal
- **`08_premium_templates.png`** - Premium template showcase

### Template Editor

- **`09_preview_page.png`** - Full template preview and editor
- **`10_template_customization.png`** - Editing template with custom text
- **`11_download_preview.png`** - Download confirmation screen

### User Profile

- **`12_user_profile_section.png`** - User profile display in header
- **`13_profile_menu.png`** - User menu dropdown

### Responsive Design

- **`14_responsive_layout.png`** - Responsive design on different screen sizes

---

## 🎬 How to Capture Screenshots

### 1. Login Page

```
URL: http://localhost:5173/
- Show Clerk sign-in widget
- Display social login options
- Show email/password input fields
```

### 2. Profile Setup

```
URL: http://localhost:5173/profile-setup
- Show profile form
- Display profile picture upload
- Show save button
```

### 3. Home Page

```
URL: http://localhost:5173/home
- Show template gallery
- Display category tabs
- Show user profile in header
- Display premium badges on templates
```

### 4. Template Preview

```
URL: http://localhost:5173/preview/:templateId
- Show full template preview
- Display text editing fields
- Show download button
- Display customization options
```

---

## 📐 Screenshot Specifications

### Desktop Screenshots

- **Resolution**: 1920 x 1080 (Full HD)
- **Browser**: Chrome or Firefox (latest)
- **Format**: PNG (lossless)
- **Naming**: Use descriptive names with sequence numbers

### Mobile Screenshots

- **Resolution**: 375 x 667 (iPhone 8)
- **Browser**: Chrome DevTools Mobile View
- **Format**: PNG (lossless)
- **Naming**: Append `_mobile` to filename

### Tablet Screenshots

- **Resolution**: 768 x 1024 (iPad)
- **Browser**: Chrome DevTools Tablet View
- **Format**: PNG (lossless)
- **Naming**: Append `_tablet` to filename

---

## 💡 Screenshot Guidelines

1. **Clarity**: Ensure text is readable and all UI elements are visible
2. **Context**: Include user interactions (hover states, open modals, etc.)
3. **Consistency**: Use the same browser and zoom level for all screenshots
4. **Lighting**: Avoid glare and ensure good contrast
5. **Content**: Include meaningful data (real template names, user profiles)
6. **Sensitive Data**: Blur or remove any real API keys, tokens, or personal information

---

## 🎨 Recommended Tools for Screenshots

### Windows

- **Snipping Tool** (Built-in)
- **ShareX** (Free, advanced features)
- **Greenshot** (Free, lightweight)

### Mac

- **Screenshot** (Built-in: Cmd+Shift+4)
- **Skitch** (Free, annotation)
- **CleanShot X** (Premium, professional)

### Linux

- **GNOME Screenshot** (Built-in)
- **Flameshot** (Free, feature-rich)
- **KSnip** (Free, cross-platform)

---

## 📦 File Structure

```
screenshots/
├── README.md                           # This file
├── 01_login_page.png
├── 02_profile_setup.png
├── 03_home_page_desktop.png
├── 04_home_page_mobile.png
├── 05_category_tabs.png
├── 06_template_grid.png
├── 07_premium_modal.png
├── 08_premium_templates.png
├── 09_preview_page.png
├── 10_template_customization.png
├── 11_download_preview.png
├── 12_user_profile_section.png
├── 13_profile_menu.png
└── 14_responsive_layout.png
```

---

## 📝 Screenshot Documentation Template

For each screenshot, provide:

```markdown
### [Screenshot Name]

**Page**: [URL/Page Name]
**Device**: [Desktop/Mobile/Tablet]
**Resolution**: [Size]
**Description**: [What is shown]
**Notable Features**:

- Feature 1
- Feature 2
```

---

## 🚀 Using Screenshots

### In README

```markdown
![Login Page](screenshots/01_login_page.png)
```

### In Documentation

```markdown
## Authentication

Users can sign in using Clerk:

![Login Page](screenshots/01_login_page.png)

After authentication, users are redirected to profile setup.
```

### In GitHub Issues

```markdown
## Bug Report

![Bug Screenshot](screenshots/bug_screenshot.png)
```

---

## 📋 Checklist Before Committing

- [ ] All screenshots are in PNG format
- [ ] File names follow the naming convention
- [ ] Images are optimized (< 500KB each)
- [ ] No sensitive information visible
- [ ] Screenshots clearly show the feature
- [ ] Mobile and desktop versions included
- [ ] README is up to date

---

**Happy screenshot capturing! 📸**

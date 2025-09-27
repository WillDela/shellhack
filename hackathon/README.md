# 📚 Sylly - Smart Academic Life Organizer

> **Transforming academic chaos into organized success** 🎓

**Sylly** is an intelligent web application designed to revolutionize how students manage their academic life. Built for the modern student, Sylly automatically extracts deadlines and important dates from syllabus PDFs, seamlessly integrates with Google Calendar, and provides AI-powered academic assistance.

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](#)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue)](#)
[![React](https://img.shields.io/badge/React-19.1.1-61dafb)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://typescriptlang.org/)
[![Auth0](https://img.shields.io/badge/Auth0-Secured-orange)](https://auth0.com/)

---

## 🌟 Features

### 📋 **Smart Dashboard**
- **Upcoming Deadlines** with intelligent urgency color-coding
- **Real-time Statistics** tracking courses and assignments
- **Quick Actions** for course management and calendar sync
- **Dynamic Progress Tracking** with visual indicators

### 📚 **Course Management**
- **PDF Syllabus Upload** with automatic parsing
- **Course Organization** with detailed view and management
- **Deadline Extraction** using AI-powered document analysis
- **Visual Course Cards** with easy deletion and PDF viewing

### 📅 **Calendar Integration**
- **Google Calendar Sync** for seamless schedule management
- **Embedded Calendar View** with full navigation
- **Event Creation** directly from parsed syllabi
- **Multiple Calendar Support** with school-specific organization

### 🤖 **AI Assistant (Chatbot)**
- **Academic Support** powered by AI
- **Study Planning** and deadline management advice
- **Interactive Chat Interface** for instant help
- **Context-Aware Responses** based on your courses

### 🎨 **Modern User Experience**
- **Light/Dark Mode Toggle** with system preference detection
- **Responsive Design** optimized for all devices
- **Smooth Animations** and professional UI transitions
- **Accessibility-First** design with ARIA support

### 🔐 **Secure Authentication**
- **Auth0 Integration** for secure user management
- **Google OAuth** for seamless sign-in
- **Session Persistence** with automatic token refresh
- **Multi-Provider Support** for flexible authentication

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **Auth0 Account** (free tier available)
- **Google Developer Account** (for Calendar API)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sylly.git
   cd sylly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file:
   ```env
   # Auth0 Configuration
   VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_AUTH0_REDIRECT_URI=http://localhost:5173

   # Backend API (optional for development)
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.1.7** - Lightning-fast build tool

### **UI & Styling**
- **Bootstrap 5.3.8** - Responsive component library
- **React Bootstrap 2.10.10** - React-specific Bootstrap components
- **Custom CSS** - Sylly-branded design system with CSS variables
- **Lucide React** - Beautiful, customizable icons

### **Authentication & APIs**
- **Auth0** - Enterprise-grade authentication
- **Google APIs** - Calendar integration and OAuth
- **React Router DOM** - Client-side routing

### **Development Tools**
- **ESLint** - Code quality and consistency
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite React Plugin** - Optimized React development

---

## 📁 Project Structure

```
sylly/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── GoogleCalendar.tsx
│   │   ├── Login.tsx
│   │   ├── Navbar.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Toast.tsx
│   ├── contexts/           # React Context providers
│   │   └── ThemeContext.tsx
│   ├── pages/              # Main application pages
│   │   ├── Calendar.tsx
│   │   ├── Chatbot.tsx
│   │   ├── Courses.tsx
│   │   └── Dashboard.tsx
│   ├── services/           # API and external service integrations
│   │   ├── apiService.ts
│   │   └── googleCalendarService.ts
│   ├── styles/             # Global styles and theming
│   │   └── colors.css
│   ├── auth/               # Authentication components
│   │   └── AuthProvider.tsx
│   ├── App.tsx             # Main application component
│   ├── CourseContext.tsx   # Course state management
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── README.md              # You are here!
```

---

## 🔧 Configuration

### Auth0 Setup

1. **Create an Auth0 Application**
   - Go to [Auth0 Dashboard](https://manage.auth0.com)
   - Create a new "Single Page Application"
   - Configure the following URLs:

2. **Application Settings**
   ```
   Allowed Callback URLs: http://localhost:5173
   Allowed Logout URLs: http://localhost:5173
   Allowed Web Origins: http://localhost:5173
   ```

3. **Social Connections** (Optional)
   - Enable Google OAuth for seamless sign-in
   - Configure other social providers as needed

### Google Calendar API

1. **Enable the Calendar API**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Enable the Google Calendar API
   - Create credentials (OAuth 2.0 Client ID)

2. **Configure OAuth Consent Screen**
   - Add your domain to authorized domains
   - Set up scopes for calendar access

---

## 🎯 Usage Guide

### **Getting Started**
1. **Sign up/Login** using Auth0 (supports Google OAuth)
2. **Upload a syllabus** PDF through the dashboard
3. **Review extracted deadlines** and course information
4. **Sync to Google Calendar** with one click
5. **Use the AI chatbot** for academic assistance

### **Adding Courses**
1. Click **"Add Course"** on the dashboard
2. Fill in course code and name
3. Upload syllabus PDF (supports most formats)
4. Review and confirm extracted events
5. Sync to your calendar instantly

### **Managing Deadlines**
- **Color-coded urgency**: Red (urgent), Yellow (upcoming), Blue (normal)
- **Smart filtering**: Automatically shows only upcoming deadlines
- **Calendar integration**: One-click sync to Google Calendar
- **Study plan generation**: AI-powered study schedule suggestions

### **Using the Chatbot**
- Ask questions about your courses
- Get study tips and deadline reminders
- Request academic planning assistance
- Receive personalized recommendations

---

## 🌙 Theme Support

Sylly features a beautiful light/dark mode toggle:

- **Automatic Detection** - Respects system preferences
- **Persistent Storage** - Remembers your choice
- **Smooth Transitions** - Professional animations
- **Accessibility** - Proper contrast ratios and ARIA labels

Toggle between themes using the sun/moon button in the top-right navbar.

---

## 🚀 Deployment

### **Development**
```bash
npm run dev          # Start development server
npm run lint         # Run ESLint
npm run build        # Build for production
npm run preview      # Preview production build
```

### **Production Build**
```bash
npm run build
```
The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### **Recommended Hosting**
- **Vercel** - Optimized for React applications
- **Netlify** - Easy deployment with CI/CD
- **AWS S3 + CloudFront** - Scalable static hosting
- **GitHub Pages** - Free hosting for open source

---

## 🤝 Contributing

We welcome contributions to make Sylly even better! Here's how you can help:

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### **Contribution Guidelines**
- Follow the existing code style and TypeScript patterns
- Add tests for new features
- Update documentation for any API changes
- Ensure all linting passes
- Test in both light and dark modes

### **Areas for Contribution**
- 🔍 **PDF Parsing**: Improve syllabus extraction accuracy
- 🤖 **AI Features**: Enhance chatbot capabilities
- 📱 **Mobile UX**: Optimize responsive design
- 🔒 **Security**: Strengthen authentication and data protection
- 🎨 **Themes**: Add more color schemes and customization
- 🌐 **Accessibility**: Improve screen reader support

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### **Built With Love By**
- **Your Team Name** - Hackathon Heroes ✨
- **Florida International University** - Supporting innovation in education

### **Special Thanks To**
- **Auth0** - For secure, easy authentication
- **Google** - For Calendar API and OAuth services
- **Bootstrap Team** - For the amazing UI framework
- **React Community** - For the incredible ecosystem
- **Open Source Contributors** - For making this possible

### **Hackathon Information**
- **Event**: ShellHacks 2024 🐚
- **Category**: Education Technology
- **Theme**: Solving Real Student Problems
- **Built In**: 48 Hours

---

## 📞 Support & Contact

### **Get Help**
- 📧 **Email**: support@sylly.app
- 💬 **Discord**: Join our community server
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/sylly/issues)
- 📚 **Documentation**: [Full Docs](https://docs.sylly.app)

### **Stay Connected**
- 🌟 **Star this repo** if you found it helpful!
- 🐦 **Follow us on Twitter**: [@SyllyApp](https://twitter.com/syllyapp)
- 💼 **LinkedIn**: [Sylly Team](https://linkedin.com/company/sylly)

---

<div align="center">

**Made with ❤️ for students, by students**

*Transforming academic chaos into organized success, one syllabus at a time* 📚✨

[⬆ Back to Top](#-sylly---smart-academic-life-organizer)

</div>

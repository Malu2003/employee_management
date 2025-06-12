# Employee Management System - Full Stack

A complete full-stack web application for managing employees, profiles, and posts built with **Angular 17+** (frontend) and **NestJS** (backend).

## 🎯 Project Overview

This application provides a comprehensive employee management system with the following capabilities:
- Employee CRUD operations
- User profile management
- Posts creation and management
- User authentication
- Responsive design

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│   Angular App   │ ◄─────────────────► │   NestJS API    │
│   (Frontend)    │                     │   (Backend)     │
│   Port: 4200    │                     │   Port: 3000    │
└─────────────────┘                     └─────────────────┘
                                                │
                                                ▼
                                        ┌─────────────────┐
                                        │  MySQL Database │
                                        │   Port: 3306    │
                                        └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend (Angular)
- **Framework:** Angular 17+
- **Language:** TypeScript
- **Styling:** Custom CSS with responsive design
- **HTTP Client:** Angular HttpClient
- **Routing:** Angular Router
- **Forms:** Template-driven forms

### Backend (NestJS)
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** MySQL
- **ORM:** TypeORM/Prisma

## 📋 Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MySQL** (v8 or higher)
- **Angular CLI** (`npm install -g @angular/cli`)
- **NestJS CLI** (`npm install -g @nestjs/cli`)



This will start:
- **Frontend:** http://localhost:4200
- **Backend:** http://localhost:3000


## 📱 Application Features

### 🏠 Welcome Page
- Application overview
- Navigation to different sections

### 👥 Employee Management
- **List Employees** - View all employees in a responsive table
- **Add Employee** - Create new employee with username/password
- **Edit Employee** - Update employee information
- **Delete Employee** - Remove employee (with confirmation)
- **View Details** - Complete employee information

### 👤 Profile Management
- **Create Profile** - Add personal information (name, age, DOB)
- **View Profile** - Display profile information
- **Edit Profile** - Update profile data

### 📝 Posts Management
- **Create Posts** - Write posts with title and description
- **View Posts** - List all posts by user
- **Manage Posts** - Edit or delete posts

## 🌐 API Endpoints

### Employee Endpoints
```
GET    /api/users           - Get all employees
GET    /api/users/:id       - Get employee by ID
POST   /api/users           - Create new employee
PUT    /api/users/:id       - Update employee
DELETE /api/users/:id       - Delete employee
```

### Profile Endpoints
```
POST   /api/users/:id/profiles     - Create profile
GET    /api/users/:id/profiles     - Get user profile
PUT    /api/users/:id/profiles     - Update profile
```

### Posts Endpoints
```
GET    /api/users/:id/posts        - Get user posts
POST   /api/users/:id/posts        - Create new post
PUT    /api/posts/:id              - Update post
DELETE /api/posts/:id              - Delete post
```

## 🔧 Development

### Project Structure
```
employee-management-fullstack/
├── frontend/                   # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Angular components
│   │   │   ├── services/       # HTTP services
│   │   │   └── models/         # TypeScript interfaces
│   │   └── assets/             # Static assets
│   ├── angular.json
│   └── proxy.config.json
├── backend/                    # NestJS application
│   ├── src/
│   │   ├── modules/            # Feature modules
│   │   ├── entities/           # Database entities
│   │   ├── controllers/        # Route controllers
│   │   └── services/           # Business logic
│   └── nest-cli.json
├── package.json               # Root package.json
└── README.md                  # This file
```

### Adding New Features
1. **Frontend:** Add components in `frontend/src/app/components/`
2. **Backend:** Add modules in `backend/src/modules/`
3. **Database:** Update entities and run migrations


## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 👤 Author

**Your Name**
- Email: nijin.ai.tech@gmail.com
- GitHub: [@Malu2003](https://github.com/yourusername)


**⭐ Star this repository if you found it helpful!**

## 📸 Screenshots

### Employee List
![Employee List](screenshots/employee-list.png)

### Create Profile
![Create Profile](screenshots/create-profile.png)

### Posts Management
![Posts Management](screenshots/posts-management.png)

---

## 🔗 Live Demo

[🌐 Live Application](https://your-app-name.vercel.app) 

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me via email
- Check the documentation

**Happy coding! 🚀**
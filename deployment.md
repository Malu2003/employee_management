# Deployment Guide

## Prerequisites for Deployment

### Frontend (Angular)
- Node.js 18+
- Angular CLI: `npm install -g @angular/cli`

### Backend (NestJS)  
- Node.js 18+
- NestJS CLI: `npm install -g @nestjs/cli`
- MySQL database

## Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Malu2003/employee_management.git
   cd employee-management-fullstack
   ```

2. **Install all dependencies:**
   ```bash
   npm run setup
   ```

3. **Setup database:**
   ```bash
   # Create MySQL database
   mysql -u root -p -e "CREATE DATABASE employee_management;"
   ```

4. **Configure environment variables:**
   
   **Backend (.env in backend folder):**
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=employee_management
   PORT=3000
   ```

5. **Run the application:**
   ```bash
   npm run dev
   ```
   
   Access:
   - Frontend: http://localhost:4200
   - Backend: http://localhost:3000

## Production Deployment

### Option 1: Separate Hosting

#### Frontend (Vercel)
```bash
cd frontend
ng build --prod
# Deploy dist folder to Vercel
```

#### Backend (Railway)
```bash
cd backend
# Push to Railway with environment variables
```

### Option 2: VPS/Cloud Server
```bash
# Build everything
npm run build:all

# Start production
npm run start:prod
```

## Environment Variables for Production

### Backend:
- `DATABASE_URL` or individual DB vars
- `JWT_SECRET`
- `NODE_ENV=production`
- `PORT=3000`

### Frontend:
- Update API endpoints in services if needed
```
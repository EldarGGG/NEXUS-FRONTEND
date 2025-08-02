# Troubleshooting Guide

## Common Issues and Solutions

### Frontend Issues

#### 1. 404 Page Not Found
**Problem**: Next.js shows 404 when visiting http://localhost:3000
**Solution**: ✅ **FIXED** - The app is designed as a Telegram Web App with specific entry points:
- `/signin` - Main authentication page
- `/signup` - Registration flow
- `/shop/[shop-id]` - Shop browsing (e.g., `/shop/2`)
- `/seller` - Seller dashboard

Root page now redirects to `/signin` as intended.

#### 2. NPM Vulnerabilities
**Problem**: `npm install` shows security vulnerabilities
**Solution**: 
```bash
npm audit fix
# or for force fix:
npm audit fix --force
```

#### 3. Outdated Browserslist
**Problem**: Warning about outdated caniuse-lite
**Solution**:
```bash
npx update-browserslist-db@latest
```

### Backend Issues

#### 1. Django Module Not Found
**Problem**: `ModuleNotFoundError: No module named 'django'`
**Solution**: Install dependencies manually:
```bash
cd backend
venv\Scripts\activate
pip install django djangorestframework django-cors-headers pillow
```

#### 2. Pillow Installation Fails
**Problem**: `pillow` package fails to build on Windows
**Solutions**:
- **Option A**: Install pre-compiled wheel:
  ```bash
  pip install --upgrade pip
  pip install pillow --only-binary=pillow
  ```
- **Option B**: Use simplified requirements:
  ```bash
  pip install -r requirements-simple.txt
  ```

#### 3. Virtual Environment Issues
**Problem**: Virtual environment not activating properly
**Solution**:
```bash
# Delete and recreate venv
rmdir /s venv
py -m venv venv
venv\Scripts\activate
```

### General Setup Issues

#### 1. Python Not Found
**Problem**: `'py' is not recognized as an internal or external command`
**Solution**: 
- Install Python from https://python.org
- Make sure "Add Python to PATH" is checked during installation
- Or use `python` instead of `py`

#### 2. Node.js Not Found
**Problem**: `'npm' is not recognized as an internal or external command`
**Solution**:
- Install Node.js from https://nodejs.org
- Restart your terminal after installation

#### 3. Port Already in Use
**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`
**Solution**:
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use different port
npm run dev -- -p 3001
```

## Manual Setup Steps

If the automated setup fails, follow these manual steps:

### Frontend Manual Setup
```bash
cd nexus-platform/frontend
npm install
npm run dev
```

### Backend Manual Setup
```bash
cd nexus-platform/backend
py -m venv venv
venv\Scripts\activate
pip install django djangorestframework django-cors-headers
cd src
py -m manage migrate
py -m manage runserver
```

## Verification Steps

### 1. Frontend Working
- Visit http://localhost:3000
- Should see "Nexus Market" homepage with navigation links
- No 404 errors

### 2. Backend Working
- Visit http://localhost:8000
- Should see Django default page or API response
- Visit http://localhost:8000/api/docs/ for Swagger documentation

## Getting Help

If you're still experiencing issues:

1. Check that both Python and Node.js are properly installed
2. Make sure you're running commands in the correct directories
3. Try deleting `node_modules` and `venv` folders and starting fresh
4. Check the original setup notes in `docs/ORIGINAL_SETUP_NOTES.md`

## Environment Requirements

- **Python**: 3.8+ (recommended 3.11+)
- **Node.js**: 16+ (recommended 18+)
- **Operating System**: Windows 10/11
- **Available Ports**: 3000 (frontend), 8000 (backend)

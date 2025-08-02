# Nexus Platform - Deployment Guide

## Overview
This guide covers deploying the Nexus Platform to production using Railway (backend) and Vercel (frontend).

## Architecture
- **Backend**: Django REST API on Railway with PostgreSQL
- **Frontend**: Next.js application on Vercel
- **Database**: PostgreSQL on Railway

## Backend Deployment (Railway)

### 1. Prepare Railway Account
1. Sign up at [railway.app](https://railway.app)
2. Connect your GitHub account
3. Create a new project

### 2. Deploy Backend
1. Fork/upload the `backend` folder to a GitHub repository
2. In Railway, click "New Project" → "Deploy from GitHub repo"
3. Select your backend repository
4. Railway will automatically detect the Dockerfile

### 3. Configure Environment Variables
Set these environment variables in Railway:

```bash
ENVIRONMENT=production
SECRET_KEY=your-super-secret-key-here
DEBUG=False
DATABASE_URL=postgresql://... # Railway will provide this automatically
```

### 4. Add PostgreSQL Database
1. In Railway project, click "New" → "Database" → "PostgreSQL"
2. Railway will automatically set the `DATABASE_URL` environment variable

### 5. Deploy
- Railway will automatically build and deploy your application
- The health check endpoint will be available at `/api/v1/health/`
- Admin panel will be at `/admin/` (username: admin, password: nexus123)

## Frontend Deployment (Vercel)

### 1. Prepare Vercel Account
1. Sign up at [vercel.com](https://vercel.com)
2. Connect your GitHub account

### 2. Deploy Frontend
1. Fork/upload the `frontend` folder to a GitHub repository
2. In Vercel, click "New Project"
3. Import your frontend repository
4. Vercel will automatically detect it's a Next.js project

### 3. Configure Environment Variables
Set this environment variable in Vercel:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-railway-app.railway.app
```

Replace `your-railway-app` with your actual Railway app domain.

### 4. Deploy
- Vercel will automatically build and deploy your application
- Your app will be available at `https://your-app.vercel.app`

## Post-Deployment Configuration

### 1. Update CORS Settings
After getting your Vercel domain, update the backend CORS settings in `production.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-app.vercel.app",  # Add your actual Vercel domain
    "http://localhost:3000",
    "http://localhost:3002",
]

CSRF_TRUSTED_ORIGINS = [
    "https://your-app.vercel.app",  # Add your actual Vercel domain
    "https://*.railway.app",
]
```

### 2. Test the Deployment
1. Visit your Vercel frontend URL
2. Test user registration and login
3. Test shop functionality
4. Test seller dashboard
5. Check that API calls are working properly

## Monitoring and Maintenance

### Railway (Backend)
- Monitor logs in Railway dashboard
- Check health endpoint: `https://your-railway-app.railway.app/api/v1/health/`
- Database backups are handled automatically by Railway

### Vercel (Frontend)
- Monitor deployments in Vercel dashboard
- Check function logs for any errors
- Analytics available in Vercel dashboard

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure frontend domain is added to CORS_ALLOWED_ORIGINS
2. **Database Connection**: Check DATABASE_URL environment variable
3. **Static Files**: Ensure WhiteNoise is properly configured
4. **API Calls Failing**: Verify NEXT_PUBLIC_API_BASE_URL is correct

### Debug Commands

Backend (Railway):
```bash
# Check health
curl https://your-railway-app.railway.app/api/v1/health/

# Check admin
https://your-railway-app.railway.app/admin/
```

Frontend (Vercel):
```bash
# Check build logs in Vercel dashboard
# Check function logs for API call errors
```

## Security Notes

1. **Secret Key**: Use a strong, unique SECRET_KEY in production
2. **Debug Mode**: Ensure DEBUG=False in production
3. **HTTPS**: Both Railway and Vercel provide HTTPS by default
4. **Environment Variables**: Never commit sensitive data to git

## Scaling

### Railway
- Upgrade to paid plan for more resources
- Enable auto-scaling if needed
- Monitor resource usage

### Vercel
- Automatic scaling included
- Monitor function execution time
- Upgrade plan if needed for more bandwidth

## Support

For deployment issues:
- Railway: [docs.railway.app](https://docs.railway.app)
- Vercel: [vercel.com/docs](https://vercel.com/docs)

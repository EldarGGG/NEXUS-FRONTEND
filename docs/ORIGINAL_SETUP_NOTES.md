# Original Setup Notes

This document preserves the original setup instructions from the nexus-merchant-dev README.

## Backend Setup (Django API)

### First Time Setup

1. Open project directory in terminal
2. `py -m venv venv` - Create virtual environment
3. `venv\Scripts\activate` - Activate virtual environment
4. `cd src` - Navigate to source directory
5. `py -m manage migrate` - Run migrations, create database
6. `py -m manage createsuperuser` - Register superuser
7. `py -m manage runserver` - Start application

### Subsequent Runs

1. Open project directory in terminal
2. `venv\Scripts\activate` - Activate virtual environment
3. `cd src` - Navigate to source directory
4. `py -m manage runserver` - Start application

## API Information

- **Development URL**: https://merchant-nexuspro.webdsm.kz/signup/
- **API Documentation**: `/api/docs/` - Swagger with endpoint descriptions
- **OpenAPI Schema**: `/api/schema/` - OpenAPI YAML

## Notes

- The original project had 4 separate folders which have been consolidated
- All original functionality has been preserved
- This setup was tested and working as of the consolidation date

## PANGANISHA SMART HOUSE
- Pangisha Smart House is a modern property rental platform that enables landlords to list rental properties and tenants to discover available houses with ease. The application is built with a Flask REST API backend and a React frontend, providing a secure, responsive, and user-friendly experience.

---

## Features

### Authentication
- User registration
- Secure login using JWT Authentication
- Password hashing with Flask-Bcrypt
- Protected API endpoints

### Property Management
- Add new properties
- Upload property images
- View all available properties
- View individual property details
- Update property information
- Delete properties

### Image Upload
- Cloud image storage
- Fast image delivery
- Secure upload handling

### Frontend
- Responsive user interface
- React Router navigation
- Property listing page
- Property details page
- Add Property form
- SweetAlert notifications
- Axios API integration

---

# Tech Stack

## Backend
- Python
- Flask
- Flask SQLAlchemy
- Flask Migrate
- Flask JWT Extended
- Flask Marshmallow
- Flask Bcrypt
- PostgreSQL
- Cloudinary

## Frontend
- React
- Vite
- React Router DOM
- Axios
- SweetAlert2
- CSS

---

## Installation
## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/pangisha-smarthouse.git
```

```bash
cd pangisha-smarthouse
```
- If you already cloned you can move to the next step.
---

## 2. My team mates
## a. git checkout main
## b. git pull origin main
- This will enable you to have the latest code.


# 🚀 Backend Setup

Navigate to the backend folder.

```bash
cd server
```

Create a virtual environment.


Install dependencies.
```bash
pipenv install
```
- This is if your using pipenv

```bash
pip install -r requirements.txt
```
- This is if your using pip

## Create a `.env` file.
- Create your secret key and the rest: 

## 1. SECRET_KEY=your_secret_key

## Install postgres
```bash
sudo apt install postgresql postgresql-contrib
```
- Follow the steps, then after creating the password use the DATABASE_URL below: 

## 2. DATABASE_URL=postgresql://username:password@localhost/pangisha_db

## 3. JWT_SECRET_KEY=your_jwt_secret


## 4. I have used a platform called cloudinary for images, so create an account for free, then follow the steps.
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


## Database Migrations
- After finishing setting up the backend, don't forget to run the migrations:
## 1. flask db migrate -m ""
## 2. flask db upgrade

## Seed the database is optional
```bash
python seed.py
```

## Run the backend server
```bash
python3 app.py
```
The backend will start on

```
http://127.0.0.1:5555
```

---



#  Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

The frontend will start on

```
http://localhost:5173
```

---


# 🔐 Authentication

After logging in successfully, the backend returns a JWT token.

Store the token in localStorage.

```javascript
localStorage.setItem("token", token);
```

Axios automatically attaches the token to protected requests.

---

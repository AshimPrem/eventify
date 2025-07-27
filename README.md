
# Eventify - Event Management System 🎯  
**Fullstack Project using Django (backend) + React (frontend)**

This is a fullstack project with Django as the backend (REST API) and React as the frontend (UI). The project is organized into two main folders:

```

project-root/
├── backend/    # Django backend
│   ├── core/
│   └── eventify/
├── frontend/   # React frontend

````

---

## 🏁 Getting Started

### 📦 Requirements

- Python 3.8+
- Node.js (v14 or later)
- npm or yarn
- Git

---

## 📥 Clone the Repository

```bash
git clone https://github.com/AshimPrem/eventify.git
cd eventify
````

> Replace `your-username` with your actual GitHub username or organization.

---

## ⚙️ Backend Setup (Django)

### 1. Navigate to the backend directory

```bash
cd backend
```

### 2. Create a virtual environment

```bash
python -m venv env
```

### 3. Activate the virtual environment

* **Windows**:

  ```bash
  env\Scripts\activate
  ```

* **macOS/Linux**:

  ```bash
  source env/bin/activate
  ```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

> If `requirements.txt` doesn't exist, install manually:

```bash
pip install django djangorestframework django-cors-headers
```

### 5. Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create a superuser (for admin login)

```bash
python manage.py createsuperuser
```

> 📌 This will allow you to log in at [http://localhost:8000/admin](http://localhost:8000/admin)

### 7. Run the Django development server

```bash
python manage.py runserver
```

---

## 💻 Frontend Setup (React)

### 1. Navigate to the frontend directory

```bash
cd ../frontend
```

### 2. Install React dependencies

```bash
npm install
```

### 3. Start the React development server

```bash
npm start
```

---

## 🔄 Connecting React with Django (CORS Setup)

In Django `settings.py`:

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOW_ALL_ORIGINS = True  # For development only
```

In React (`frontend/package.json`):

```json
"proxy": "http://localhost:8000"
```

---

## 📁 Folder Structure

```
backend/
├── env/                   # Virtual environment (not committed)
├── core/                  # Django app
├── eventify/              # Django project
└── manage.py

frontend/
├── node_modules/          # React dependencies (not committed)
├── public/
├── src/
└── package.json
```

---

## 🚫 .gitignore Highlights

* Ignores `env/`, `node_modules/`, and all Django migration files.
* Keeps `__init__.py` in migrations folder to avoid import errors.

---

## 🧪 Development Tips

* Always activate your virtual environment before working on the backend.
* Use `npm start` for frontend live reloading.
* Use `python manage.py runserver` for backend API serving.
* To access Django admin panel, visit `http://localhost:8000/admin` after creating a superuser.
* For REST API testing, use tools like Postman or the built-in Django browsable API.

---

# WellAware Platform 🛢️

A full-stack dashboard application designed to simulate and manage oil well operations. This platform is tailored for industrial applications such as those used by oilfield services companies (e.g. NOV Inc.), combining operational simulation with crew and maintenance management tools.

---

## 🧰 Features (Current Scope)

### ✅ Well Simulation

- Integrates with the `WellAware-Sim` API to simulate oil wells in real-time.
- Supports **creating** and **deleting** simulated wells from the frontend/backend.

### ✅ Crew Management

- View all registered crew members.
- Add new crew members with name, role, contact info, and assigned well.
- Admin-only route for deleting crew members (secured via JWT).

### ✅ Maintenance Logs

- Track service and inspection logs for specific wells.
- Logs include description, who performed the work, and a timestamp.
- Admin-only route for deleting logs (JWT protected).

### ✅ Authentication & Role-Based Access

- User registration and login with hashed passwords.
- JWT token-based authentication using `Flask-JWT-Extended`.
- **Admin role** grants elevated privileges (e.g., delete operations).
- Tokens must be attached as a Bearer token in the `Authorization` header.

---

## 📦 Tech Stack

| Layer       | Technology                      |
| ----------- | ------------------------------- |
| Backend     | Flask + SQLAlchemy              |
| Auth        | Flask-JWT-Extended              |
| Database    | PostgreSQL (via SQLAlchemy ORM) |
| Frontend    | [To Be Integrated]              |
| API Testing | Postman                         |
| Deployment  | Localhost dev (WSGI pending)    |

---

## 🔐 Security Model

| Route                          | Access        |
| ------------------------------ | ------------- |
| `POST /api/auth/register`      | Public        |
| `POST /api/auth/login`         | Public        |
| `GET /api/crew`                | Public        |
| `POST /api/crew`               | Authenticated |
| `DELETE /api/crew/<id>`        | Admin Only    |
| `GET /api/maintenance`         | Public        |
| `POST /api/maintenance`        | Authenticated |
| `DELETE /api/maintenance/<id>` | Admin Only    |

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/yourusername/wellaware-platform.git
cd wellaware-platform/backend
python -m venv venv
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

### 2. Set Environment Variable

```bash
$env:FLASK_APP = "run.py"
```

### 3. Run the Backend

```bash
flask shell  # Optional: for database setup
>>> from app import db
>>> db.create_all()
>>> exit()

python run.py
```

---

## 📬 Testing Auth in Postman

1. **Register a new user**

   - POST to `/api/auth/register` with JSON body:
     ```json
     {
       "username": "admin",
       "password": "secret123",
       "role": "admin"
     }
     ```

2. **Login and receive token**
   - POST to `/api/auth/login`
   - Copy token and attach to `Authorization` tab as:
     ```
     Type: Bearer Token
     Token: <your-jwt-token>
     ```

---

## 🗺️ Roadmap

- 🔄 Frontend dashboard (React or Next.js)
- 📊 Real-time data charts for simulated wells
- 🔒 Token refresh + logout flow
- 🧑‍🔧 Maintenance types & categories
- 🧾 Export logs to CSV

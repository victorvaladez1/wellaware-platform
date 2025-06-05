# WellAware Platform 🛢️

A full-stack dashboard application for simulating and managing oil well operations. Designed with industrial applications in mind (e.g., for companies like NOV Inc.), this platform combines simulated telemetry data, crew management, and maintenance tracking.

---

## 🧰 Features

### ✅ Well Simulation & Management

- View all simulated wells and their real-time data.
- Create, edit, and delete wells (admin-only).
- Drill into individual well pages to view:
  - Location, name, and status
  - Live telemetry readings (pressure, temperature, output)
  - Active alerts (e.g., overpressure)

### ✅ Maintenance Logs

- Add and view maintenance logs per well.
- Logs include timestamp, description, performer, and associated well.
- Admins can delete logs.

### ✅ Crew Management

- Add and view crew members.
- Includes name, role, contact info, and assigned well.
- Admins can delete crew members.

### ✅ Authentication & Role-Based Access

- Login and JWT authentication.
- Role-based privileges (admin vs user).
- Admin routes protected both on frontend and backend.

---

## 🖥️ Frontend Routes (React)

| Route              | Description                     |
| ------------------ | ------------------------------- |
| `/`                | Login page                      |
| `/dashboard`       | Summary dashboard (after login) |
| `/wells`           | Browse all wells                |
| `/well/:id`        | Detailed view of a single well  |
| `/wells/new`       | Add a new well (admin only)     |
| `/well/:id/edit`   | Edit existing well (admin only) |
| `/maintenance`     | View all maintenance logs       |
| `/add-maintenance` | Add a new maintenance log       |

---

## 📦 Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Backend     | Flask + SQLAlchemy                 |
| Frontend    | React + Axios                      |
| Auth        | Flask-JWT-Extended                 |
| Database    | PostgreSQL (via SQLAlchemy ORM)    |
| Styling     | Plain CSS (extensible to Tailwind) |
| API Testing | Postman                            |
| Deployment  | Localhost (dev)                    |

---

## 🔐 Security Model

| Endpoint                      | Access        |
| ----------------------------- | ------------- |
| `POST /api/auth/register`     | Public        |
| `POST /api/auth/login`        | Public        |
| `GET /api/crew`               | Public        |
| `POST /api/crew`              | Authenticated |
| `DELETE /api/crew/:id`        | Admin only    |
| `GET /api/maintenance`        | Public        |
| `POST /api/maintenance`       | Authenticated |
| `DELETE /api/maintenance/:id` | Admin only    |
| `GET /api/sim/wells`          | Public        |
| `POST /api/sim/wells`         | Admin only    |
| `PUT /api/sim/wells/:id`      | Admin only    |
| `DELETE /api/sim/wells/:id`   | Admin only    |
| `GET /api/sim/readings`       | Public        |
| `GET /api/sim/alerts`         | Public        |
| `GET /api/sim/alert-log`      | Public        |

---

## 🚀 Getting Started

### 1. Clone & Set Up Backend

```bash
git clone https://github.com/yourusername/wellaware-platform.git
cd wellaware-platform/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Set Environment Variable

```bash
$env:FLASK_APP = "run.py"
```

### 3. Initialize DB and Run Server

```bash
flask shell
>>> from app import db
>>> db.create_all()
>>> exit()

python run.py
```

### 4. Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## 📬 Testing Auth with Postman

1. **Register User**

```json
POST /api/auth/register
{
  "username": "admin",
  "password": "admin123",
  "role": "admin"
}
```

2. **Login and Use JWT**

```text
POST /api/auth/login

Attach token as:
Authorization: Bearer <your-jwt-token>
```

---

## 🗺️ Roadmap

- 📊 Graph visualizations for pressure/output trends
- 🌐 Deploy on Fly.io or Render
- 🔄 JWT refresh tokens
- 🧾 Export maintenance logs as CSV
- 🧠 AI-based alert recommendation engine (future)

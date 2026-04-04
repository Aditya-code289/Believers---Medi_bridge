
# 🏥 Believers — Medi Bridge

A full-stack MERN healthcare platform that integrates **WHO ICD-11 disease classification**, **traditional medicine systems** (Ayurveda, Unani, Siddha), **AI-powered clinical summaries**, **OTP-based email verification**, and **patient audit management** — all in one unified system.

---

## 📁 Project Structure

```
Believers---Medi_bridge/
├── Backend/
│   ├── src/
│   │   ├── controller/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── model/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── AuditHistory.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Signin.jsx
│   │   ├── VerifyOTP.jsx
│   │   └── PatientHistory.jsx
│   ├── .env
│   └── package.json
└── README.md
```

---

## 🛠 Tech Stack

### 🔷 Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first CSS styling |
| **Axios** | HTTP requests to backend |
| **React Router DOM 7** | Client-side routing |

### 🔶 Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express 5** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Access & refresh token authentication |
| **Nodemailer** | OTP email verification |
| **Bcrypt** | Password hashing |
| **Puppeteer** | Headless browser automation |
| **Morgan** | HTTP request logger |
| **Nodemon** | Auto-restart dev server |

### 🗄 Database
| Technology | Purpose |
|---|---|
| **MongoDB Atlas** | Cloud-hosted database |
| **Mongoose ODM** | Schema modeling & validation |

### 🌐 External APIs
| API | Purpose |
|---|---|
| **WHO ICD-11 API** | Disease classification & search |
| **Groq API** | AI-powered clinical summaries |
| **Google OAuth2** | Gmail SMTP for email OTP |

---

## 📦 All Packages

### Backend `package.json`
```json
{
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.4.0",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.3.3",
    "morgan": "^1.10.1",
    "nodemailer": "^8.0.4",
    "nodemon": "^3.1.14",
    "puppeteer": "^24.40.0"
  }
}
```

### Frontend `package.json`
```json
{
  "dependencies": {
    "axios": "^1.14.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^7.13.2"
  },
  "devDependencies": {
    "@tailwindcss/container-queries": "^0.1.1",
    "@tailwindcss/forms": "^0.5.9",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "vite": "^8.0.3"
  }
}
```

---

## ⚙️ Environment Variables

### Backend `.env`
Create a `.env` file inside the `Backend/` folder:

```env
# Server
PORT=9000

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# WHO ICD-11 API
CLIENTID=your_who_client_id
CLIENTSECRET=your_who_client_secret
TOKENENDPOINT=https://icdaccessmanagement.who.int/connect/token
SCOPE=icdapi_access
GRANT=client_credentials
ICDENDPOINT=https://id.who.int/icd/entity
ENDPOINTICD=https://id.who.int/icd/release/11/2026-01/mms

# Google OAuth2 (for Nodemailer)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_USER=your_gmail_address

# Groq API
GROKAPIKEY=your_groq_api_key
```

### Frontend `.env`
Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:9000
```

> ⚠️ **Never commit your `.env` files to GitHub. They are already listed in `.gitignore`.**

---

## 🚀 Getting Started — Run Locally

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) **v20.19+**
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Aditya-code289/Believers---Medi_bridge.git
cd Believers---Medi_bridge
```

---

### Step 2 — Setup Backend

```bash
# Navigate to Backend
cd Backend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Now fill in your actual values in the .env file

# Start the backend server
npm run dev
```

Backend will run at: **http://localhost:9000**

---

### Step 3 — Setup Frontend

Open a **new terminal** and run:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Add VITE_API_URL=http://localhost:9000

# Start the frontend dev server
npm run dev
```

Frontend will run at: **http://localhost:5173**

---

### Step 4 — Open in Browser

```
http://localhost:5173
```

---

## 📜 Available Scripts

### Backend
```bash
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start with node (production)
npm run build    # Skips build (no build step for Node backend)
```

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint checks
```

---

## 🔐 Authentication Flow

```
Register → Email OTP Verification → Login → Access Token + Refresh Token
```

- Passwords are hashed using **bcrypt**
- OTP is sent via **Nodemailer + Google OAuth2**
- Sessions managed using **JWT access tokens** (short-lived) + **refresh tokens** (long-lived)
- Tokens stored in **HTTP-only cookies**

---

## 🌍 Deployment

This project is deployed on **Railway**.

> Make sure to add all environment variables in Railway's **Variables** tab before deploying.

Also ensure your `package.json` files have:
```json
"engines": {
  "node": ">=20.19.0"
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Authors

**Team Believers** — Building bridges between modern medicine and traditional healing systems.

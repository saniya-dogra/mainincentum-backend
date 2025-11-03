/*const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const csurf = require("csurf");
require("dotenv").config();
const { connectToDatabase } = require("./src/db/index.js");

// Routers
const userRouter = require("./src/routes/user.router");
const formRouter = require("./src/routes/individualForm.router");
const { verifyAdminJWT } = require("./src/middleware/adminAuth.middleware");

const app = express();
const port = process.env.PORT || 8080;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: "Too many requests from this IP, please try again later.",
});

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", process.env.VITE_API_URL || "http://localhost:5173"],
      },
    },
  })
);
app.use(
  cors({
    origin: [process.env.VITE_API_URL || "http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
    credentials: true, // Required for cookies to be sent
    exposedHeaders: ["Set-Cookie", "X-CSRF-Token"],
  })
);
app.use(limiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser(process.env.COOKIE_SECRET || "default-secret"));
app.use("/uploads", express.static("uploads", {
  setHeaders: (res) => {
    res.set("X-Content-Type-Options", "nosniff");
  },
}));

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      return res.redirect(301, `https://${req.header("host")}${req.url}`);
    }
    next();
  });
}

// CSRF Protection (selective application)
const csrfProtection = csurf({
  cookie: {
    key: "_csrf",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  secret: process.env.CSRF_SECRET,
});
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Routes
app.use("/api/users", userRouter); // User routes (no CSRF here)
app.use("/api/form", formRouter); // Form routes (no CSRF for file uploads)
app.use(process.env.ADMIN_ROUTE_SECRET || "/api/admin", verifyAdminJWT, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Error Handling for CSRF
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }
  // General error handler
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Connect to Database
connectToDatabase();
55555555555
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});*/




// index.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const { connectToDatabase } = require("./src/db/index.js");

// Routers
const userRouter = require("./src/routes/user.router.js");
const formRouter = require("./src/routes/individualForm.router.js");
const { verifyAdminJWT } = require("./src/middleware/adminAuth.middleware");

const app = express();
const port = process.env.PORT || 8080;

// ✅ Log environment check
console.log("🔍 Starting server...");
console.log("📦 NODE_ENV:", process.env.NODE_ENV);
console.log("🔗 MONGO_URI:", process.env.MONGO_URI ? "Loaded ✅" : "❌ Not found!");

// ✅ Trust Render proxy
app.set("trust proxy", 1);

// ✅ Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "https://incentump.zetawa.com",
      "https://mainincentum-frontend.onrender.com",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// ✅ Body parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser(process.env.COOKIE_SECRET || "default-secret"));

// ✅ Static files
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res) => res.set("X-Content-Type-Options", "nosniff"),
  })
);

// ✅ HTTPS redirect in production
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      return res.redirect(301, `https://${req.header("host")}${req.url}`);
    }
    next();
  });
}

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ Backend is running and healthy!");
});

// ✅ API routes
app.use("/api/users", userRouter);
app.use("/api/form", formRouter);

// ✅ Admin route (example)
app.use(
  process.env.VITE_ADMIN_ROUTE_SECRET || "/api/admin",
  verifyAdminJWT,
  (req, res) => res.json({ message: "Welcome Admin" })
);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error Handler:", err.stack || err);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ✅ Connect to MongoDB
(async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("Missing MONGO_URI environment variable!");
    }

    await connectToDatabase(mongoURI);
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
  }

  // ✅ Start server only once
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
})();

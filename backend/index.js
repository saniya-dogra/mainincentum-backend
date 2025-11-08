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
// index.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// If connectToDatabase is exported as named or default, we handle both
let connectToDatabase;
try {
  const dbModule = require("./src/db/index.js");
  connectToDatabase = dbModule.connectToDatabase || dbModule.default || dbModule;
} catch (err) {
  console.error("❌ Could not require ./src/db/index.js —", err.message);
  // leave connectToDatabase undefined; we'll catch it later
}

const userRouter = require("./src/routes/user.router.js");
const formRouter = require("./src/routes/individualForm.router.js");
const { verifyAdminJWT } = require("./src/middleware/adminAuth.middleware");

const app = express();

// Ensure NODE_ENV default for local dev
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const port = Number(process.env.PORT) || 8080;

// ✅ Log environment check
console.log("🔍 Starting server...");
console.log("📦 NODE_ENV:", process.env.NODE_ENV);
console.log("🔗 MONGO_URI:", process.env.MONGO_URI ? "Loaded ✅" : "❌ Not found!");

// ✅ Trust proxy if behind one (Render)
app.set("trust proxy", 1);

// ✅ Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ✅ CORS setup - allow origins from env or fallback to sensible defaults
const allowedOrigins = [
  "https://incentump.zetawa.com",
  "https://mainincentum-frontend.onrender.com",
  "http://localhost:5173",
];
const corsOriginEnv = process.env.CORS_ORIGIN || process.env.VITE_FRONTEND_URL;
const corsOptions = {
  origin: corsOriginEnv ? [corsOriginEnv, ...allowedOrigins] : allowedOrigins,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Security headers
app.use(helmet({ contentSecurityPolicy: false }));

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

// Robust global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error Handler:", err.stack || err);

  const status =
    typeof err.statusCode === "number" && err.statusCode >= 100 && err.statusCode < 600
      ? err.statusCode
      : 500;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
  });
});

// Start app AFTER database connection attempt (keeps logs clear)
(async () => {
  try {
    if (!connectToDatabase) {
      throw new Error("connectToDatabase function not found - check src/db/index.js export");
    }

    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("Missing MONGO_URI environment variable!");
    }

    await connectToDatabase(mongoURI);
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err && err.message ? err.message : err);
    // For safety we still start the server (so health check works), but warn in logs
    console.warn("⚠️ Starting server despite DB connection failure — endpoints using DB will fail.");
  }

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
})();

// Useful crash handlers for production visibility
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // optionally process.exit(1); // keep running for now to see logs
});

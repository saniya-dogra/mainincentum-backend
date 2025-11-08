/*const { Router } = require("express");
const { registerUser, loginUser, logoutUser, profile, logoutAdmin } = require("../controllers/user.controller");
const { verifyAdminJWT } = require("../middleware/adminAuth.middleware");
const csurf = require("csurf");

// Assuming verifyJWT exists or will be created
const { verifyJWT } = require("../middleware/auth.middleware"); // Add this line

const router = Router();
const csrfProtection = csurf({ cookie: true });

// User routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser); // Add verifyJWT here
router.route("/profile").get(verifyJWT, profile); // Optional: protect profile too

// Admin routes
router.route("/admin-logout").post(verifyAdminJWT, csrfProtection, logoutAdmin);

module.exports = router;*/



// Modified 

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  profile,
  logoutAdmin
} = require("../controllers/user.controller");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", profile);

// Logout routes
router.post("/logout", logoutUser);
router.post("/admin/logout", logoutAdmin);

module.exports = router;

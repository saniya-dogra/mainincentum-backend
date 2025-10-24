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





const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  profile,
  logoutAdmin,
} = require("../controllers/user.controller");
const { verifyAdminJWT } = require("../middleware/adminAuth.middleware");
const { verifyJWT } = require("../middleware/auth.middleware");
const csurf = require("csurf");

const router = Router();
const csrfProtection = csurf({ cookie: true });

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.get("/profile", verifyJWT, profile);

// Admin route
router.post("/admin-logout", verifyAdminJWT, csrfProtection, logoutAdmin);

module.exports = router;


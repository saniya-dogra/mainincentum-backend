const { Router } = require('express');
const { loginUser, logoutUser, profile, registerUser,  } = require('../controllers/user.controller.js');
const { verifyJWT } = require('../middleware/auth.middleware.js');


const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/profile").get(profile);

module.exports = router;

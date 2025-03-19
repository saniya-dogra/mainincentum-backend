const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// Hardcoded admin credentials (to be replaced later with DB if needed)
const ADMIN_CREDENTIALS = [
  { phoneNumber: "9854867952", password: "Harshit@123" },
  { phoneNumber: "8593147206", password: "Natesh@123" },
];

const verifyAdminJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.adminToken ||
    (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);

  console.log("Verifying adminToken from cookies:", token); // Keep your debug log

  if (!token) {
    if (typeof ApiError === "function") {
      throw new ApiError(401, "Unauthorized: Admin token not found.");
    } else {
      console.error("ApiError is not a constructor, falling back to plain error");
      return res.status(401).json({ message: "Unauthorized: Admin token not found." });
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
    const admin = ADMIN_CREDENTIALS.find(
      (cred) => cred.phoneNumber === decoded.phoneNumber
    );
    if (!admin) {
      if (typeof ApiError === "function") {
        throw new ApiError(403, "Forbidden: Not an authorized admin.");
      } else {
        console.error("ApiError is not a constructor, falling back to plain error");
        return res.status(403).json({ message: "Forbidden: Not an authorized admin." });
      }
    }
    req.admin = admin; // Attach admin info to request
    next();
  } catch (error) {
    console.error("Admin JWT verification error:", error.message);
    if (error.name === "TokenExpiredError") {
      if (typeof ApiError === "function") {
        throw new ApiError(401, "Unauthorized: Admin token expired.");
      } else {
        console.error("ApiError is not a constructor, falling back to plain error");
        return res.status(401).json({ message: "Unauthorized: Admin token expired." });
      }
    } else if (error.name === "JsonWebTokenError") {
      if (typeof ApiError === "function") {
        throw new ApiError(401, "Unauthorized: Invalid admin token.");
      } else {
        console.error("ApiError is not a constructor, falling back to plain error");
        return res.status(401).json({ message: "Unauthorized: Invalid admin token." });
      }
    }
    if (typeof ApiError === "function") {
      throw new ApiError(401, "Unauthorized: Admin token verification failed.");
    } else {
      console.error("ApiError is not a constructor, falling back to plain error");
      return res.status(401).json({ message: "Unauthorized: Admin token verification failed." });
    }
  }
});

module.exports = { verifyAdminJWT };
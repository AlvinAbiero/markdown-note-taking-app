const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach user to the request object
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      req.status(401).json({
        success: false,
        error: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      error: "Not authorized, no token provided",
    });
  }
};

module.exports = { protect };

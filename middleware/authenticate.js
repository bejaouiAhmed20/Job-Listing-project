const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Access the token from cookies

  if (!token) {
    return res.status(401).json({ error: "Access denied: No token provided." });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }
    req.user = decoded; // Attach user info to the request object
    next();
  });
};

module.exports = authenticateToken;

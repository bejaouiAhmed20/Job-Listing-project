const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    req.companyId = decoded.companyId; // Attach companyId to the request
    next();
  } catch (err) {
    console.error(err);
    res.status(403).send("Forbidden: Invalid token");
  }
};

module.exports = authenticateToken;

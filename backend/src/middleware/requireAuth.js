const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const token = req.cookies?.sessionToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = requireAuth;

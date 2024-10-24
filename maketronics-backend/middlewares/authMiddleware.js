import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.WEBTOKEN_KEY); // Verify token
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Invalid token.' });
  }
};

import jwt from 'jsonwebtoken';

export function auth(req, res, next) {
  // Implement authentication logic 
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send({ success: false, message: 'Access denied. No token provided.' });
  // Verify the token
  try {
    const decoded = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: 'Invalid token' });
  }
}

//this middlware allows only registered users to modify data
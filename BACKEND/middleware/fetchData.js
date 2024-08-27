const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // your json token signature

const fetchData = (req, res, next) => {
    // Extract the token from the Authorization header
    let token = req.headers['auth-token'] || req.headers['authorization'];
 
    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    // If the token is prefixed with "Bearer", remove that prefix
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); // Remove "Bearer " from token
    }

    // Verify the token
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; // Attach user info to request object
        next(); // Call the next middleware or route handler
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: 'Invalid token' }); // Return a 403 status for invalid token
    }
};

module.exports = fetchData;

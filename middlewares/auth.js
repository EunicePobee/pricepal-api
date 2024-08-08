import jwt from "jsonwebtoken";


export const checkAuth = (req, res, next) => {
    // Check if token has a user
    if (req.headers.authorization) {
        try {
            // Extract token from headers 
            const token = req.headers.authorization.split(' ')[1];
            // console.log(token);
            // Verify the token to get the user and append the user to the request
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            // Call next function
            next();
        } catch (error) {
            return res.status(401).json({error: 'Token Expired'});
        }
    } else {
        res.status(401).json({ error: 'User not authenticated' })
    }
}
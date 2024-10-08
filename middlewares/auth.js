import jwt from "jsonwebtoken";
import { roles } from "../config/roles.js";
import { UserModel } from "../models/user_model.js";
import cookieParser from "cookie-parser";


// export const checkAuth = (req, res, next) => {
//     // Check if token has a user
//     if (req.headers.authorization) {
//         try {
//             // Extract token from headers 
//             const token = req.headers.authorization.split(' ')[1];
//             // const tokens = req.cookies.token
//             // console.log('Tokens', tokens);
//             // Verify the token to get the user and append the user to the request
//             req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
//             // Call next function
//             next();
//         } catch (error) {
//             return res.status(401).json({error: 'Token Expired'});
//         }
//     } else {
//         res.status(401).json({ error: 'User not authenticated' })
//     }
// }


// Verify token middleware
export const checkAuth = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Token', token)
    if (!token) return res.redirect('/login');
    req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if (err) return res.redirect('/login');
      req.user = decoded;
      next();
    });
  };



export const hasPermission = (permission) => {
    return async (req, res, next) => {
        try {
            // Get user id from request
            const id = req?.user?.id;
            // Find user by id
            const user = await UserModel.findById(id);
            // Find user role with permissions
            const userRole = roles.find(element => element.role === user.role);
            console.log(userRole)
            // Use role to check if user has permission
            if (userRole && userRole.permissions.includes(permission)) {
                next();
            } else {
                res.status(403).json('Not Authorized!');
            }
        } catch (error) {
            next(error);
        }
    }
}
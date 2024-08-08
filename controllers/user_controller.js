import { UserModel } from "../models/user_model.js";
import { userSchema } from "../schemas/user_schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



// Function for sign up
// export const signup = async (req, res) => {

//     try {
//         // Validate the data provided by the user
//         const { error, value } = userSchema.validate(req.body)
//         if (error) {
//             return res.status(400).send(error.details[0].message)
//         }

//         const email = value.email

//         const findIfUserExists = await UserModel.findOne({ email });
//         if (findIfUserExists) {
//             return res.status(401).send('User has already signed up')
//         } else {
//             // Encrypt user password
//             const hashedPassword =  bcrypt.hashSync(value.password, 12);
//             value.password = hashedPassword;
//             // Create user
//              await UserModel.create(value)
//             // Generate a session for the user
//             req.session.user = { id: addUser.id }
//             return res.status(201).send('Account created successfully')
//         }
//     } catch (error) {
//         // next(error)
//     }

// }

export const signup = async (req, res) => {
    try {
        console.log('Received signup request:', req.body);

        // Validate the data provided by the user
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            console.error('Validation Error:', error.details[0].message);
            return res.status(400).send(error.details[0].message);
        }

        const email = value.email;
        console.log('Validation successful. Checking if user exists with email:', email);

        const findIfUserExist = await UserModel.findOne({ email });
        console.log('findIfUserExist result:', findIfUserExist);

        if (findIfUserExist) {
            console.log('User already exists:', findIfUserExist);
            return res.status(401).send("User has already signed up");
        } else {
            console.log('User does not exist, creating new user');
            // Encrypt user password
            const hashedPassword = await bcrypt.hash(value.password, 12);
            value.password = hashedPassword;
            delete value.confirmPassword; // Remove confirmPassword from the value object

            // Create user
            const newUser = await UserModel.create(value);
            console.log('New user created:', newUser);

            return res.status(201).json({ message: "Registration successful" });
        }
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).send('Internal Server Error');
    }
};



// Function for token log in
export const tokenLogin = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        
        // Find a user using their userName or email
        const user = await UserModel.findOne({
            $or: [
                { email: email },
                { userName: userName }
            ]
        });
        if (!user) {
            return  res.status(401).json('User not found');
        } else {
            // Verify their password
            const correctPassword = bcrypt.compareSync(password, user.password);
            if (!correctPassword) {
                return res.status(401).json('Invalid login credentials');
            } else {
                // Create a token for the user
                const token = jwt.sign({ id: user.id},
                     process.env.JWT_PRIVATE_KEY,
                    { expiresIn: '72h' }
                    );
                // Return response
                return  res.status(200).json({
                    message: 'User logged in',
                    accessToken: token,
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userName: user.userName
                    }
                });
            }
        }
    } catch (error) {
        next(error)
    }
}



// Function to get everything about one user
export const getUser = async (req, res,next) => {
    try {
        const userName = req.params.userName.toLowerCase();
        const options = { sort: {startDate: -1 }}
        // Get user details
        const getUserDetails = await UserModel
            .findOne({userName})
            .select({password: false })
            .populate({path: 'userProfile', options})
            .populate({path: 'education', options})
            .populate({path: 'experience', options})
            .populate({path: 'skills', options})
            .populate({path: 'achievements', options: { sort: { date: -1 }}})
            .populate({path: 'projects', options})
            .populate({path: 'volunteering', options});
        // Return response
        return res.status(200).json({user: getUserDetails})
    } catch (error) {
        next(error)
        console.log(error)
    }
}


// Function to get all users to cross-check if a username already exists
export const getUsers = async (req, res) => {
    try {
        // Extract email and userName from query parameters to convert to lower case
        const email = req.query.email?.toLowerCase()
        const userName = req.query.userName?.toLowerCase();

        // Initialise the filter object
        const filter = {};
        if (email) {
            filter.email = email;
        }
        if (userName) {
            filter.userName = userName;
        }
        // Find users based on the filter
        const users = await UserModel.find(filter);
        // Return response
        return res.status(200).json({ users });
    } catch (error) {
        // next(error)
    }
}



// Function to update a user account
export const patchUser = async (req, res) => {
    try {
        // Update user by id
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return  res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error)
    }
}



// Function to log out
export const logout = async (req, res) => {
    try {
        // Destroy user session
        await req.session.destroy();
        // Return response
        return res.status(200).json('Logout successful');
    } catch (error) {
        console.log(error)
    }
};

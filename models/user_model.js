import { Schema, Types, model } from "mongoose";


const userSchema = new Schema({
        firstName: { type: String },
        lastName: { type: String },
        otherNames: { type: String },
        email: { type: String, lowercase: true, unique: true },
        userName: { type: String, lowercase: true, unique: true },
        password: { type: String },
        confirmPassword: { type: String },
        termsAndConditions: { type: Boolean },
        role: {type: String, default: 'user', enum: ['admin', 'user']},
        userProfile: {type: Types.ObjectId, ref: 'UserProfile'}
    }, {
        timestamps: true
    });
export const UserModel = model('User', userSchema)
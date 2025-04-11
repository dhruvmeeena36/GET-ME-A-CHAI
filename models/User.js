//The User.js model is used to store user information in the database.

//It ensures each user has a unique identity through email and username.
//It stores profile details like profile picture and cover picture.
//It keeps Razorpay credentials, allowing users to receive payments.

// Importing mongoose to define the schema and model
import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Defining the User schema (structure of user data)
const UserSchema = new Schema({
    // User's full name (optional)
    name: {
        type: String,
    },

    // Email field (must be unique and required)
    email: {
        type: String,
        unique: true, // Ensures no duplicate emails
        required: true // Email is mandatory
    },

    // Unique username for the user (required)
    username: {
        type: String,
        unique: true, // Each user must have a unique username
        required: true
    },

    // Profile picture URL (optional)
    profilpicture: {
        type: String,
    },

    // Cover picture URL (optional)
    coverpicture: {
        type: String,
    },

    // Razorpay account ID (for receiving payments)
    razorpayid: {
        type: String,
    },

    // Razorpay secret key (for authentication)
    razorpaySecret: {
        type: String,
    }

}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Exporting the User model, preventing duplicate model creation
export default mongoose.models.User || model("User", UserSchema);
//mongoose.models.User checks if the User model has already been created.
//If the model already exists, it reuses it instead of creating a new one.
//Creates the Model If It Doesn't Exist:
//If mongoose.models.User does not exist, mongoose.model("User", UserSchema) creates the model using the schema.

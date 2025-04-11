// Importing mongoose to define the schema and model
import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Defining the Payment schema (structure of payment data)
const PaymentSchema = new Schema({
    // Name of the person making the payment
    name: {
        type: String,
        required: true // This field is mandatory
    },

    // The recipient (username of the creator receiving the payment)
    to_user: {
        type: String,
        required: true
    },

    // Order ID generated by Razorpay for tracking payments
    oid: {
        type: String,
        required: true
    },

    // Optional message from the supporter
    message: {
        type: String,
    },

    // The donation/payment amount
    amount: {
        type: Number,
        required: true
    },

    // Flag to check if payment is completed (default is false)
    done: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Exporting the Payment model, preventing duplicate model creation
export default mongoose.models.Payment || model("Payment", PaymentSchema);

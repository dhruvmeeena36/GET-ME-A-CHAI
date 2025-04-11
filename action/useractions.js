"use server"; // Specifies that this code runs on the server-side

// Import necessary modules
import Razorpay from "razorpay";
import Payment from "@/models/Payment.model";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

// Function to initiate a payment transaction using Razorpay
export const initiate = async (amount, to_username, paymentform) => {
  await connectDB(); // Connect to the database

  // Find the user receiving the payment
  const user = await User.findOne({ username: to_username });
  const secret = user?.razorpaySecret; //Fetches Razorpay API credentials (razorpaySecret, razorpayid).
  const id = user?.razorpayid;

  // Create a new Razorpay instance
  var instance = new Razorpay({ key_id: id, key_secret: secret });

  // Define the order options
  const options = {
    amount: Number.parseInt(amount), // Amount in paise
    currency: "INR",
  };

  // Create an order in Razorpay
  let x = await instance.orders.create(options);

  // Store the pending payment details in the database
  await Payment.create({
    oid: x.id,
    amount: amount / 100, // Convert paise to INR
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });

  return x; // Return the created order details
};

// Function to fetch user details
export const fetchUser = async (username) => {
  await connectDB(); // Connect to the database

  let u = await User.findOne({ username: username }); //Finds the user by username (User.findOne({ username })).
  if (u) {
    let user = u.toObject({ flatternObjectIds: true });
    return JSON.stringify(user); // Convert user object to JSON string
  }
  
  return JSON.stringify({ error: "User not found" });
};




// Function to fetch successful payments for a specific user
export const fetchPayments = async (username) => {
  await connectDB(); // Connect to the database

  let p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 }) // Sorts the payments in descending order (sort({ amount: -1 })) to show the highest donations first.
    // .limit(2) // Limit the number of results (optional)
    .lean(true); // Convert to plain JavaScript object

  return JSON.stringify(p);
};




// Function to update user profile
export const updateProfile = async (data, oldUsername) => {
  await connectDB(); // Connect to the database

  const oldEmail = await User.findOne({ username: oldUsername }); //oldUsername means current username
  /*{ oldEmail
  "username": "dhruvmeena",
  "email": "dhruvmeena@gmail.com",
  "profilepicture": "https://example.com/profile.jpg",
  "razorpayid": "rzp_test_12345"
}*/

  let newData = Object.fromEntries(data); // Converts the submitted form data into a JavaScript object.
  /*✅ After Conversion (newData)
{
  "username": "dhruvmeena23",
  "profilepicture": "https://example.com/new-profile.jpg"
}*/

  // If the username is being changed, check if the new username already exists
  if (oldUsername !== newData.username) {
    let u = await User.findOne({ username: newData.username }); // new user naam ka username pahale se nhi hai data base mai so,

    if (u) {
      return JSON.stringify({ message: "Username already exists" });
    }

    // Update the user's profile with the new username
    let updatedProfile = await User.findOneAndUpdate(  //User.findOneAndUpdate() finds a user in the database and updates their details.
      { email: oldEmail.email }, // // Find user by email (which remains unchanged)
      { ...newData, email: oldEmail.email }, //Updates only the provided fields in newData (Razorpay ID, username, etc.).
      { new: true } // Return the updated document
    );
      /*{
  "username": "dhruvmeena23",
  "profilepicture": "https://example.com/new-profile.jpg"
}*/

    // If profile update is successful, update associated payment records
    if (updatedProfile) {
      await Payment.updateMany(
        { to_user: oldUsername },{ to_user: newData.username },  //OLDUSERNAME WALE AB NEW USERNAME SE SAVE HONGE
        { new: true }
      );
    }
    /*[ AFTER UPDATE 
  { "to_user": "dhruvmeena23", "amount": 500 },
  { "to_user": "dhruvmeena23", "amount": 200 }
]
*/

    return JSON.stringify({
      message: "Profile Updated Successfully",
      data: updatedProfile,
    });
  }

  // If username is not changing, just update the user profile
  let updatedProfile = await User.findOneAndUpdate(
    { email: oldEmail.email },
    { ...newData, email: oldEmail.email }, //NEW DATA WALE MAI USERNAME SAME HI HOGA NA
    { new: true }
  ); /*{
    "username": "dhruvmeena",
    "profilepicture": "https://example.com/new-profile.jpg"
  }*/

  return JSON.stringify({
    message: "Profile Updated Successfully",
    data: updatedProfile,
  });
};

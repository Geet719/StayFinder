import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
  type: String,
  default: "",
},

   
    listings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Listing",
    },
    bookings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Booking",
    },
}, { timestamps: true });



const User = mongoose.model("User", UserSchema);
export default User;
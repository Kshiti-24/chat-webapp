import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    fullName: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    phoneNumber: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String, default: "Hey there! I am using this app." },
    location: { type: String, default: "" },
    currentStatus: {
      type: String,
      enum: ["online", "offline", "away"],
      default: "online",
    },
    lastActive: { type: Date, default: Date.now },
    additionalInfo: { type: mongoose.Schema.Types.Mixed, default: {} },
    socialLinks: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Username is required for creating a user"], unique: true },
    email: {
        type: String, required: [true, "Email is required for creating a user"], unique: [true, "Email is already in use"], trim: true, lowercase: true, match: [
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please provide a valid email address",
        ],
    },
    password: { type: String, required: [true, "Password is required for creating a user"], minlength: [8, "Password must be at least 8 characters long"], select:false },
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;
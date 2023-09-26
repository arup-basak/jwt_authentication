import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    user: String,
    password: String,
    name: {
        type: String,
        required: false
    },
    createdAt: { type: Date, default: Date.now },
}, {timestamps: true});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const userModel = model('User', userSchema);

export default userModel;
import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        select: false,
    },
    roles: [String],
});
const QuoteSchema = new Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    author: { type: String, required: true },
    tags: [String],
    createdAt: {
        type: Date,
        default: new Date(),
    },
    userID: { type: Schema.Types.ObjectId, ref: 'users' },
    username: String,
});
export const User = model('users', UserSchema);
export const Quote = model('quotes', QuoteSchema);

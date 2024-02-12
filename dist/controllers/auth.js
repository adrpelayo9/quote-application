import jwt from 'jsonwebtoken';
import env from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from '../models/models.js';
env.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const login = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username: username }).select('+password');
        if (!user) {
            console.log('Invalid Username.');
            return res.status(401).json({ error: 'Invalid Username.' });
        }
        if (!user.password) {
            console.log('Error with Username or Password.');
            return res
                .status(401)
                .json({ error: 'Error with Username or Password.' });
        }
        const passwordValid = await bcrypt.compare(req.body.password, user.password);
        if (!passwordValid) {
            console.log('Invalid Password.');
            return res.status(401).json({ error: 'Invalid Password.' });
        }
        const isAdmin = user.roles.includes('ADMIN');
        const token = jwt.sign({ id: user._id, username: user.username, roles: user.roles }, JWT_SECRET, {
            expiresIn: '6h',
        });
        res.status(200).json({ token, isAdmin });
    }
    catch (error) {
        console.log('Internal error logging in:', error);
        res.status(500).json({ error: 'Internal error logging in.' });
    }
};
export const register = async (req, res) => {
    const user = req.body;
    const saltRounds = 10;
    const existingUser = await User.findOne({
        username: user.username,
    });
    if (existingUser) {
        console.log('Username already exists. Please choose a different one.');
        return res.status(400).json({
            error: 'Username already exists. Please choose a different one.',
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json({ newUser });
    }
    catch (error) {
        console.log('Internal error registering new User:', error);
        res.status(500).json({ error: 'Internal error registering new User.' });
    }
};

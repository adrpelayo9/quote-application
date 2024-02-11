import { User, Quote } from '../models/models.js';
import mongoose from 'mongoose';
export const getUsers = async (req, res) => {
    const users = await User.find();
    if (!users) {
        console.log('No Users.');
        return res.status(400).json({ error: 'No Users.' });
    }
    res.json(users);
};
export const updateUser = async (req, res) => {
    const userId = req.user.id;
    const username = req.body.username;
    if (!mongoose.isValidObjectId(userId) || !userId) {
        console.log('Invalid ID.');
        return res.status(400).json({ error: 'Invalid ID.' });
    }
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            console.log('This User does not exist.');
            return res.status(404).json({ error: 'This User does not exist.' });
        }
        if (user.username === username) {
            console.log('This is the same Username. Please enter a new Username.');
            return res.status(400).json({
                error: 'This is the same Username. Please enter a new Username.',
            });
        }
        if (username && username !== user.username) {
            const existingUser = await User.findOne({
                username: username,
            });
            if (existingUser) {
                console.log('Username already exists. Please choose a different one.');
                return res.status(400).json({
                    error: 'Username already exists. Please choose a different one.',
                });
            }
            user.username = username;
            await Quote.updateMany({ userID: user._id }, { $set: { username: username } });
        }
        await user.save();
        res.status(200).json(username);
    }
    catch (error) {
        console.log('Internal error updating User:', error);
        res.status(500).json({ error: 'Internal error with updating User.' });
    }
};
export const deleteUser = async (req, res) => {
    const user = req.params.user;
    try {
        const deletingUser = await User.findOne({ username: user });
        if (!deletingUser) {
            console.log('This User does not exist.');
            return res
                .status(404)
                .json({ error: 'This User does not exist.' });
        }
        if (deletingUser.roles.includes('ADMIN')) {
            console.log('You cannot delete an ADMIN account.');
            return res.status(400).json({ error: 'You cannot delete an ADMIN account.' });
        }
        await Quote.updateMany({ userID: deletingUser._id }, { $set: { username: '(Deleted User)' } });
        await User.deleteOne({ username: user });
        res.status(200).json({ message: 'User was deleted.' });
    }
    catch (error) {
        console.log('Internal error deleting User:', error);
        res.status(500).json({ error: 'Internal error deleting User.' });
    }
};
export const adminDeleteUser = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.isValidObjectId(userId) || !userId) {
        console.log('Invalid ID.');
        return res.status(400).json({ error: 'Invalid ID.' });
    }
    try {
        const deletingUser = await User.findOne({ _id: userId });
        if (!deletingUser) {
            console.log('This User does not exist.');
            return res
                .status(404)
                .json({ error: 'This User does not exist.' });
        }
        if (deletingUser.roles.includes('ADMIN')) {
            console.log('You cannot delete an ADMIN account.');
            return res.status(400).json({ error: 'You cannot delete an ADMIN account.' });
        }
        await Quote.updateMany({ userID: deletingUser._id }, { $set: { username: '(Deleted User)' } });
        await User.deleteOne({ _id: userId });
        res.status(200).json({ message: 'User was deleted.' });
    }
    catch (error) {
        console.log('Internal error deleting User:', error);
        res.status(500).json({ error: 'Internal error deleting User.' });
    }
};

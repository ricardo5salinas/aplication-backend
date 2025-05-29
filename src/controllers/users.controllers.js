import { findAllUsers, createUser, updateUser, deleteUser } from '../models/users.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await findAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const postUsers = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const putUsers = async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.user_id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteUsers = async (req, res) => {
    try {
        const deletedUser = await deleteUser(req.params.user_id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

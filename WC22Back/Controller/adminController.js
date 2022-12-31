const poolconnection = require('../Repositories/user');

module.exports = {
    approveUser: async (req, res) => {
        try {
            const user = await poolconnection.approveUser(req.user.userName);
            res.status(200).json({ user: user });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ "error": err.detail });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await poolconnection.deleteUser(req.user.userName);
            res.status(200).json({ user: user });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ "error": err.detail });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await poolconnection.getAllUsers();
            res.status(200).json({ users: users });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ "error": err.detail });
        }
    }
}
const router = require('express').Router();
const userModel = require('./user-model');
const middleware = require('../auth/auth-middleware');

router.get('/', middleware.tokenCheck, async (req, res, next) => {
    try {
        let users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
})

router.get('/:user_id', middleware.tokenCheck, async (req, res, next) => {
    try {
        let user = await userModel.getUsersById(req.params.user_id);
        res.json(user);
    } catch (error) {
        next(error);
    }
})

router.put('/:user_id', middleware.tokenCheck, middleware.payloadCheck, middleware.usernameCheck, middleware.roleNameCheck,async (req, res, next) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            res.status(400).json({ message: 'Girdiğiniz bilgiler eksik' });
        } else {
            const newUser = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.encPassword,
            }

            let willBeUpdatedUser = await userModel.updateUser(newUser, req.params.user_id);
            res.json(willBeUpdatedUser);
        }
    } catch (error) {
        next(error);
    }
})

router.delete('/:user_id', middleware.tokenCheck, middleware.roleNameCheck, async (req, res, next) => {
    try {
        let willBeDeletedUser = await userModel.deleteUser(req.params.user_id);
        res.json(willBeDeletedUser);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
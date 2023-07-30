const router = require('express').Router();
const md = require('./auth-middleware');
const userModel = require('../user/user-model');

const { JWT_SECRET } = require('../secret/index');
const jwt = require('jsonwebtoken');

 
router.post('/register', md.payloadCheck, md.usernameCheck, md.emailCheck, md.emailValidation, async (req, res, next) => {
    try {
        const {name, email} = req.body;
        if(!name || !email) {
            res.status(400).json({ message: 'Girdiğiniz bilgiler eksik' });
        } else {
            const newUser = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.encPassword,
                role_id: 2
            }
            let willBeInsertedUser = await userModel.insertUser(newUser)
            res.status(201).json(willBeInsertedUser);
        }
    } catch (error) {
        next(error);
    }
})

router.post('/login', md.payloadCheck, md.passwordCheck, async (req, res, next) => {
    try {
        console.log(req.user);
        console.log(req.user.role_id);
        let token = jwt.sign({
            subject: req.user.user_id,
            username: req.user.username,
            role_name: req.user.role_id
        }, JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({
            message: `Hoşgeldin ${req.user.username}`,
            token: token
        });
        console.log(`Hoşgeldin ${req.user.username}`)
    } catch (error) {
        next(error);
    }
})

module.exports = router;
const userModel = require('../user/user-model');

const { JWT_SECRET } = require('../secret/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const payloadCheck = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Girdiğiniz bilgiler eksiktir!' })
        } else {
            req.encPassword = await bcrypt.hash(password, 8)
            next();
        }
    } catch (error) {
        next(error)
    }
}

const usernameCheck = async (req, res, next) => {
    try {
        const { username } = req.body;
        let isUsernameExist = await userModel.getUsersByFilter({ username: username });
        if (isUsernameExist) {
            res.status(401).json({ message: 'Bu kullanıcı adı zaten kullanılıyor!' })
        } else {
            next()
        }
    } catch (error) {
        next(error);
    }
}

const passwordCheck = async (req, res, next) => {
    try {
        let user = await userModel.getUsersByFilter({ username: req.body.username });
        console.log(user);
        console.log(JWT_SECRET)
        if (!user) {
            res.status(401).json({ message: 'Girdiğiniz bilgiler yanlıştır!' })
        } else {
            let isPasswordTrue = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordTrue) {
                res.status(401).json({ message: 'Girdiğiniz bilgiler yanlıştır' })
            } else {
                req.user = user;
                console.log(user)
                next();
            }
        }
    } catch (error) {
        next(error);
    }
}

const tokenCheck = async (req, res, next) => {
    try {
        let header = req.headers["authorization"];
        if (!header) {
            res.status(401).json({ message: 'Token bulunamadı' });
        } else {
            const jwtvr = jwt.verify(header, JWT_SECRET, (err, decode) => {
                if (err) {
                    res.status(401).json({ message: "Token geçersizdir" });
                } else {
                    console.log("decoded token yazıldığı yer",decode)
                    req.decodeToken = decode;
                    next()
                }
            })
        }
    } catch (error) {
        next(error);
    }
}


const emailValidation = async (req, res, next) => {
    try {
        const emailCheck = req.body.email.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

        if (!emailCheck) {
            res.status(400).json({ message: 'Lütfen geçerli bir email adresi giriniz' });
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}


const emailCheck = async (req, res, next) => {
    try {
        const { email } = req.body;
        let isEmailExist = await userModel.getUsersByFilter({ email: email });
        if (isEmailExist) {
            res.status(401).json({ message: 'Bu email adresi zaten kullanılıyor' });
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

const roleNameCheck = async (req, res, next) => {
    try {
        console.log(req.decodeToken)
        console.log(req.decodeToken.subject)
        console.log(JSON.parse(req.params.user_id))


        if (req.decodeToken.role_name !== 1 && req.decodeToken.subject !== JSON.parse(req.params.user_id)) {
            res.status(403).json({ message: 'Bu işlemi gerçekleştiremezsiniz'})
        } else {
            next()
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    payloadCheck,
    usernameCheck,
    passwordCheck,
    tokenCheck,
    emailValidation,
    emailCheck,
    roleNameCheck
}
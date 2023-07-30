const favsModel = require('./favs-model');

const userNameCheckForDeleteFavs = async (req, res, next) => {
    try {
        let favs = await favsModel.getFavsById(req.params.favs_id);
        console.log("uid",favs.user_id);
        console.log("tokenuid", req.decodeToken.subject);

        if (req.decodeToken.subject !== favs.user_id) {
            res.status(403).json({ message: 'Bu işlemi gerçekleştiremezsiniz' })
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

const userNameCheckForAddFavs = async (req, res, next) => {
    try {

        console.log(typeof req.body.user_id);
        console.log(typeof req.decodeToken.subject);


        if (req.decodeToken.subject !== req.body.user_id) {
            res.status(403).json({ message: 'Bu işlemi gerçekleştiremezsiniz'})
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

const userNameCheckForFetchingByUsername = async (req, res, next) => {
    try {

        console.log("****", JSON.parse(req.params.user_id));
        console.log("***", req.decodeToken.subject);


        if (req.decodeToken.subject !== JSON.parse(req.params.user_id)) {
            res.status(403).json({ message: 'Bu işlemi gerçekleştiremezsiniz'})
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    userNameCheckForDeleteFavs,
    userNameCheckForAddFavs,
    userNameCheckForFetchingByUsername
}
const router = require('express').Router();
const favsModel = require('./favs-model');
const md = require('./favs-middleware');
const mdAuth = require('../auth/auth-middleware')



router.get('/', async (req, res, next) => {
    try {
        let favs = await favsModel.getAllFavs()
        res.json(favs)
    } catch (error) {
        next(error);
    }
})

router.get('/:favs_id', async (req, res, next) => {
    try {
        let fav = await favsModel.getFavsById(req.params.favs_id);
        res.json(fav);
    } catch (error) {
        next(error)
    }
})

router.get('/user/:user_id', mdAuth.tokenCheck, md.userNameCheckForFetchingByUsername, async (req, res, next) => {
    try {
        let fav = await favsModel.getFavsByUsername(req.params.user_id);
        res.json(fav);
    } catch (error) {
        next(error)
    }
})

router.post("/", mdAuth.tokenCheck, md.userNameCheckForAddFavs, async (req, res, next) => {
    try {
        const {type, type_id, user_id} = req.body;
        if(!type && !type_id && !user_id) {
            res.status(400).json({ message: 'Girdiğiniz bilgiler eksik amk' });
        } else {
            const newFav = {
                type: type,
                type_id: type_id,
                user_id: user_id
            }

            let willBeInsertedFav = await favsModel.insertFav(newFav);
            res.status(201).json(willBeInsertedFav);
        }
    } catch (error) {
        next(error)
    }
})

router.delete('/:favs_id', mdAuth.tokenCheck, md.userNameCheckForDeleteFavs, async(req, res, next) => {
    try {
        await favsModel.deleteFav(req.params.favs_id);
        res.json({message: 'Favorilerden başarıyla kaldırıldı'})
    } catch (error) {
        next(error);
    }
})

module.exports = router;
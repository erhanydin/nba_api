const router = require('express').Router();
const nbaModel = require('./nba-model');


router.get('/gen/:id', async (req, res, next) => {
    try {
        let games = await nbaModel.getGamesById(req.params.id);
        res.json(games)
    } catch (error) {
        next(error);
    }
})

router.get('/:seriesId', async (req, res, next) => {
    try {
        let games = await nbaModel.getGames(req.params.seriesId);
        res.json(games)
    } catch (error) {
        next(error);
    }
})

router.get('/:seriesId/:gameId', async (req, res, next) => {
    try {
        let game = await nbaModel.getGamesBySeriesIdAndGameId(req.params.seriesId, req.params.gameId);
        res.json(game);
    } catch (error) {
        next(error);
    }
})


module.exports = router;
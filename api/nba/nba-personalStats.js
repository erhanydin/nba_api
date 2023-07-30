const router = require('express').Router();
const nbaModel = require('./nba-model');

router.get('/:seriesId/:gameId', async (req, res, next) => {
    try {
        let stat = await nbaModel.getPersonalStatsBySeriesIdAndGameId(req.params.seriesId, req.params.gameId);
        res.json(stat);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
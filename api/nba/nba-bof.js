const router = require('express').Router();
const nbaModel = require('./nba-model');

router.get('/:seriesId', async (req, res, next) => {
    try {
        let bests = await nbaModel.bestOfSeries(req.params.seriesId);
        res.json(bests)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
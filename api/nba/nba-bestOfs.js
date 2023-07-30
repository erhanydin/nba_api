const router = require('express').Router();
const nbaModel = require('./nba-model');

router.get('/:vary', async (req, res, next) => {
    try {
        let bests = await nbaModel.leads(req.params.vary);
        res.json(bests)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
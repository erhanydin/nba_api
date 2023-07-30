const router = require('express').Router();
const newsModel = require('./news-model');
const middleware = require('./news-middleware');

router.get('/', async (req, res, next) => {
    console.log(req.decodeToken)
    try {
        let news = await newsModel.getAllNews();
        res.json(news);
    } catch (error) {
        next(error);
    }
})

router.get('/:newsId', async (req, res, next) => {
    try {
        let news = await newsModel.getNewsById(req.params.newsId);
        res.json(news);
    } catch (error) {
        next(error);
    }
})

router.get('/team/:teamId', async (req, res, next) => {
    try {
        let news = await newsModel.getNewsByTeam(req.params.teamId);
        res.json(news);
    } catch (error) {
        next(error);
    }
})

router.post('/', middleware.roleNameCheckForNews, middleware.payloadCheckForNews, async (req, res, next) => {
    try {
        const { newsHeader_1, newsHeader_2, newsHeader_3, newsDetails, newsImage, teamId } = req.body;

        const instertedNews = {
            newsHeader_1: newsHeader_1,
            newsHeader_2: newsHeader_2,
            newsHeader_3: newsHeader_3,
            newsDetails: newsDetails,
            newsImage: newsImage,
            teamId: teamId,
            role_id: 1
        }

        let willBeInsertedNews = await newsModel.insertNews(instertedNews);
        res.status(201).json(willBeInsertedNews);

    } catch (error) {
        next(error);
    }
})

router.put('/:newsId', middleware.roleNameCheckForNews, middleware.payloadCheckForNews, async (req, res, next) => {
    try {
        const { newsHeader_1, newsHeader_2, newsHeader_3, newsDetails, newsImage, teamId } = req.body;

        const updatedNews = {
            newsHeader_1: newsHeader_1,
            newsHeader_2: newsHeader_2,
            newsHeader_3: newsHeader_3,
            newsDetails: newsDetails,
            newsImage: newsImage,
            teamId: teamId,
            role_id: 2
        }

        let willBeUpdatedNews = await newsModel.updateNews(updatedNews, req.params.newsId);
        res.json(willBeUpdatedNews);
    } catch (error) {
        next(error);
    }
})

router.delete('/:newsId', middleware.roleNameCheckForNews, async (req, res, next) => {
    try {
        let willBeDeletedNews = await newsModel.deleteNews(req.params.newsId);
        res.json(willBeDeletedNews);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
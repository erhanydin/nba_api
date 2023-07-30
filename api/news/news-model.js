const db = require('../../data/db-config');

async function getAllNews() {
    const allNews = await db('news')
    return allNews; 
}

async function getNewsById(newsId) {
    const news = await db('news').where('newsId', newsId);
    return news;
}

async function getNewsByTeam(teamId) {
    const news = await db('news').where('teamId', teamId);
    return news;
}

async function insertNews(news) {
    const [willBeInsertedNewsId] = await db('news').insert(news);
    return await getNewsById(willBeInsertedNewsId);
}

async function updateNews(news, newsId) {
    await db('news').where('newsId', newsId).update(news);
    return await getNewsById(newsId);
}

async function deleteNews(newsId) {
    return await db('news').where('newsId', newsId).delete();
}

module.exports = {
    getAllNews,
    getNewsById,
    getNewsByTeam,
    insertNews,
    updateNews,
    deleteNews
}

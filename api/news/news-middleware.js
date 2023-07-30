
const payloadCheckForNews = async (req, res, next) => {
    try {
        const { newsHeader_1, newsHeader_2, newsHeader_3, newsDetails, newsImage, teamId } = req.body;

        if (!newsHeader_1 || !newsHeader_2 || !newsDetails || !newsImage || !teamId) {
            res.status(400).json({ message: 'Girdiğiniz bilgiler eksik' });
        } else {
            next()
        }
    } catch (error) {
        next(error);
    }
}

const roleNameCheckForNews = async (req, res, next) => {
    try {
        console.log(req.decodeToken);
        if (req.decodeToken.role_name !== 1) {
            res.status(403).json({ message: 'Bu işlemi gerçekleştiremezsiniz' });
        } else {
            next()
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    payloadCheckForNews,
    roleNameCheckForNews
}
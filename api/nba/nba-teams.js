const router = require('express').Router();
const nbaModel = require('./nba-model');

router.get('/', async (req, res, next) => {
    try {
        let allTeams = await nbaModel.getTeams();
        res.json(allTeams);
    } catch (error) {
        next(error);
    }
})

router.get("/:teamId", async (req, res, next) => {
    try {
        let team = await nbaModel.getTeamsById(req.params.teamId);
        res.json(team);
    } catch (error) {
        next(error);
    }
})

router.get("/", async (req, res, next) => {
    try {
        const { teamName } = req.body;
        console.log(teamName)
        let team = await nbaModel.getTeamsByName(teamName)
        res.json(team);
    } catch (error) {
        next(error);
    }
})

router.put("/:teamId", async (req, res, next) => {
    try {
        const { teamName, teamWins, teamLoss, teamPointMade, teamPointSaw, teamAv,
            teamHomeWins, teamHomeLosses, teamHomePointsMade, teamHomePointsSaw,
            teamAwayWins, teamAwayLosses, teamAwayPointsMade, teamAwayPointsSaw, teamLogo } = req.body;

        const team = {
            teamName: teamName,
            teamWins: teamWins === null ? 0 : teamWins,
            teamLoss: teamLoss === null ? 0 : teamLoss,
            teamPointMade: teamPointMade === null ? 0 : teamPointMade,
            teamPointSaw: teamPointSaw === null ? 0 : teamPointSaw,
            teamAv: teamAv === null ? 0 : teamAv,
            teamHomeWins: teamHomeWins === null ? 0 : teamHomeWins,
            teamHomeLosses: teamHomeLosses === null ? 0 : teamHomeLosses,
            teamHomePointsMade: teamHomePointsMade === null ? 0 : teamHomePointsMade,
            teamHomePointsSaw: teamHomePointsSaw === null ? 0 : teamHomePointsSaw,
            teamAwayWins: teamAwayWins === null ? 0 : teamAwayWins,
            teamAwayLosses: teamAwayLosses === null ? 0 : teamAwayLosses,
            teamAwayPointsMade: teamAwayPointsMade === null ? 0 : teamAwayPointsMade,
            teamAwayPointsSaw: teamAwayPointsSaw === null ? 0 : teamAwayPointsSaw,
            teamLogo: teamLogo
        }

        let willBeUpdatedTeam = await nbaModel.updateTeam(team, req.params.teamId);
        res.json(willBeUpdatedTeam);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
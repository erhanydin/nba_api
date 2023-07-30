const router = require('express').Router();
const nbaModel = require('./nba-model');


router.get('/', async (req, res, next) => {
    try {
        let allPlayers = await nbaModel.getPlayers();
        res.json(allPlayers)
    } catch (error) {
        next(error)
    }
});

router.get("/:playerId", async (req, res, next) => {
    try {
        let player = await nbaModel.getPlayersById(req.params.playerId);
        res.json(player)
    } catch (error) {
        next(error)
    }
})

router.get("/team/:teamId", async (req, res, next) => {
    try {
        let playersByTeams = await nbaModel.getPlayersByTeams(req.params.teamId);
        res.json(playersByTeams);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { playerName, playerAge, playerCountry, playerGame, playerGmp, playerGpt,
            playerRb, playerAst, playerStl, playerBlk, playerTo, player2PtsPerc, player3PtsPerc,
            playerFtPtsPerc, teamName } = req.body;

        if (!playerName || playerAge || playerCountry) {
            res.status(400).json({ message: 'Girdiğiniz bilgiler eksik!' })
        } else {
            let teamId = await nbaModel.getTeamsByName(teamName)

            const newPlayer = {
                playerName: playerName,
                playerName: playerAge,
                playerCountry: playerCountry,
                playerGame: playerGame === null ? 0 : playerGame,
                playerGmp: playerGmp === null ? 0 : playerGmp,
                playerGpt: playerGpt === null ? 0 : playerGpt,
                playerRb: playerRb === null ? 0 : playerRb,
                playerAst: playerAst === null ? 0 : playerAst,
                playerStl: playerStl === null ? 0 : playerStl,
                playerBlk: playerBlk === null ? 0 : playerBlk,
                playerTo: playerTo === null ? 0 : playerTo,
                player2PtsPerc: player2PtsPerc === null ? 0 : player2PtsPerc,
                player3PtsPerc: player3PtsPerc === null ? 0 : player3PtsPerc,
                playerFtPtsPerc: playerFtPtsPerc === null ? 0 : playerFtPtsPerc,
                teamId: teamId
            }

            let willBeInsertedPlayer = await nbaModel.insertPlayer(newPlayer);
            res.status(201).json(willBeInsertedPlayer);
        }
    } catch (error) {
        next(error);
    }
})

router.put('/:playerId', async (req, res, next) => {
    try {
        const { playerName, playerAge, playerCountry, playerGame, playerGmp, playerGpt,
            playerRb, playerAst, playerStl, playerBlk, playerTo, player2PtsPerc, player3PtsPerc,
            playerFtPtsPerc, teamName } = req.body;

        let teamId = await nbaModel.getTeamsByName(teamName)

        const newPlayer = {
            playerName: playerName,
            playerName: playerAge,
            playerCountry: playerCountry,
            playerGame: playerGame === null ? 0 : playerGame,
            playerGmp: playerGmp === null ? 0 : playerGmp,
            playerGpt: playerGpt === null ? 0 : playerGpt,
            playerRb: playerRb === null ? 0 : playerRb,
            playerAst: playerAst === null ? 0 : playerAst,
            playerStl: playerStl === null ? 0 : playerStl,
            playerBlk: playerBlk === null ? 0 : playerBlk,
            playerTo: playerTo === null ? 0 : playerTo,
            player2PtsPerc: player2PtsPerc === null ? 0 : player2PtsPerc,
            player3PtsPerc: player3PtsPerc === null ? 0 : player3PtsPerc,
            playerFtPtsPerc: playerFtPtsPerc === null ? 0 : playerFtPtsPerc,
            teamId: teamId
        }

        let willBeUpdatedPlayer = await nbaModel.updatePlayer(newPlayer, req.params.playerId);
        res.json(willBeUpdatedPlayer);

    } catch (error) {
        next(error);
    }
})

module.exports = router;

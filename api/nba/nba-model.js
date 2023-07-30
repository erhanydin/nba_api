const db = require('../../data/db-config');
const knex = require('knex');


//teams part

async function getTeams() {
    const allTeams = await db('teams')
    return allTeams;
}

async function getTeamsById(teamId) {
    const team = await db('teams').where('teamId', teamId).first();
    return team;
}

async function getTeamsByName(teamName) {
    const team = await db('teams').select('teamName, teamId').where('teamName', teamName)
    return team;
}

async function updateTeam(team, teamId) {
    await db('users').where('teamId', teamId).update(team)
    return await getTeamsById(teamId);
}

//players part

async function getPlayers() {
    const allPlayers = await db('players')
    return allPlayers
}

async function getPlayersById(playerId) {
    const player = await db('players').where('playerId', playerId);
    return player;
}

async function updatePlayer(player, playerId) {
    await db('players'.where('playerId', playerId)).update(player);
    return await getPlayersById();
}

async function insertPlayer(player) {
    const [willBeInsertedPlayerId] = await db('players').insert(player);
    return await getPlayersById(willBeInsertedPlayerId);
}

async function getPlayersByTeams(teamId) {
    const player = await db('players').where('teamId', teamId)
    return player;
}

async function getGames(seriesId) {
    const games = await db('games')
        .innerJoin('teams', 'games.firstTeamId', 'teams.teamId')
        .leftJoin('teams as teams_1', 'games.secondTeamId', 'teams_1.teamId')
        .select('games.id', 'games.seriesId', 'games.gameId', 'games.firstTeamId', 'teams.teamName as firstTeamName', 'teams.teamLogo as firstTeamLogo', 'games.firstTeamScore',
            'games.secondTeamId', 'games.secondTeamScore', 'teams_1.teamName as secondTeamName', 'teams_1.teamLogo as secondTeamLogo')
        .where('games.seriesId', seriesId)
    return games;
}

async function getGamesBySeriesIdAndGameId(seriesId, gameId) {
    const game = await db('games')
        .innerJoin('teams', 'games.firstTeamId', 'teams.teamId')
        .leftJoin('teams as teams_1', 'games.secondTeamId', 'teams_1.teamId')
        .select('games.id', 'games.seriesId', 'games.gameId', 'games.firstTeamId', 'teams.teamName as firstTeamName', 'teams.teamLogo as firstTeamLogo', 'games.firstTeamScore',
            'games.secondTeamId', 'games.secondTeamScore', 'teams_1.teamName as secondTeamName', 'teams_1.teamLogo as secondTeamLogo')
        .where('games.seriesId', seriesId).andWhere('gameId', gameId).first();

    return game;
}

async function getGeneralStatsBySeriesIdAndGameId(seriesId, gameId) {
    const generalStat = await db('generalStats')
        .innerJoin('teams', 'generalStats.firstTeamId', 'teams.teamId')
        .leftJoin('teams as teams_1', 'generalStats.secondTeamId', 'teams_1.teamId')
        .select('generalStats.*', 'teams.teamName as firstTeamName', 'teams_1.teamName as secondTeamName')
        .where('generalStats.seriesId', seriesId).andWhere('generalStats.gameId', gameId).first();

    return generalStat;
}

async function getPersonalStatsBySeriesIdAndGameId(seriesId, gameId) {
    const personalStat = await db('personalStats')
        .innerJoin('players', 'personalStats.playerId', 'players.playerId')
        .select('personalStats.*', 'players.playerName')
        .where('personalStats.seriesId', seriesId).andWhere('personalStats.gameId', gameId)
        .orderBy('personalStats.playerTime', 'desc')

    return personalStat
}

// Best Ofs

async function leads(variable) {
    const bests = await db('players')
            .innerJoin('teams', 'players.teamId', 'teams.teamId')
            .select('players.*', 'teams.teamName', 'teams.teamLogo')
            .where('players.playerGame', '>', '53')
            .orderBy(`players.${variable}`, 'desc')
            .limit(10)
    return bests;
}

module.exports = {
    getTeams,
    getTeamsById,
    getTeamsByName,
    updateTeam,
    getPlayers,
    getPlayersById,
    updatePlayer,
    insertPlayer,
    getGames,
    getPlayersByTeams,
    getGamesBySeriesIdAndGameId,
    getGeneralStatsBySeriesIdAndGameId,
    getPersonalStatsBySeriesIdAndGameId,
    leads
}

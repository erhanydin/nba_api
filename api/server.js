const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const md = require('./auth/auth-middleware');

const playerRouter = require('./nba/nba-players');
const teamsRouter = require('./nba/nba-teams');
const gamesRouter = require('./nba/nba-games');
const gstatsRouter = require('./nba/nba-generalStats');
const pstatsRouter = require('./nba/nba-personalStats');
const bestOfRouter = require('./nba/nba-bestOfs');
const bofRouter = require('./nba/nba-bof');

const authRouter = require('./auth/auth-router')
const userRouter = require('./user/user-router');
const newsRouter = require('./news/news-router');
const favsRouter = require('./favs/favs-router');
const notesRouter = require('./notes/notes-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/news', newsRouter);

server.use("/api/players", playerRouter);
server.use("/api/teams", teamsRouter);
server.use("/api/games", gamesRouter)
server.use("/api/general", gstatsRouter);
server.use('/api/personal', pstatsRouter);
server.use('/api/bests', bestOfRouter);
server.use('/api/bof', bofRouter);
server.use('/api/favs', favsRouter);
server.use('/api/notes', notesRouter)


// err md
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = server;

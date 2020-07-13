const express = require("express");

const db = require('../data/dbConfig')
const AccountsRouter = require('../accounts/accounts-router')

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Working' })
})

module.exports = server;

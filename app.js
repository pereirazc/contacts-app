const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const db = require('./models');

const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

db.sequelize.sync();

module.exports = app;
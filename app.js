const express = require('express');
const app = express();

const UserManager = require('./application/modules/UserManager/UserManager');

const userManager = new UserManager;

const Router = require('./application/routers/Router');
app.use(express.static('public'));
app.use(new Router({ userManager }));

app.listen(3001, () => console.log('Server is up'));
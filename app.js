const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const userManager = require('./application/modules/UserManager/UserManager');
const messageManager = require('./application/modules/messageManager/MessageManager');

const Router = require('./application/routers/Router');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(new Router({ userManager, messageManager }));

app.listen(3001, () => console.log('Server is up'));
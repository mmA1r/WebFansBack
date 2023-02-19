const express = require('express');
const app = express();

const UserManager = require('./application/modules/UserManager/UserManager');
const ChatManager = require('./application/modules/ChatManager/ChatManager');


const userManager = new UserManager;
const chatManager = new ChatManager;

const Router = require('./application/routers/Router');
app.use(express.static('public'));
app.use(new Router({ userManager, chatManager }));

app.listen(3001, () => console.log('Server is up'));
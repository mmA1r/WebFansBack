const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const CONFIG = require('./config');
const { PORT, MEDIATOR } = CONFIG;

const Mediator = require('./application/modules/Mediator');
const UserManager = require('./application/modules/UserManager/UserManager');
const ChatManager = require('./application/modules/chatManager/ChatManager');
const FileManager = require('./application/modules/fileManager/FileManager');

const mediator = new Mediator({ ...MEDIATOR });
const userManager = new UserManager({ mediator });
const chatManager = new ChatManager({ mediator });
const fileManager = new FileManager({ mediator });

const Router = require('./application/routers/Router');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(new Router({ mediator }));

app.listen(PORT, () => console.log('Server is up'));
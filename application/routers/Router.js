const express = require("express");
const router = express.Router();

const Answer = require('./Answer');
//user
const useRegistrationHandler = require('./handlers/userHandlers/useRegistrationHandler');
const useLoginHandler = require('./handlers/userHandlers/useLoginHandler');
const useLogoutHandler = require('./handlers/userHandlers/useLogoutHandler');
const getUserByTokenHandler = require('./handlers/userHandlers/getUserByTokenHandler');
//messanger
const getMessagesHandler = require('./handlers/chatHandlers/getMessagesHandler');
const sendPublicMessageHandler = require('./handlers/chatHandlers/sendPublicMessageHandler');
const sendPrivateMessageHandler = require('./handlers/chatHandlers/sendPrivateMessageHandler');

function Router({ mediator }) {
    const answer = new Answer;

    router.get('/api/check', (req, res) => res.send('checked'));
    /// USER ///
    router.get('/api/registration/:name/:login/:password', useRegistrationHandler(answer, mediator));
    router.get('/api/login/:login/:password', useLoginHandler(answer, mediator));
    router.get('/api/logout/:token', useLogoutHandler(answer, mediator));
    router.get('/api/getUserByToken/:token', getUserByTokenHandler(answer, mediator));
    /// Messanger ///
    router.get('/api/getMessages/:chatHash', getMessagesHandler(answer, mediator));
    router.post('/api/sendPublicMessage', sendPublicMessageHandler(answer, mediator));
    router.get('/api/sendPrivateMessage/:message/:senderId/:messageTraget', sendPrivateMessageHandler(answer, mediator));

    //router.all('/*', notFound);
    return router;
}

module.exports = Router;
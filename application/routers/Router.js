const express = require("express");
const router = express.Router();

const Answer = require('./Answer');
//user
const useRegistrationHandler = require('./handlers/userHandlers/useRegistrationHandler');
const useLoginHandler = require('./handlers/userHandlers/useLoginHandler');
const useLogoutHandler = require('./handlers/userHandlers/useLogoutHandler');
const getUserHandler = require('./handlers/userHandlers/getUserHandler');
//messanger
const getMessagesHandler = require('./handlers/messageHandlers/getMessagesHandler');
const sendGeneralMessageHandler = require('./handlers/messageHandlers/sendGeneralMessageHandler');
const sendPrivateMessageHandler = require('./handlers/messageHandlers/sendPrivateMessageHandler');

function Router({ userManager, messageManager }) {
    //console.log(userManager, messageManager);
    const answer = new Answer;

    router.get('/api/check', (req, res) => res.send('checked'));
    /// USER ///
    router.get('/api/registration/:name/:login/:password', useRegistrationHandler(answer, userManager));
    router.get('/api/login/:login/:password', useLoginHandler(answer, userManager));
    router.get('/api/logout/:token', useLogoutHandler(answer, userManager));
    router.get('/api/getUser/:token', getUserHandler(answer, userManager));
    /// Messanger ///
    router.get('/api/getMessages/:chatHash', getMessagesHandler(answer, messageManager));
    router.get('/api/sendGeneralMessage/:message/:senderId', sendGeneralMessageHandler(answer, messageManager));
    router.get('/api/sendPrivateMessage/:message/:senderId/:messageTraget', sendPrivateMessageHandler(answer, messageManager));
    //router.all('/*', notFound);
    return router;
}

module.exports = Router;
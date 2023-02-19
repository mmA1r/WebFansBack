const express = require("express");
const router = express.Router();

const Answer = require('./Answer');

const useRegistrationHandler = require('./handlers/userHandlers/useRegistrationHandler');
const useLoginHandler = require('./handlers/userHandlers/useLoginHandler');
const useLogoutHandler = require('./handlers/userHandlers/useLogoutHandler');
const useSendMessageHandler = require('./handlers/chatHandlers/useSendMessageHandler');



function Router({ userManager, chatManager }) {

    const answer = new Answer;

    router.get('/api/check', (req, res) => res.send('checked'));

    router.get('/api/registration/:name/:login/:password', useRegistrationHandler(answer, userManager));
    router.get('/api/login/:login/:password', useLoginHandler(answer, userManager));
    router.get('/api/logout/:token', useLogoutHandler(answer, userManager));
    router.get('/api/sendMessage/:message/messageTo', useSendMessageHandler(answer, chatManager),);


    //router.all('/*', notFound);
    return router;
}

module.exports = Router;
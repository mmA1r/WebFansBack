const express = require("express");
const router = express.Router();

const Answer = require('./Answer');

const useRegistrationHandler = require('./handlers/userHandlers/useRegistrationHandler');
const useLoginHandler = require('./handlers/userHandlers/useLoginHandler');
const useLogoutHandler = require('./handlers/userHandlers/useLogoutHandler');
const useNotFoundHandler = require('./handlers/userHandlers/useNotFoundPage');


function Router({ userManager }) {
    const answer = new Answer;

    router.get('/api/check', (req, res) => res.send('checked'));

    router.get('/api/registration/:name/:login/:password', useRegistrationHandler(answer, userManager));
    router.get('/api/login/:login/:password', useLoginHandler(answer, userManager));
    router.get('/api/logout/:token', useLogoutHandler(answer, userManager));

    router.all('/*', useNotFoundHandler);
    return router;
}

module.exports = Router;
const express = require("express");
const router = express.Router();

const Answer = require('./Answer');

const useRegistrationHandler = require('./handlers/userHandlers/useRegistrationHandler');
const useLoginHandler = require('./handlers/userHandlers/useLoginHandler');
const useLogoutHandler = require('./handlers/userHandlers/useLogoutHandler');

function Router({ userManager }) {
    const answer = new Answer;

    router.get('/api/check', () => console.log('checked'));

    router.get('/api/registration/:name/:login/:password', useRegistrationHandler(answer, userManager));
    router.get('/api/login/:login/:password/:token', useLoginHandler(answer, userManager));
    router.get('/api/logout/:token', useLogoutHandler(answer, userManager));

    //router.all('/*', notFound);
    return router;
}

module.exports = Router;
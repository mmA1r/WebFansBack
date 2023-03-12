const express = require("express");
const router = express.Router();

const Answer = require('./Answer');
//user
const useRegistrationHandler = require('./handlers/userHandlers/useRegistrationHandler');
const useLoginHandler = require('./handlers/userHandlers/useLoginHandler');
const useLogoutHandler = require('./handlers/userHandlers/useLogoutHandler');
const getUserByGuidHandler = require('./handlers/userHandlers/getUserByGuidHandler');
//messanger
const getMessagesHandler = require('./handlers/chatHandlers/getMessagesHandler');
const sendPublicMessageHandler = require('./handlers/chatHandlers/sendPublicMessageHandler');
const sendPrivateMessageHandler = require('./handlers/chatHandlers/sendPrivateMessageHandler');
//file
const uploadAvatar = require('./handlers/fileHandlers/storagePath/usersAvatarStorage');
const uploadCover = require('./handlers/fileHandlers/storagePath/usersCoverStorage');
const uploadFileHandler = require('./handlers/fileHandlers/uploadFileHandler');
const getFileHandler = require('./handlers/fileHandlers/getFileHandler');

function Router({ mediator }) {
    const answer = new Answer;

    router.get('/api/check', (req, res) => res.send('checked'));
    /// USER ///
    router.get('/api/registration/:name/:login/:password/:guid', useRegistrationHandler(answer, mediator));
    router.get('/api/login/:login/:password/:rndNum', useLoginHandler(answer, mediator));
    router.get('/api/logout/:tokenHash/:randomNumber/:guid', useLogoutHandler(answer, mediator));
    router.get('/api/getUserByGuid/:tokenHash/:randomNumber/:guid', getUserByGuidHandler(answer, mediator));
    /// Messanger ///
    router.get('/api/getMessages/:tokenHash/:randomNumber/:guid/:chatHash', getMessagesHandler(answer, mediator));
    router.post('/api/sendPublicMessage', sendPublicMessageHandler(answer, mediator));
    router.get('/api/sendPrivateMessage/:message/:senderId/:messageTraget', sendPrivateMessageHandler(answer, mediator));
    /// File ///
    router.post('/api/uploadAvatar', uploadAvatar.single('image'), uploadFileHandler(answer, mediator));
    router.post('/api/uploadCover', uploadCover.single('image'), uploadFileHandler(answer, mediator));
    router.post('/api/getImage', getFileHandler(answer, mediator));
    //router.all('/*', notFound);
    return router;
}

module.exports = Router;
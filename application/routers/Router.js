const express = require("express");
const router = express.Router();
const multer = require('multer');
const multerConfigAvatars = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/assets/userAvatars');
    },
    filename: (req, file, callback) => {
        const fileExtention = file.mimetype.split('/')[1];
        callback(null, `image-${Date.now()}.${fileExtention}`);
    }
});
const multerConfigCovers = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/assets/userCovers');
    },
    filename: (req, file, callback) => {
        const fileExtention = file.mimetype.split('/')[1];
        callback(null, `image-${Date.now()}.${fileExtention}`);
    }
});
const isImage = (req, file, callback) => {
    if(file.mimetype.startsWith('image')) {
        callback(null, true);
    }
}
const uploadAvatars = multer({
    storage: multerConfigAvatars,
    fileFilter: isImage
});
const uploadCovers = multer({
    storage: multerConfigCovers,
    fileFilter: isImage
});

const Answer = require('./Answer');
//user
const useRegistrationHandler = require('./handlers/userHandlers/useRegistrationHandler');
const useLoginHandler = require('./handlers/userHandlers/useLoginHandler');
const useLogoutHandler = require('./handlers/userHandlers/useLogoutHandler');
const getUserByGuidHandler = require('./handlers/userHandlers/getUserByGuidHandler');
const uploadUserImageHandler = require('./handlers/userHandlers/uploadUserImageHandler');
//messanger
const getMessagesHandler = require('./handlers/chatHandlers/getMessagesHandler');
const sendPublicMessageHandler = require('./handlers/chatHandlers/sendPublicMessageHandler');
const sendPrivateMessageHandler = require('./handlers/chatHandlers/sendPrivateMessageHandler');

const uploadAvatar = require('./handlers/userHandlers/uploadAvatar');
const uploadCover = require('./handlers/userHandlers/uploadCover');

function Router({ mediator }) {
    const answer = new Answer;

    router.get('/api/check', (req, res) => res.send('checked'));
    router.post('/api/uploadAvatar', uploadAvatars.single('image'), uploadAvatar(answer, mediator));
    router.post('/api/uploadCover', uploadCovers.single('image'), uploadCover(answer, mediator));
    /// USER ///
    router.get('/api/registration/:name/:login/:password/:guid', useRegistrationHandler(answer, mediator));
    router.get('/api/login/:login/:password/:rndNum', useLoginHandler(answer, mediator));
    router.get('/api/logout/:tokenHash/:randomNumber/:guid', useLogoutHandler(answer, mediator));
    router.get('/api/getUserByGuid/:tokenHash/:randomNumber/:guid', getUserByGuidHandler(answer, mediator));
    router.post('/api/uploadUserImage', uploadUserImageHandler(answer, mediator));
    /// Messanger ///
    router.get('/api/getMessages/:tokenHash/:randomNumber/:guid/:chatHash', getMessagesHandler(answer, mediator));
    router.post('/api/sendPublicMessage', sendPublicMessageHandler(answer, mediator));
    router.get('/api/sendPrivateMessage/:message/:senderId/:messageTraget', sendPrivateMessageHandler(answer, mediator));

    //router.all('/*', notFound);
    return router;
}

module.exports = Router;
class CONFIG {
    PORT = 3001;

    MEDIATOR = {
        EVENTS: {},
        TRIGGERS: {
            /**  users  **/
            USE_REGISTRATION_HANDLER: 'USE_REGISTRATION_HANDLER',
            USE_LOGOUT_HANDLER: 'USE_LOGOUT_HANDLER',
            USE_LOGIN_HANDLER: 'USE_LOGIN_HANDLER',
            GET_USER_BY_GUID_HANDLER: 'GET_USER_BY_GUID_HANDLER',
            UPLOAD_USER_IMAGE: 'UPLOAD_USER_IMAGE',
            /**  chat  **/
            GET_MESSAGES_HANDLER: 'GET_MESSAGES_HANDLER',
            SEND_PRIVATE_MESSAGE_HANDLER: 'SEND_PRIVATE_MESSAGE_HANDLER',
            SEND_PUBLIC_MESSAGE_HANDLER: 'SEND_PUBLIC_MESSAGE_HANDLER',
            /**  inner functions between managers  **/
            GET_FILTERED_REQ_DATA: 'GET_FILTERED_REQ_DATA',
        }
    }
}

module.exports = new CONFIG();
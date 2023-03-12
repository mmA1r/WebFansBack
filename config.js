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
            /**  chat  **/
            GET_MESSAGES_HANDLER: 'GET_MESSAGES_HANDLER',
            SEND_PRIVATE_MESSAGE_HANDLER: 'SEND_PRIVATE_MESSAGE_HANDLER',
            SEND_PUBLIC_MESSAGE_HANDLER: 'SEND_PUBLIC_MESSAGE_HANDLER',
            /**  files  **/
            RECORD_FILE_NAME_TO_USER: 'RECORD_FILE_NAME_TO_USER',
            /**  inner functions between managers  **/
            GET_FILTERED_REQ_DATA: 'GET_FILTERED_REQ_DATA',
        }
    }
}

module.exports = new CONFIG();
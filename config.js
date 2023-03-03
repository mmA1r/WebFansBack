class CONFIG {
    PORT = 3001;

    MEDIATOR = {
        EVENTS: {
            NEW_USER_ADDED: 'NEW_USER_ADDED'
        },
        TRIGGERS: {
            /**  users  **/
            USE_REGISTRATION_HANDLER: 'USE_REGISTRATION_HANDLER',
            USE_LOGOUT_HANDLER: 'USE_LOGOUT_HANDLER',
            USE_LOGIN_HANDLER: 'USE_LOGIN_HANDLER',
            GET_USER_BY_TOKEN_HANDLER: 'GET_USER_BY_TOKEN_HANDLER',
            /**  chat  **/
            GET_MESSAGES_HANDLER: 'GET_MESSAGES_HANDLER',
            SEND_PRIVATE_MESSAGE_HANDLER: 'SEND_PRIVATE_MESSAGE_HANDLER',
            SEND_PUBLIC_MESSAGE_HANDLER: 'SEND_PUBLIC_MESSAGE_HANDLER',
            /**  inner functions between managers  **/
            GET_USERS: 'GET_USERS',
        }
    }
}

module.exports = new CONFIG();
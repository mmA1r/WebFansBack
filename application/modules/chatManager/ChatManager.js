const BaseManager = require('../BaseManager');
const Message = require('./message/Message');
const crypto = require('crypto');

class ChatManager extends BaseManager {
    constructor(options) {
        super(options);
        
        this.id = 0;
        this.hash = crypto.randomBytes(32).toString('hex');
        this.messages = {};
        this.users = {};

        const { 
            SEND_PUBLIC_MESSAGE_HANDLER,
            SEND_PRIVATE_MESSAGE_HANDLER,
            GET_MESSAGES_HANDLER
        } = this.TRIGGERS;

        const {
            NEW_USER_ADDED
        } = this.EVENTS;

        this.mediator.set(SEND_PUBLIC_MESSAGE_HANDLER, this.sendPublicMessage);
        this.mediator.set(SEND_PRIVATE_MESSAGE_HANDLER, this.sendPrivateMessage);
        this.mediator.set(GET_MESSAGES_HANDLER, this.getMessages);

        this.mediator.subscribe(NEW_USER_ADDED, this.updateUsers);
    }

    /**  outer functions  **/

    sendPublicMessage = ({message, senderId}) => {
        const sender = this?.users[senderId];
        if((message && senderId && sender) || (message && senderId === 0 && sender)) {
            this.messages[`${this.id}`] = new Message(this.id, message, senderId, sender.name);
            this.genId();
            const hash = crypto.randomBytes(32).toString('hex');
            this.hash = hash;
            return this.hash;
        }
        return null;
    }

    sendPrivateMessage = ({message, senderId, messageTarget}) => {
        const sender = this?.users[senderId];
        if(message && senderId && messageTarget && sender) {
            this.messages[`${this.id}`] = new Message(this.id, message, senderId, sender.name, messageTarget);
            this.genId();
            const hash = crypto.randomBytes(4).toString('hex');
            this.hash = hash;
            return true;
        }
        return null;
    }

    getMessages = (hash) => {
        const dbHash = this.hash;
        if(hash !== dbHash) {
            const messages = Object.values(this.messages);
            return { messages, dbHash };
        }
        return null;
    }

    /**  inner functions  **/

    genId() {
        return ++this.id;
    }

    updateUsers = () => {
        return this.users = this.mediator.get(this.TRIGGERS['GET_USERS']);
    }
}

module.exports = ChatManager;
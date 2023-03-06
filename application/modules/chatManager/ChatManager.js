const BaseManager = require('../BaseManager');
const Message = require('./message/Message');
const crypto = require('crypto');

class ChatManager extends BaseManager {
    constructor(options) {
        super(options);
        
        this.id = 0;
        this.hash = crypto.randomBytes(32).toString('hex');
        this.messages = {};

        const { 
            SEND_PUBLIC_MESSAGE_HANDLER,
            SEND_PRIVATE_MESSAGE_HANDLER,
            GET_MESSAGES_HANDLER,
        } = this.TRIGGERS;


        this.mediator.set(SEND_PUBLIC_MESSAGE_HANDLER, ({message, senderId}) => this.sendPublicMessage({message, senderId}));
        this.mediator.set(SEND_PRIVATE_MESSAGE_HANDLER, ({message, senderId, messageTarget}) => this.sendPrivateMessage({message, senderId, messageTarget}));
        this.mediator.set(GET_MESSAGES_HANDLER, (hash) => this.getMessages(hash));
    }

    /**  outer functions  **/

    sendPublicMessage({message, senderId}) {
        const sender = () => getUserById(senderId);
        if((message && senderId && sender) || (message && senderId === 0 && sender)) {
            this.messages[`${this.id}`] = new Message(this.id, message, senderId, sender.name);
            this.genId();
            const hash = crypto.randomBytes(32).toString('hex');
            this.hash = hash;
            return this.hash;
        }
        return null;
    }

    sendPrivateMessage({message, senderId, messageTarget}) {
        const sender = () => getUserById(senderId);
        if(message && senderId && messageTarget && sender) {
            this.messages[`${this.id}`] = new Message(this.id, message, senderId, sender.name, messageTarget);
            this.genId();
            const hash = crypto.randomBytes(4).toString('hex');
            this.hash = hash;
            return true;
        }
        return null;
    }

    getMessages(hash) {
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

    getUserById(id) {
        return this.mediator.get(this.TRIGGERS['GET_USER_BY_ID'], id);
    }
}

module.exports = ChatManager;
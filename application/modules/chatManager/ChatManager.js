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


        this.mediator.set(SEND_PUBLIC_MESSAGE_HANDLER, ({ tokenHash, randomNumber, guid, message }) => this.sendPublicMessage({ tokenHash, randomNumber, guid, message }));
        this.mediator.set(SEND_PRIVATE_MESSAGE_HANDLER, ({ message, senderId, messageTarget }) => this.sendPrivateMessage({message, senderId, messageTarget}));
        this.mediator.set(GET_MESSAGES_HANDLER, ({ tokenHash, randomNumber, guid, chatHash }) => this.getMessages({ tokenHash, randomNumber, guid, chatHash }));
    }

    /**  outer functions  **/

    sendPublicMessage({ tokenHash, randomNumber, guid, message }) {
        const filteredData = this.getUserByGuid(guid, randomNumber, { message });
        const sender = filteredData?.user;
        const possibleTokenHash = filteredData?.possibleTokenHash;
        if(message && sender && possibleTokenHash === tokenHash) {
            this.messages[`${this.id}`] = new Message(this.id, message, sender.id, sender.name);
            this.genId();
            const hash = crypto.randomBytes(32).toString('hex');
            this.hash = hash;
            return this.hash;
        }
        return null;
    }

    sendPrivateMessage({ tokenHash, randomNumber, guid, message, recipient }) {
        const filteredData = this.getUserByGuid(guid, randomNumber, { message, recipient });
        const sender = filteredData?.user;
        const possibleTokenHash = filteredData?.possibleTokenHash;
        if(message && recipient && sender && possibleTokenHash === tokenHash) {
            this.messages[`${this.id}`] = new Message(this.id, message, sender.id, sender.name, recipient);
            this.genId();
            const hash = crypto.randomBytes(4).toString('hex');
            this.hash = hash;
            return true;
        }
        return null;
    }

    getMessages({ tokenHash, randomNumber, guid, chatHash }) {
        const dbHash = this.hash;
        if(chatHash !== dbHash) {
            const filteredData = this.getUserByGuid(guid, randomNumber, { chatHash });
            const possibleTokenHash = filteredData?.possibleTokenHash;
            if(possibleTokenHash === tokenHash) {
                const messages = Object.values(this.messages);
                return { messages, dbHash };
            }
        }
        return null;
    }

    /**  inner manager functions  **/

    genId() {
        return ++this.id;
    }

    getUserByGuid(guid, randomNumber, params={}) {
        params['guid'] = guid;
        const data = this.mediator.get(this.TRIGGERS['GET_FILTERED_REQ_DATA'], { guid, randomNumber, params });
        return (data ? data : null);
    }
}

module.exports = ChatManager;
const Message = require('./Message');
const UserManager = require('../UserManager/UserManager');
const crypto = require('crypto');

class MessageManager {
    constructor() {
        this.id = 0;
        this.hash = crypto.randomBytes(32).toString('hex');
        this.messages = {};
    }

    genId() {
        return ++this.id;
    }

    sendGeneralMessage(message, senderId) {
        const sender = UserManager.users[senderId]
        if(message && senderId && sender) {
            this.messages[`${this.id}`] = new Message(this.id, message, senderId, sender.name);
            this.genId();
            const hash = crypto.randomBytes(32).toString('hex');
            this.hash = hash;
            return this.hash
        }
        return null;
    }

    sendPrivateMessage(message, senderId, messageTarget) {
        const sender = UserManager.users[senderId]
        if(message && senderId && messageTarget && sender) {
            this.messages[`${this.id}`] = new Message(this.id, message, senderId, sender.name, messageTarget);
            this.genId();
            const hash = crypto.randomBytes(32).toString('hex');
            this.hash = hash;
            return this.hash
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
}

module.exports = new MessageManager;
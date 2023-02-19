class ChatManager {
    constructor() {
        this.chat = {};
    }

    genId() {
        return ++this.id;
    }

    getMessage() {

    }

    sendMessage(user, message, messageTo, id) {
        this.chat[`${id}`] = new Chat(this.id, message, messageTo, user);
        this.genId();
        return true;
    }
}

module.exports = ChatManager;
class Message {
    constructor(id, message, senderId, senderName, recipientId = null) {
        this.id = id;
        this.message = message;
        this.senderId = senderId;
        this.senderName = senderName;
        this.recipientId = recipientId
    }
}

module.exports = Message;
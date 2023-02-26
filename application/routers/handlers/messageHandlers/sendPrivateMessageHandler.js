function sendPrivateMessageHandler(answer, chatManager) {
    return (req, res) => {
        const { message, senderId, messageTarget } = req.params;
        
        const data = messageManager.sendPrivateMessage(message, senderId, messageTarget);
        if(data) {
            return res.send(answer.good({ token: data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = sendPrivateMessageHandler;
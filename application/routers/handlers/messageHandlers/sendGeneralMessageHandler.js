function sendGeneralMessageHandler(answer, messageManager) {
    return (req, res, next) => {
        const { message, senderId } = req.params;

        const data = messageManager.sendGeneralMessage(message, senderId);
        if(data) {
            return res.send(answer.good({ data }));
        }
        next();
        return res.send(answer.bad());
    }
}

module.exports = sendGeneralMessageHandler;
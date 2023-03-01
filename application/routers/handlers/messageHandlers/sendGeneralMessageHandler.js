function sendGeneralMessageHandler(answer, messageManager) {
    return (req, res) => {
        const { message, senderId } = req.body;

        const data = messageManager.sendGeneralMessage(message, senderId);
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = sendGeneralMessageHandler;
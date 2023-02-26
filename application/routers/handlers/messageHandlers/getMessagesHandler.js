function getMessagesHandler(answer, messageManager) {
    return (req, res) => {
        const { chatHash } = req.params;
        
        const data = messageManager.getMessages(chatHash);
        if(data) {
            res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = getMessagesHandler;
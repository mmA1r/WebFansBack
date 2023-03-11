function getMessagesHandler(answer, mediator) {
    return (req, res) => {
        const { tokenHash, randomNumber, guid, chatHash } = req.params;
        const { GET_MESSAGES_HANDLER } = mediator.TRIGGERS;
        
        const data = mediator.get(GET_MESSAGES_HANDLER, { tokenHash, randomNumber, guid, chatHash });
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = getMessagesHandler;
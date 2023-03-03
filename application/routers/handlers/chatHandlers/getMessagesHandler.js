function getMessagesHandler(answer, mediator) {
    return (req, res) => {
        const { chatHash } = req.params;
        const { GET_MESSAGES_HANDLER } = mediator.TRIGGERS;
        
        const data = mediator.get(GET_MESSAGES_HANDLER, chatHash);
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = getMessagesHandler;
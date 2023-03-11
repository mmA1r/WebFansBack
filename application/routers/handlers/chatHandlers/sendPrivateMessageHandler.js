function sendPrivateMessageHandler(answer, mediator) {
    return (req, res) => {
        const { message, messageTarget } = req.params;
        const { SEND_PRIVATE_MESSAGE_HANDLER } = mediator.TRIGGERS;
        
        const data = mediator.get(SEND_PRIVATE_MESSAGE_HANDLER, { message, messageTarget });
        if(data) {
            return res.send(answer.good({ token: data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = sendPrivateMessageHandler;
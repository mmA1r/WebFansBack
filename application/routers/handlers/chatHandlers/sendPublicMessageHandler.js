function sendPublicMessageHandler(answer, mediator) {
    return (req, res) => {
        const { tokenHash, randomNumber, guid, message } = req.body;
        const { SEND_PUBLIC_MESSAGE_HANDLER } = mediator.TRIGGERS;

        const data = mediator.get(SEND_PUBLIC_MESSAGE_HANDLER, { tokenHash, randomNumber, guid, message });
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = sendPublicMessageHandler;
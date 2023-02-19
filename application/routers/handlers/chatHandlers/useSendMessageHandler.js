function useSendMessageHandler(answer, chatManager) {
    return (req, res) => {
        const { message, messageTo } = req.params;

        const data = chatManager.sendMessage(message, messageTo);
        console.log(chatManager);

        res.send(answer.good({ data }));
    }
}

module.exports = useSendMessageHandler;
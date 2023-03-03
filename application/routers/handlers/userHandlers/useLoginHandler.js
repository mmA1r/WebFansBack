function useLoginHandler(answer, mediator) {
    return (req, res) => {
        const { login, password } = req.params;
        const { USE_LOGIN_HANDLER } = mediator.TRIGGERS;

        const data = mediator.get(USE_LOGIN_HANDLER, { login, password });
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = useLoginHandler;
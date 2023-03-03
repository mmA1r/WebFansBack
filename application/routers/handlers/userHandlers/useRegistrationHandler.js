function useRegistrationHandler(answer, mediator) {
    return (req, res) => {
        const { name, login, password } = req.params;
        const { USE_REGISTRATION_HANDLER } = mediator.TRIGGERS

        const data = mediator.get(USE_REGISTRATION_HANDLER, { name, login, password });
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = useRegistrationHandler;
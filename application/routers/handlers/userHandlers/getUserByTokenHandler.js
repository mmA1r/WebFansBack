function getUserByTokenHandler(answer, mediator) {
    return (req, res) => {
        const { token } = req.params;
        const { GET_USER_BY_TOKEN_HANDLER } = mediator.TRIGGERS;
        
        const data = mediator.get(GET_USER_BY_TOKEN_HANDLER, token);
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = getUserByTokenHandler;
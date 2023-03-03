function useLogoutHandler(answer, mediator) {
    return (req, res) => {
        const { token } = req.params;
        const { USE_LOGOUT_HANDLER } = mediator.TRIGGERS;
        
        const data = mediator.get(USE_LOGOUT_HANDLER, token);
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = useLogoutHandler;
function useLogoutHandler(answer, mediator) {
    return (req, res) => {
        const { tokenHash, randomNumber, guid } = req.params;
        const { USE_LOGOUT_HANDLER } = mediator.TRIGGERS;
        
        const data = mediator.get(USE_LOGOUT_HANDLER, { tokenHash, randomNumber, guid });
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = useLogoutHandler;
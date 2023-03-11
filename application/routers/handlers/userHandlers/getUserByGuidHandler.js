function getUserByGuidHandler(answer, mediator) {
    return (req, res) => {
        const { tokenHash, randomNumber, guid } = req.params;
        const { GET_USER_BY_GUID_HANDLER } = mediator.TRIGGERS;
        
        const data = mediator.get(GET_USER_BY_GUID_HANDLER, { tokenHash, randomNumber, guid });
        const allowedData = { id: data.id, name: data.name, options: data.userOptions }
        if(data) {
            return res.send(answer.good({ data: allowedData }));
        }
        return res.send(answer.bad());
    }
}

module.exports = getUserByGuidHandler;
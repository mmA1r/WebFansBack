const fs = require('fs');
function getFileHandler(answer, mediator) {
    return (req, res) => {
        const { tokenHash, randomNumber, guid, type } = req.body;
        const { GET_FILE } = mediator.TRIGGERS;

        const data = mediator.get(GET_FILE, { tokenHash, guid, randomNumber, type });
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = getFileHandler;
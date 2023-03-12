function uploadFileHandler(answer, mediator) {
    return (req, res) => {
        const { tokenHash, randomNumber, guid } = req.body;
        const { RECORD_USER_FILE } = mediator.TRIGGERS;
        const file = req.file;

        const data = mediator.get(RECORD_USER_FILE, { tokenHash, guid, randomNumber, file });
        if(data) {
            return res.send(answer.good());
        }
        return res.send(answer.bad());
    }
}

module.exports = uploadFileHandler;
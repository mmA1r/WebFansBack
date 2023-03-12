function uploadFileHandler(answer, mediator) {
    return (req, res) => {
        const { tokenHash, randomNumber, guid } = req.body;
        const { RECORD_FILE_NAME_TO_USER } = mediator.TRIGGERS;
        const file = req.file;
        
        const data = mediator.get(RECORD_FILE_NAME_TO_USER, { tokenHash, guid, randomNumber, file });
        if(data) {
            return res.send(answer.good());
        }
        return res.send(answer.bad());
    }
}

module.exports = uploadFileHandler;
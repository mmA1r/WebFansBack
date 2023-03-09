function uploadUserImageHandler(answer, mediator) {
    return (req, res) => {
        const { token, image, type } = req.body;
        const { UPLOAD_USER_IMAGE } = mediator.TRIGGERS;
        const data = mediator.get(UPLOAD_USER_IMAGE, { token, image, type });
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = uploadUserImageHandler;
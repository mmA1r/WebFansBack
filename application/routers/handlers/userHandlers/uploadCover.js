function uploadCover(answer, mediator) {
    return (req, res) => {
        console.log(req.file)
        res.status(200).json({
            success: 'Success'
        })
    }
}

module.exports = uploadCover;
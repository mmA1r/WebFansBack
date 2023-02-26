function getUserHandler(answer, userManager) {
    return (req, res) => {
        const { token } = req.params;
        
        const data = userManager.getUser(token);
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = getUserHandler;
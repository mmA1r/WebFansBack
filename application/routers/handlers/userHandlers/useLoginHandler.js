function useLoginHandler(answer, userManager) {
    return (req, res) => {
        const { login, password, token } = req.params;
        
        const data = userManager.login(login, password, token);

        res.send(answer.good({ data }));
    }
}

module.exports = useLoginHandler;
function useLoginHandler(answer, userManager) {
    return (req, res) => {
        const { login, password } = req.params;
        
        const data = userManager.login(login, password);
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = useLoginHandler;
function useLoginHandler(answer, userManager) {
    return (req, res) => {
        const { login, password } = req.params;
        
        const data = userManager.login(login, password);

        res.send(answer.good({ token: data }));
    }
}

module.exports = useLoginHandler;
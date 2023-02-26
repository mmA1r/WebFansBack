function useRegistrationHandler(answer, userManager) {
    return (req, res) => {
        const { name, login, password } = req.params;

        const data = userManager.registration(name, login, password);
        if(data) {
            return res.send(answer.good({ data }));
        }
        return res.send(answer.bad());
    }
}

module.exports = useRegistrationHandler;
function useRegistrationHandler(answer, userManager) {
    return (req, res) => {
        const { name, login, password } = req.params;

        const data = userManager.registration(name, login, password);

        res.send(answer.good({ data }));
    }
}

module.exports = useRegistrationHandler;
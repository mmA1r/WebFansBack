function useLogoutHandler(answer, userManager) {
    return (req, res) => {
        const { token } = req.params;
        
        const data = userManager.logout(token);

        res.send(answer.good({ data }));
    }
}

module.exports = useLogoutHandler;
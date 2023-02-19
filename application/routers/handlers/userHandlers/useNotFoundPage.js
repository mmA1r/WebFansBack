function useNotFoundHandler(answer){
    return (req, res) => {
        const data = 'Page not found';
        res.send(answer.good(data));
    }
}

module.exports = useNotFoundHandler;
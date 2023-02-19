function useNotFoundHandler(answer) {
    return (req, res) => {
        const data = 'Страница не найдена';
        res.send(answer.good(data));
    }
}

module.exports = useNotFoundHandler;
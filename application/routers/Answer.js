class Answer {
    constructor() {
        this.CODES = {
            404: 'page not found',
            1001: 'bad request params',
            9000: 'unknown error',
        };
    }

    good(data) {
        return { result: 'ok', data };
    }

    bad(code) {
        const errorCode = code && this.CODES[code] ? code : 9000;
        return { 
            result: 'error', 
            error: {
                code: errorCode,
                text: this.CODES[errorCode]
            }
        };
    }
}

module.exports = Answer;
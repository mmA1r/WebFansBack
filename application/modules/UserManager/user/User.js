class User {
    constructor(id, name, login, password, token = null) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        this.token = token;
    }

    getUser(token) {
        if(this.token === token) {
            return ({
                id: this.id,
                login: this.login,
                password: this.password,
                name: this.name,
                token: this.token
            });
        }
        return null;
    }
}

module.exports = User;
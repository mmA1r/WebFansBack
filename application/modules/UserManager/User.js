class User {
    constructor(id, name, login, password, token = null) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        this.token = token;
    }

    getUser(id) {
        if(this.id === id) {
            return ({
                id: this.id,
                login: this.login,
                password: this.password,
                name: this.name,
                token: this.token
            });
        }
    }
}

module.exports = User;
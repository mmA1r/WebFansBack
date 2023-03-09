class User {
    constructor({id, name, login, password, token = null, userOptions = {}}) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        this.token = token;
        this.userOptions = userOptions;
    }
}

module.exports = User;
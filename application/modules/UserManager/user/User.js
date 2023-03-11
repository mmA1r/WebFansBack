class User {
    constructor({id, guid, name, login, password, token = null, userOptions = {}}) {
        this.id = id;
        this.guid = guid
        this.name = name;
        this.login = login;
        this.password = password;
        this.token = token;
        this.userOptions = userOptions;
    }
}

module.exports = User;
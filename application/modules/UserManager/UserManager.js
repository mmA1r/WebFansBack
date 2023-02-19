const User = require('./User');
const crypto = require('crypto');

class UserManager {
    constructor() {
        this.id = 0;
        this.users = {
            'login': 'dasd',
            'password': 'dasdas'
        };
    }

    genId() {
        return ++this.id;
    }

    registration(name, login, password) {
        if (this.checkLogin(login) && name && password) {
            this.users[`${this.id}`] = new User(this.id, name, login, password);
            this.genId();
            return true;
        }
        return false;
    }

    login(login, password) {
        if (login && password) {
            const users = Object.values(this.users)
            if (users[0]) {
                const user = (users.filter(user => user.login === login && user.password === password))[0];
                if (user) {
                    const token = crypto.randomBytes(32).toString('hex');
                    user.token = token;
                    return token;
                }
            }
        }
        return false;
    }

    logout(token) {
        if (token) {
            const users = Object.values(this.users);
            if (users[0]) {
                const user = (users.filter(user => user.token === token))[0];
                if (user) {
                    user.token = null;
                    return true;
                }
            }
        }
        return false;
    }

    getUser(id) {
        const user = this.users[`${id}`];
        return user ? user.getUser(id) : false;
    }

    //checkUser(login, token) {
    //    if(token) {
    //    }
    //}

    checkLogin(login) {
        const users = Object.values(this.users);
        if (users[0]) {
            return users.every(user => user.login !== login);
        }
        return true;
    }
}

module.exports = UserManager;
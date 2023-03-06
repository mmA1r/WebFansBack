const BaseManager = require('../BaseManager');
const User = require('./user/User');
const crypto = require('crypto');

class UserManager extends BaseManager {
    constructor(options) {
        super(options);
        
        this.id = 0;
        this.users = {};

        const {
            USE_REGISTRATION_HANDLER,
            USE_LOGOUT_HANDLER,
            USE_LOGIN_HANDLER,
            GET_USER_BY_TOKEN_HANDLER,
            GET_USER_BY_ID
        } = this.TRIGGERS;

        this.mediator.set(GET_USER_BY_ID, (id) => this.getUserById(id));
        this.mediator.set(USE_REGISTRATION_HANDLER, ({ name, login, password }) => this.registration({ name, login, password }));
        this.mediator.set(USE_LOGOUT_HANDLER, (token) => this.logout(token));
        this.mediator.set(USE_LOGIN_HANDLER, ({ login, password }) => this.login({ login, password }));
        this.mediator.set(GET_USER_BY_TOKEN_HANDLER, (token) => this.getUserByToken(token));
    }

    /**  outer functions  **/

    registration({ name, login, password }) {
        if(() => this.checkLogin(login) && name && password) {
            this.users[`${this.id}`] = new User(this.id, name, login, password);
            this.mediator.call(this.EVENTS['NEW_USER_ADDED']);
            this.genId();
            return true;
        }
        return false;
    }

    login({ login, password }) {
        if(login && password) {
            const users = Object.values(this.users)
            if(users[0]){
                const user = (users.filter(user => user.login === login && user.password === password))[0];
                if(user) {
                    const token = crypto.randomBytes(32).toString('hex');
                    user.token = token;
                    return user;
                }
            }
        }
        return false;
    }
    
    logout(token) {
        if(token) {
            const users = Object.values(this.users);
            if(users[0]) {
                const user = (users.filter(user => user.token === token))[0];
                if(user) {
                    user.token = null;
                    return true;
                }
            }
        }
        return false;
    }

    getUserByToken(token) {
        const users = Object.values(this.users);
        if(users[0]) {
            const user = (users.filter(user => user.token === token))[0];
            return user;
        }
        return null;
    }

    /**  inner functions  **/

    checkLogin(login) {
        const users = Object.values(this.users);
        if(users[0]) {
            return users.every(user => user.login !== login);
        }
        return true;
    }

    genId() {
        return ++this.id;
    }

    getUserById(id) {
        return this.users[id];
    }
}

module.exports = UserManager;
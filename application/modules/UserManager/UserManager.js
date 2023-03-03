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
            GET_USERS
        } = this.TRIGGERS;

        this.mediator.set(GET_USERS, this.getUsers);
        this.mediator.set(USE_REGISTRATION_HANDLER, this.registration);
        this.mediator.set(USE_LOGOUT_HANDLER, this.logout);
        this.mediator.set(USE_LOGIN_HANDLER, this.login);
        this.mediator.set(GET_USER_BY_TOKEN_HANDLER, this.getUserByToken);
    }

    /**  outer functions  **/

    registration = ({ name, login, password }) => {
        if(this.checkLogin(login) && name && password) {
            this.users[`${this.id}`] = new User(this.id, name, login, password);
            this.mediator.call(this.EVENTS['NEW_USER_ADDED']);
            this.genId();
            return true;
        }
        return false;
    }

    login = ({ login, password }) => {
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
    
    logout = (token) => {
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

    getUserByToken = (token) => {
        const users = Object.values(this.users);
        if(users[0]) {
            const user = (users.filter(user => user.token === token))[0];
            return user;
        }
        return null;
    }

    /**  inner functions  **/

    checkLogin = (login) => {
        const users = Object.values(this.users);
        if(users[0]) {
            return users.every(user => user.login !== login);
        }
        return true;
    }

    genId() {
        return ++this.id;
    }

    getUsers = () => {
        return this.users;
    }
}

module.exports = UserManager;
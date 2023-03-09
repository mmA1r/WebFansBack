const BaseManager = require('../BaseManager');
const User = require('./user/User');
const fs = require('fs');
const hash = require('object-hash');

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
            GET_USER_BY_ID,
            UPLOAD_USER_IMAGE
        } = this.TRIGGERS;

        this.mediator.set(GET_USER_BY_ID, (id) => this.getUserById(id));
        this.mediator.set(USE_REGISTRATION_HANDLER, ({ name, login, password }) => this.registration({ name, login, password }));
        this.mediator.set(USE_LOGOUT_HANDLER, (token) => this.logout(token));
        this.mediator.set(USE_LOGIN_HANDLER, ({ login, password, rndNum }) => this.login({ login, password, rndNum }));
        this.mediator.set(GET_USER_BY_TOKEN_HANDLER, (token) => this.getUserByToken(token));
        this.mediator.set(UPLOAD_USER_IMAGE, ({ token, image, type }) => this.uploadUserImage({ token, image, type }));
    }

    /**  outer functions  **/

    registration({ name, login, password }) {
        if(() => this.checkLogin(login) && name && password) {
            const passwordHash = hash({ login, password });
            this.users[`${this.id}`] = new User({ id: this.id, name, login, password: passwordHash });
            this.genId();
            return true;
        }
        return false;
    }

    login({ login, password, rndNum }) {
        if(login && password) {
            const users = Object.values(this.users);
            if(users[0]){
                const user = (users.filter(user => user.login === login && user.password + rndNum === password))[0];
                if(user) {
                    const rndString = this.rndString(10);
                    const token = hash({ hash: hash({ login, password: user.password }), rndString });
                    user.token = token;
                    return rndString;
                }
            }
        }
        return false;
    }






    rndString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
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
            return (users.filter(user => user.token === token))[0];
        }
        return null;
    }

    uploadUserImage({ token, image, type }) {
        const user = this.getUserByToken(token);
        if(user) {
            switch (type) {
                case 'avatar':
                    user.userOptions['userAvatar'] = image;
                    return;
                case 'cover':
                    user.userOptions['userCover'] = image;
                    return;
                default: return;
            }
        }
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
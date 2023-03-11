const BaseManager = require('../BaseManager');
const User = require('./user/User');
const fs = require('fs');

const hash = require('../../../hooks/hash');

class UserManager extends BaseManager {
    constructor(options) {
        super(options);
        
        this.id = 0;
        this.users = {};

        const {
            USE_REGISTRATION_HANDLER,
            USE_LOGOUT_HANDLER,
            USE_LOGIN_HANDLER,
            GET_USER_BY_GUID_HANDLER,
            GET_FILTERED_REQ_DATA,
            UPLOAD_USER_IMAGE
        } = this.TRIGGERS;

        this.mediator.set(GET_FILTERED_REQ_DATA, ({ guid, randomNumber, params={} }) => this.filterData({ guid, randomNumber, params }));
        this.mediator.set(USE_REGISTRATION_HANDLER, ({ name, login, password, guid }) => this.registration({ name, login, password, guid }));
        this.mediator.set(USE_LOGOUT_HANDLER, ({ tokenHash, randomNumber, guid }) => this.logout({ tokenHash, randomNumber, guid }));
        this.mediator.set(USE_LOGIN_HANDLER, ({ login, password, rndNum }) => this.login({ login, password, rndNum }));
        this.mediator.set(GET_USER_BY_GUID_HANDLER, ({ tokenHash, randomNumber, guid }) => this.getUserByGuid({ tokenHash, randomNumber, guid }));
        this.mediator.set(UPLOAD_USER_IMAGE, ({ token, image, type }) => this.uploadUserImage({ token, image, type }));
    }

    /**  outer functions  **/

    registration({ name, login, password, guid }) {
        if(() => this.checkLogin(login) && name && password && guid) {
            const passwordHash = hash.useGenerateHash({ login, password }).paramsHash;
            this.users[`${this.id}`] = new User({ 
                id: this.id, 
                guid, 
                name, 
                login, 
                password: passwordHash 
            });
            this.genId();
            return true;
        }
        return false;
    }

    login({ login, password, rndNum }) {
        if(login && password) {
            const users = this.getUsers();
            if(users[0]){
                const user = (users.filter(user => user.login === login && user.password + rndNum === password))[0];
                if(user) {
                    const generatedToken = hash.useGenerateToken(login, user.password);
                    user.token = generatedToken.returnHash
                    return generatedToken.rndString;
                }
            }
        }
        return false;
    }
  
    logout({ tokenHash, randomNumber, guid }) {
        if(tokenHash && guid) {
            const params = { guid };
            const filteredData = this.filterData({ guid, randomNumber, params });
            const user = filteredData?.user;
            const possibleTokenHash = filteredData?.possibleTokenHash;
            if(user && possibleTokenHash === tokenHash) {
                user.token = null;
                return true;
            }
        }
        return false;
    }

    getUserByGuid({ tokenHash, randomNumber, guid }) {
        if(tokenHash && guid) {
            const params = { guid };
            const filteredData = this.filterData({ guid, randomNumber, params });
            const user = filteredData?.user;
            const possibleTokenHash = filteredData?.possibleTokenHash;
            if(user && possibleTokenHash === tokenHash) {
                return user;
            }
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

    filterData({ guid, randomNumber, params={} }) {
        const user = this.filterUsers(guid);
        if(user) {
            const possibleTokenHash = hash.implictToken(user.token, params, randomNumber).tokenHash;
            return {
                user,
                possibleTokenHash
            }
        }
        return null;
    }

    /**  inner manager functions  **/

    genId() {
        return ++this.id;
    }

    filterUsers(guid) {
        const users = this.getUsers();
        if(users) {
            const user = (users.filter(user => user.guid === guid))[0];
            return user;
        }
        return null;
    }

    getUsers() {
        const users = Object.values(this.users);
        if(users[0]) {
            return users;
        }
        return null;
    }

    checkLogin(login) {
        const users = this.getUsers();
        if(users) {
            return users.every(user => user.login !== login);
        }
        return true;
    }
}

module.exports = UserManager;
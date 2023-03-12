const BaseManager = require('../BaseManager');
const fs = require('fs');

class FileManager extends BaseManager {
    constructor(options) {
        super(options);

        const {
            RECORD_USER_FILE,
            GET_FILE
        } = this.TRIGGERS;

        this.mediator.set(RECORD_USER_FILE, ({ tokenHash, guid, randomNumber, file }) => this.recordFile({ tokenHash, guid, randomNumber, file }));
        this.mediator.set(GET_FILE, ({ tokenHash, guid, randomNumber, type }) => this.getFile({ tokenHash, guid, randomNumber, type }));
    }

    recordFile({ tokenHash, guid, randomNumber, file }) {
        const params = { guid }
        const fileName = file.filename;
        const filteredData = this.getUserByGuid(guid, randomNumber, params);
        if(tokenHash === filteredData?.possibleTokenHash) {
            const type = this.getFileCustomType(fileName);
            const user = filteredData.user;
            if(user && type) {
                user.userOptions[`${type}`] = fileName;
                return;
            }
        }
        const path = file.path;
        this.deleteFile(path);
        return null;
    }

    getFile({ tokenHash, guid, randomNumber, type }) {
        const params = { guid, type }
        const filteredData = this.getUserByGuid(guid, randomNumber, params);
        const user = filteredData?.user
        if(tokenHash === filteredData?.possibleTokenHash) {
            const fileName = (
                type === 'avatar' ? user.userOptions?.avatar :
                type === 'cover' ? user.userOptions?.cover : null
            );
            return fileName;
        }
        return null;
    }

    /**  inner functions  **/

    getFileCustomType(fileName) {
        return (fileName?.split('-')[1])?.split('.')[0];
    }

    deleteFile(path) {
        fs.unlink(path, (err) => {
            if(err) {
                console.log('file doesn`t exist')
                return;
            }
            return;
        });
    }

    getUserByGuid(guid, randomNumber, params={}) {
        params['guid'] = guid;
        const data = this.mediator.get(this.TRIGGERS['GET_FILTERED_REQ_DATA'], { guid, randomNumber, params });
        return (data ? data : null);
    }
}

module.exports = FileManager;
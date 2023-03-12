const BaseManager = require('../BaseManager');
const fs = require('fs');

class FileManager extends BaseManager {
    constructor(options) {
        super(options);

        const {
            RECORD_FILE_NAME_TO_USER,
        } = this.TRIGGERS;

        this.mediator.set(RECORD_FILE_NAME_TO_USER, ({ tokenHash, guid, randomNumber, file }) => this.recordFileName({ tokenHash, guid, randomNumber, file }));
    }

    recordFileName({ tokenHash, guid, randomNumber, file }) {
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
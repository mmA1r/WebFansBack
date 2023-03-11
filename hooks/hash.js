const hash = require('object-hash');

function randomNum() {
    return Math.floor(Math.random() * 10000000);
}

function randomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 7) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function sortArrayAlphabet(x, y){
    return x[0].localeCompare(y[0]);
}

function sortParams(params) {
    const ent = Object.entries(params);
    const soreted = ent.sort(sortArrayAlphabet);
    return soreted.reduce(function(acc, ent) {
        acc[ent[0]] = ent[1];
        return acc;
    }, {});
}

exports.useGenerateHash = function(values, numRandomType = true) {
    const paramsHash = hash(values);
    const randomNumberValue = randomNum();
    const randomStringValue = randomString();
    const usedRandomValue = (numRandomType ? randomNumberValue : randomStringValue);
    const typedHash = paramsHash + usedRandomValue;

    const hashedValues ={
        paramsHash,
        typedHash,
        usedRandomValue
    } 
    
    return hashedValues;
}

exports.useGenerateToken = function (login, password, rndString = randomString()) {
    const paramsHash = hash({ login, password }) + rndString;
    const returnHash = hash({ paramsHash });
    return { 
        returnHash,
        rndString
    };
}

exports.implictToken = function(token, params={}, rndNumber=randomNum()) {
    const sortedParams = sortParams(params);
    const randomNumber = rndNumber-0;
    const hashParams = Object.assign({randomNumber, token}, sortedParams);
    const tokenHash = hash(hashParams);
    return {
        tokenHash,
        randomNumber
    }
}
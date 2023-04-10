const mysql = require('mysql');
const { connectionDAO } = require("./connectionDAO");

class signUpDAO extends connectionDAO {
    
    doesUsernameExists(data) {
        return new Promise((resolve, reject) => {
            super.getConnection().query(
                'SELECT COUNT(*) AS Num FROM User WHERE Username=?',
                [data['username']],
                (err, results) => {
                    if (err)
                        reject(err);
                    resolve(results[0]['Num'] === 1 ? 'Username Already Exists' : null);
                }
            )
        });
    }

    doesAccountExist(data) {
        return new Promise((resolve, reject) => {
            super.getConnection().query(
                'SELECT COUNT(*) AS Num FROM User WHERE Email=?',
                [data['email']],
                (err, results) => {
                    if (err)
                        reject(err);
                    resolve(results[0]['Num'] === 1 ? 'Email Already Exists' : null);
                }
            )
        });
    }

    async validateNewAccount(data) {
        const existingAcc = await this.doesAccountExist(data).then((result) => {return result});
        const existingUser = await this.doesUsernameExists(data).then((result) => {return result});
        
        if (existingAcc || existingUser)
            return (existingAcc ? existingAcc : '') + '\n' + (existingUser ? existingUser : '');

        const createNewAcc = await this.createNewAccount(data).then((result) => {return result});
        return createNewAcc;
    }

    createNewAccount(data) {
        return new Promise((resolve, reject) => {
            super.getConnection().query(
                'INSERT INTO User VALUES (0,?,?,?,?);',
                [data['email'], data['username'], data['password'], data['name']],
                (err) => {
                    if (err) 
                        reject(err);
                    resolve(true);
                }
            )
        });
    }
}

module.exports = {signUpDAO};
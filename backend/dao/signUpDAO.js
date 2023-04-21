const mysql = require('mysql');
const uuid = require('short-uuid');
const { connectionDAO } = require("./connectionDAO");
const message = require('../messageOutput');

class signUpDAO extends connectionDAO {
    
    _message = new message.message();

    /**
     * Returns a Promise that queries the database and checks whether the email entered is already registered to an account
     * @param {JSON} data User input data that must contain email 
     * @returns {Promise<string>} text-based message if account exists
     */
    doesAccountExist(data) {
        return new Promise((resolve, reject) => {
            super.getConnection().query(
                'SELECT COUNT(*) AS Num FROM User WHERE Email=?',
                [data['email']],
                (err, results) => {
                    if (err){
                        this._message.addMessage(0, 'SQL Error')
                        reject(err);
                    }
                    
                    if (!results){
                        this._message.addMessage(1, 'Unique Account...')
                        resolve(false)
                    }

                    if (results[0]['Num'] === 0){
                        this._message.addMessage(1, 'Valid Username...')
                        resolve(false)
                    }

                    if (results[0]['Num'] === 1){
                        this._message.addMessage(0, 'Account Already Exists')
                        resolve(true);
                    }

                    resolve(false);
                }
            )
        });
    }

    /**
     * Runs procedures to verify a pre-existing account does not exist
     * @param {JSON} data User input data 
     * @returns {string} returns a message if account is created or not
     */
    async validateNewAccount(data) {
        this._message.clearMessageList();
        const existingAcc = await this.doesAccountExist(data).then((result) => {return result});
        
        if (existingAcc)
            return (this._message.getMessageList());

        const userID = uuid().new();
        await this.createNewAccount(data, userID).then((result) => {return result});
        if (parseInt(data['businessOwner']) === 1) {
            this._message.addMessage(1, "Business Account Created!");   
        }
        return this._message.getMessageList();
    }

    /**
     * Creates a new account using user input data and uuid
     * @param {JSON} data User input data
     * @param {number} userID ID in uuid format 
     * @returns 
     */
    createNewAccount(data, userID) {
        return new Promise((resolve, reject) => {
            super.getConnection().query(
                'INSERT INTO User VALUES (?,?,?,?,?);',
                [userID, data['name'], data['email'], data['password'], data['businessOwner']],
                (err) => {
                    if (err) 
                        reject(err);
                    this._message.addMessage(1, 'New Account Created!')
                    resolve(true);
                }
            )
        });
    }
}

module.exports = {signUpDAO};
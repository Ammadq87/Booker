const mysql = require('mysql');
const uuid = require('short-uuid');
const { connectionDAO } = require("./connectionDAO");

class signUpDAO extends connectionDAO {
    
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
                    if (err)
                        reject(err);
                    resolve(results[0]['Num'] === 1 ? 'Account Already Exists' : null);
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
        const existingAcc = await this.doesAccountExist(data).then((result) => {return result});
        
        if (existingAcc)
            return (existingAcc ? existingAcc : '');

        const userID = uuid().new();
        const createNewAcc = await this.createNewAccount(data, userID).then((result) => {return result});
        let createBusAcc = '';
        
        if (data['businessOwner'] === 1)
            createBusAcc = await this.createBusinessAccount(userID).then((result) => {return result});
        
        return createNewAcc + '\n' + createBusAcc;
    }

    /**
     * Creates a business account using the userID
     * @param {number} userID ID in uuid format
     * @returns {Promise<string>} returns a Promise<string> object if account is created
     */
    createBusinessAccount(userID) {
        return new Promise((resolve, reject) => {
            super.getConnection().query(
                'INSERT INTO BusinessOwner (UserID) VALUES (?);',
                [userID],
                (err) => {
                    if (err) 
                        reject(err);
                    resolve('Business Account Created!');
                }
            )
        });
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
                    resolve('New Account Created!');
                }
            )
        });
    }
}

module.exports = {signUpDAO};
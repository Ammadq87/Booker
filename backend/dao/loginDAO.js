const { connectionDAO } = require("./connectionDAO");

class loginDAO extends connectionDAO {
    
    /**
     * Checks if entered credentials are existing in the database
     * @param {JSON} data - JSON object containing key-value pairs for username and password 
     * @returns if user exists
     */
    validateLogin(data) {
        if (!super.getConnection()){
            super.connect();
        }

        return new Promise((resolve, reject) => {
            super.getConnection().query('SELECT COUNT(*) AS Num FROM User WHERE Email=? AND Password=?',
                [data['email'], data['password']],
                (err, results) => {
                    if (err) 
                        reject(err);
                    resolve(results[0]['Num'] === 1);
                }
            )
        });
    }
}

module.exports = {loginDAO};
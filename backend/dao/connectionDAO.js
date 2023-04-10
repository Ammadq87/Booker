const mysql = require('mysql');
class connectionDAO {
    connection;
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'booker'
        });
    }

    connect(){
        this.connection.connect((err) => {
            if (err) {console.log('Failed to Connect to MySQL Server'); throw err};
            console.log('loginDAO connected');
        })
    }

    end() {
        this.connection.end((err) => {
            if (err) {console.log('Failed to Close connection to MySQL Server'); throw err};
            console.log('loginDAO closed');
        })
    }

    getConnection() {
        return this.connection;
    }
}

module.exports = {connectionDAO};
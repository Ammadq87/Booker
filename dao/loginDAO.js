const mysql = require('mysql');

let connection;

function connect() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'booker'
    });
    
    connection.connect((err) => {
        if (err) {console.log('Failed to Connect to MySQL Server'); throw err};
        console.log('loginDAO connected');
    })
}

/**
 * Checks if entered credentials are existing in the database
 * @param {JSON} data - JSON object containing key-value pairs for username and password 
 * @returns if user exists
 */
function validateLogin(data) {
    if (!connection){
        connect();
    }

    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(*) AS Num FROM User WHERE Email=? AND Password=?',
            [data['email'], data['password']],
            (err, results) => {
                if (err) 
                    reject(err);
                resolve(results[0]['Num'] === 1);
            }
        )
    });
}

function end() {
    connection.end((err) => {
        if (err) {console.log('Failed to Close connection to MySQL Server'); throw err};
        console.log('loginDAO closed');
    })
}

module.exports = {connect, end, validateLogin};
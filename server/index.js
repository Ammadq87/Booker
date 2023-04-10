//#region Imports and Libraries
const express = require('express');
const bodyParser = require('body-parser')
const login = require('../routes/login');

//#endregion

//#region global variables
const app = express();
const PORT = 3001;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//#endregion

//#region get page
app.get('/', (req, res) => {
    res.send('Hi')
})
//#endregion

//#region Setting up routes
app.use('/login', login);
//#endregion

//#region set up port connection
app.listen(PORT, (err) => {
    if (err) 
        console.log('<< Err: Could not connect >>');
    console.log(`Listening on localhost:${PORT}`);
});
//#endregion
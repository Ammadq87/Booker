//#region Imports and Libraries
const express = require('express');
//#endregion

//#region global variables
const app = express();
const PORT = 3001;
//#endregion

//#region get page
app.get('/', (req, res) => {
    res.send('Hi')
})
//#endregion

//#region set up port connection
app.listen(PORT, (err) => {
    if (err) 
        console.log('<< Err: Could not connect >>');
    console.log(`Listening on localhost:${PORT}`);
});
//#endregion
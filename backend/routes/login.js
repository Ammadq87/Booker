const express = require('express');
const router = express();
const _loginDAO = require('../dao/loginDAO');
const message = require('../messageOutput');

router.get('/', async (req, res) => {
    const data = req.body;
    const _message = new message.message();

    try {
        const loginDAO = new _loginDAO.loginDAO(); 
        const validLogin = await loginDAO.validateLogin(data);
        if (validLogin)
            _message.addMessage(1, `Welcome, ${data['email']}!`)
        else 
            _message.addMessage(0, 'Invalid Username/Password Combo')
            
        res.send(_message.getMessageList());
        _message.clearMessageList();
    } catch (err) {
        res.status(500).send('An error occured');
    }
})

module.exports = router;
const express = require('express');
const router = express();
const loginDAO = require('../dao/loginDAO');

router.get('/', async (req, res) => {
    const data = req.body;
    try {
        const validLogin = await loginDAO.validateLogin(data);
        res.send(validLogin ? `Welcome, ${data['email']}!` : 'Invalid Username/Password Combo');
    } catch (err) {
        res.status(500).send('An error occured');
    }
})

module.exports = router;
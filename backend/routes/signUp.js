const express = require('express');
const router = express();
const _signUpDAO = require('../dao/signUpDAO');

router.get('/', async (req, res) => {
    const data = req.body;
    const signUpDAO = new _signUpDAO.signUpDAO();
    const validNewAccount = await signUpDAO.validateNewAccount(data);
    res.send(validNewAccount);
})

module.exports = router;

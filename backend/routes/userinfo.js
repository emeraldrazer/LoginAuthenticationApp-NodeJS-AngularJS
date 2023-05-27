const express = require('express');
const mysql = require('mysql');
const checkToken = require('../controllers/checkToken');
const router = express.Router();

router.get('/authenticate', checkToken, (req, res) => {
    return res.status(200).json({error: false, message: 'Token is valid'});
})

router.get('/user/:userId', checkToken, (req, res) => { 
    const { userId } = req.params
    
    if(!userId){
        return res.status(404).json({error: true, message: 'No UserID Provided.'});
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'webdb'
    });
    
    connection.connect();

    const sql = `SELECT * FROM angular_db WHERE id=${userId}`;

    connection.query(sql, (err, result) => {
        if (err) return res.status(404).json({error: true, message: `${err}`});
        if (result.length){
            return res.status(200).json(result);
        } 
        
        return res.status(404).json({error: true, message: 'No User Found.'})

    });

    connection.end();

})

module.exports = router;

const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');
const mysql = require('mysql');
const { key } = require('../key');

router.use(cookies())

const register = function (req, res) {
    const data = req.body;
    const json = JSON.parse(JSON.stringify(data));

    SQLQuery(`INSERT INTO angular_db (id, fullname, username, email, password) 
    VALUES (${null}, "${json.fullname}", "${json.username}", "${json.email}", "${json.password}")`)
        .then((result) => {
            res.send(result);
        })

}

const logIn = function (req, res) {
    const data = req.body;
    const json = JSON.parse(JSON.stringify(data));

    SQLQuery(`SELECT id FROM angular_db WHERE username="${json.username}" AND password="${json.password}"`)
        .then((result) => {
            if (Object.keys(result.data).length > 0) {
                const payload = { username: json.username };
                const token = jwt.sign(payload, key, { expiresIn: '10s' });

                res.cookie('angular_token', token, { httpOnly: true, secure: true });
                //window.localStorage.setItem('angular_token', token);

                return res.status(200).json({ result, token });
            }
            return res.status(404).json({ error: true, message: "Invalid Credentials" });
        })
        .catch(() => {
            return res.status(404).json({ error: true, message: "An internal error occurred." })
        })

}

const logOut = function (req, res) {
    res.clearCookie('angular_token');
    //window.localStorage.removeItem('angular_token');

    res.redirect('localhost:4200/login');
}

const SQLQuery = function (query) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'webdb'
        });

        connection.connect();

        connection.query(query, (err, result) => {
            connection.end();

            if (err) {
                reject({ error: true, message: err });
                return;
            }

            resolve({ error: false, data: result });
        });
    })
}

module.exports = { register, logIn, logOut };

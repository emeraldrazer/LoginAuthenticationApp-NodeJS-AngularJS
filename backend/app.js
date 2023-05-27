const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = process.env.PORT || 3001;

const userInfo = require('./routes/userinfo');
const authentication = require('./routes/authentication');

app.use(bodyparser.json());
app.use('/api', authentication);
app.use('/api/v1', userInfo);

app.all('*', (req, res) => {
    res.status(404).json({error: true, message: 'No Resource Found.'})
})

app.listen(port, () => {
    console.log(`Server is listening, Port: ${port}`);
})
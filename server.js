const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.post('/proxy', (req, res) => {
    const apiUrl = 'https://d3398n96t5wqx9.cloudfront.net/UsersAquisition/';
    const options = {
        url: apiUrl,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-encryption-key': 'FtmJ7frzTyWOzintybbqIWzwwclcPtaI',
            'Authorization': 'Bearer 0e186445-0647-417c-ae27-8098533f1914'
        },
        body: JSON.stringify(req.body)
    };

    request(options, (error, response, body) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(body);
    });
});

app.listen(3000, () => {
    console.log('Proxy server running on port 3000');
});

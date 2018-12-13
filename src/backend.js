const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send('Express is running.');
});

app.post('/message', (request, response) => {
    let result = Promise.resolve();
    if (typeof request.headers.origin === 'string') {
        response.set('Access-Control-Allow-Origin', request.headers.origin);
    }
    result
        .then(() => {
            response.send('{"status":"ok"}');
        })
        .catch(err => response.status(500).send(err));
});

app.listen('8090');

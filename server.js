/* eslint-disable consistent-return,import/no-extraneous-dependencies */

const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());
app.use(express.static(`${__dirname}/static`));

app.get('/', (request, response) => {
  response.send('Express is running.');
});

app.post('/message', (request, response) => {
  let result = Promise.resolve();
  if (typeof request.headers.origin === 'string') {
    response.set('Access-Control-Allow-Origin', request.headers.origin);
  }
  if (request.files != null) {
    if (Object.keys(request.files).length === 0) {
      return response.status(400).send('No files were uploaded.');
    }
    const file = request.files.attach;
    const fileName = file.name;
    result = new Promise((resolve, reject) => {
      file.mv(`${__dirname}/static/${fileName}`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  result
    .then(() => {
      response.send('{"status":"ok"}');
    })
    .catch(err => response.status(500).send(err));
});

app.listen('8085');

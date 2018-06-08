const express = require('express');
const process = require('process');
const app = express();

const port = process.env.PORT || 3000;

app.get('/api/test', (req, res) => res.send('Hello World!'));
app.use(express.static('public'));

app.listen(port, () => console.log(`App listening on ${port}`));
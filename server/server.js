const express = require('express');
const app = express()
const port = 4444;
const bodyParser = require('body-parser');

app.use(express.static('client'));
app.use(bodyParser.json());

app.listen(port, () => { console.log(`we are listening from port ${port}`)});

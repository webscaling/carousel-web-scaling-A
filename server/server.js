const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4444;

app.use(express.static('client'));
app.use(bodyParser.json());

app.listen(port, () => { console.log(`we are listening from port ${port}`)});

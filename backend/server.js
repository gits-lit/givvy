const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => res.send("givvy"));

// Setting up API routes
app.use('/api/shelter', require('./routes/shelter'));
app.use('/api/item', require('./routes/item'));

app.listen(port, async () => {
  console.log(`Starting server on port ${port}`);
});
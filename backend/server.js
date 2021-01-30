const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // http://localhost:3000
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.send("givvy"));

// Setting up API routes
app.use('/api/shelter', require('./routes/shelter'));
app.use('/api/item', require('./routes/item'));

app.listen(port, async () => {
  console.log(`Starting server on port ${port}`);
});
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');


connectToMongo();
const app = express();
const port = 5000;

app.use(express.json()); // this is a middleware to use req body of api
app.use(cors()); // used to call api in browser

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
})
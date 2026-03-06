const express = require('express');
const app = express();
const usersRoute = require('./routes/users_routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/Encore_Merch';

app.use(bodyParser.json());
app.use('/api/users', usersRoute);

const port = 8080;
app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect(uri)
  .then(() => {
    console.log('Connection success');
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
  })
  .catch(error => {
    console.error('Connection fail', error);
  });



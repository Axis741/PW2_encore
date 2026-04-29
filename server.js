const express = require('express');
const app = express();
const usersRoute = require('./routes/users_routes');
const artistasRoute = require('./routes/artistas_routes');
const ordenesRoute = require('./routes/ordenes_routes');
const reportesRoute = require('./routes/reportes_routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/Encore_Merch';

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());
app.use('/api/users', usersRoute);
app.use('/api/artistas', artistasRoute);
app.use('/api/ordenes', ordenesRoute);
app.use('/api/reportes', reportesRoute);

app.use("/uploads", express.static("uploads"));

const port = 8080;
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

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



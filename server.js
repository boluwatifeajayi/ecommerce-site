//hi there

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const connectDB = require('./config/db');
const config = require('./config/database');
const path = require('path');

require('dotenv').config();

connectDB();

const port = process.env.PORT || 8000;
//import routes

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

//app
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

//serve static assets in production

// if(process.env.NODE_ENV === 'production'){
//     //set static folder
//     app.use(express.static('frontend/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//     });
// }


app.use(compression());
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


app.use(express.static(path.join(__dirname, './frontend/build')))

app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})


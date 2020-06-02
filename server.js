const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const dotEnv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection');

const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');


dotEnv.config();


const app = express();


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
//app.use('/', require('./routes/index.js'));
//app.use('/users', require('./routes/users.js'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );


// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});




// db connectivity
dbConnection();

// cors
app.use(cors());

//request payload middleware
app.use(express.json());
app.use(express.urlencoded({express: true}));



app.use('/users', require('./routes/users.js'));
app.use('/api/v1/comment', require('./routes/commentRoute'));
app.use('/api/v1/user', require('./routes/userRoute'));
app.use('/', require('./routes/index.js'));
app.get('/', (req, res, next) =>{
    res.send('Hello from Node Api Server');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`);
});

// error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
        status: 500,
        mesage: err.mesage,
        body: {}
    });
  });


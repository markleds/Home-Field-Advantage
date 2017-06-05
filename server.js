require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
//Require the marked package
const marked = require("marked");
// const stadiumRouter = require('./resources/stadiums');

// Options for setting the port depending on where app lives
const PORT = process.argv[2] || process.env.PORT || 3000;

// start up express
const app = express();

// Static assets for client
const dir = {
  public: path.join(__dirname, 'public'),
  jquery: path.join(__dirname, 'node_modules/jquery/dist'),
}

// set up logging
app.use(logger('dev'));

// set up static middleware for public folders
app.use(express.static(dir.public));
app.use('/vendor/jquery', express.static(dir.jquery));


// Set up Node to use EJS as templating engine
app.set('view engine', 'ejs');

// Set up body parer to parse request the body of submitted forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set up method override to allow HTML forms to perform PUT and DELET requests
app.use(methodOverride('_method'));

/* ROUTES */
app.use(require("./resources"));
// app.use('/stadiums', stadiumRouter);
// Make sure "/" automatically redirects to "/stadiums"
app.get('/', (req, res) => {
  res.redirect(301, '/stadiums');
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack, next);
  return res.sendStatus(400);
});

app.listen(PORT, () => console.log(`Server up and listening on port ${PORT}`));

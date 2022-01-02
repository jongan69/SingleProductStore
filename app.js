const express = require('express');
const stripe = require('stripe')('your Stripe secret key');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

// Initializing PORT for Heroku or Port 5000 if local
const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Server started runnning on port ${port}`);
});

const express = require('express');
const keys = require('./config/keys');
const stripe = require('stripe')('keys.stripeSecretKey');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');

const app = express();

// Handlebars Middleware
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

// Index Route
app.get('/', (req, res) => {
  res.render('index', {
    stripePublishableKey: keys.stripePublishableKey
  });
});

  
// Charge Route
app.post('/charge', (req, res) => {
    const amount = 30000;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
      .then(customer => stripe.charges.create({
        amount,
        description: 'Cryptocurrensea NFT',
        currency: 'usd',
        customer: customer.id
      }))
      .then(charge => res.render('success'));
});

// Initializing PORT for Heroku or Port 5000 if local
const port = process.env.port || 5000;

// Listening on port
app.listen(port, () => {
    console.log(`Server started runnning on port ${port}`);
});

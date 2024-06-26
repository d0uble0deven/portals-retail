const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const passwordless = require('passwordless');
const MongoStore = require('passwordless-mongostore-bcrypt-node');
// const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 3003;

/*
  mongod
  node server.js
  mongo
*/

// MongoDB connection URL
const uri = "mongodb+srv://devgovindjisoftware:Kw1vVnJpal5XAwSb@govindjis-portals.bcknp5q.mongodb.net/passwordless-simple-mail?retryWrites=true&w=majority";
// const uri = "mongodb+srv://devgovindjisoftware:Kw1vVnJpal5XAwSb@govindjis-portals.bcknp5q.mongodb.net/?retryWrites=true&w=majority&appName=Govindjis-Portals";
// const uri ='mongodb://localhost:27015/passwordless-simple-mail';
// const uri = "mongodb+srv://devgovindjisoftware:Kw1vVnJpal5XAwSb@govindjis-portals.bcknp5q.mongodb.net:27017,govindjis-portals-shard-00-00.bcknp5q.mongodb.net:27017,govindjis-portals-shard-00-01.bcknp5q.mongodb.net:27017,govindjis-portals-shard-00-02.bcknp5q.mongodb.net:27017/passwordless-simple-mail?ssl=true&replicaSet=atlas-3r2y89-shard-0&authSource=admin&retryWrites=true&w=majority";
// const uri = "mongodb://devgovindjisoftware:Kw1vVnJpal5XAwSb@govindjis-portals-shard-00-00.bcknp5q.mongodb.net:27017,govindjis-portals-shard-00-01.bcknp5q.mongodb.net:27017,govindjis-portals-shard-00-02.bcknp5q.mongodb.net:27017/passwordless-simple-mail?ssl=true&replicaSet=atlas-3r2y89-shard-0&authSource=admin&retryWrites=true&w=majority";

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Setup body parser for form data
app.use(bodyParser.urlencoded({ extended: false }));

// Setup session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// Initialize Passwordless with MongoStore
// passwordless.init(new MongoStore(uri));
passwordless.init(new MongoStore(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}));

// Middleware to support sessions
app.use(passwordless.sessionSupport());
app.use(passwordless.acceptToken({ successRedirect: '/' }));

// Setup routes
const router = express.Router();

// Display login page
router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

// Handle token request
router.post('/sendtoken',
  passwordless.requestToken(
    function(user, delivery, callback) {
      const users = [
        { id: 1, email: 'marc@example.com' },
        { id: 2, email: 'alice@example.com' }
      ];
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === user.toLowerCase()) {
          return callback(null, users[i].id);
        }
      }
      callback(null, null);
    }),
  function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'sent.html'));
  });

// Restricted route
router.get('/restricted', passwordless.restricted(), function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'restricted.html'));
});

// Logout route
router.get('/logout', passwordless.logout(), function(req, res) {
  res.redirect('/');
});

app.use('/', router);

// Default route for unmatched requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

// Start the server and set up the email server
(async () => {
  try {
    // Dynamically import emailjs
    const emailModule = await import('emailjs');

    // Create an instance of SMTPClient
    const smtpServer = new emailModule.SMTPClient({
      user: 'dev.govindji.software@gmail.com',
      password: 'Sanders_123',
      host: 'smtp.gmail.com',
      ssl: true
    });

    passwordless.addDelivery((tokenToSend, uidToSend, recipient, callback) => {
      const host = 'localhost:3003';
      smtpServer.send({
        text: `Hello!\nAccess your account here: http://${host}?token=${tokenToSend}&uid=${encodeURIComponent(uidToSend)}`,
        from: 'dev.govindji.software@gmail.com',
        to: recipient,
        subject: `Token for ${host}`
      }, (err, message) => {
        if (err) {
          console.log(err);
        }
        callback(err);
      });
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error setting up SMTP server:', error);
  }
})();

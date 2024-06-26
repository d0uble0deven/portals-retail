const express = require('express')
const path = require('path');
const app = express()
const port = 3003

var router = express.Router();

var passwordless = require('passwordless');
var MongoStore = require('passwordless-mongostore-bcrypt-node');
var bson = require('bson');
// var bson = require('bson');
var bcrypt = require('bcryptjs');

// var email = require('emailjs');
// import email from 'emailjs';

// Displays FE - Serve static files from the project root
app.use(express.static(path.join(__dirname, '../build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    // res.sendFile(path.join(__dirname, '../build', 'index.html'));
    res.sendFile(path.join(__dirname, '../public', 'login.html'));

  });


var session = require('express-session')

// app.get('/', (req, res) => res.send('Hello World!'))
// Use the session middleware
app.use(session({ 
    secret: 'keyboard cat', 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


// Access the session as req.session
app.get('/hello', function(req, res, next) {
    // this should be a template from the FE
    if (req.session.views) {
    // if (req.session.views && sendToken has resolved) {

        req.session.views++
        res.sendFile(path.join(__dirname, '../build', 'index.html'));

        console.log(`views: ${req.session.views}`)
        console.log(`expires in: ${(req.session.cookie.maxAge / 1000)}`)

    } else {
        // req.session.views = 1
        // res.end('welcome to the session demo. refresh!')
        req.session.views = 1;
        console.log('First visit, serving HTML template.');

        // Serve the HTML template on the first load
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// Function to set up email server asynchronously
async function setupEmailServer() {
    const email = await import('emailjs');
        console.log('email: ', email)
    return email.server.connect({
      user: 'dev.govindji.software@gmail.com', 
      password: 'yourPassword', 
      host: 'yourSmtpHost', // service_g33gjnw
      ssl: true
    });
  }

  // Start the server and set up the email server
(async () => {
    try {
      const smtpServer = await setupEmailServer();
      console.log('SMTP server set up:', smtpServer);
  
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Error setting up SMTP server:', error);
    }
  })();

// // send emails via email.js
// (async () => {
//     const email = await import('emailjs');
//     // Your code using emailjs here
//     console.log('email: ', email)
//     var smtpServer  = email.server.connect({
//         user:    yourEmail, 
//         password: yourPwd, 
//         host:    yourSmtp, 
//         ssl:     true
//     });
//     console.log('smtpServer: ', smtpServer)
// })();

 // Your MongoDB TokenStore
var pathToMongoDb = 'mongodb://localhost/passwordless-simple-mail';
passwordless.init(new MongoStore(pathToMongoDb));


// Set up a delivery service
passwordless.addDelivery(
	function(tokenToSend, uidToSend, recipient, callback, req) {
		var host = 'localhost:3003';
		smtpServer.send({
			text:    'Hello!\nAccess your account here: http://' 
			+ host + '?token=' + tokenToSend + '&uid=' 
			+ encodeURIComponent(uidToSend), 
			from:    yourEmail, 
			to:      recipient,
			subject: 'Token for ' + host
		}, function(err, message) { 
			if(err) {
				console.log(err);
			}
			callback(err);
		});
});

// Middleware
app.use(passwordless.sessionSupport());
app.use(passwordless.acceptToken({ successRedirect: '/'}));

// Session middleware via express-session





// Routing
/* GET login screen. */
router.get('/login', function(req, res) {
    // this should be a template from the FE
    res.sendFile(path.join(__dirname, '../public', 'login.html'));

 });
 
 /* POST login details. */
 var users = [
	{ id: 1, email: 'marc@example.com' },
	{ id: 2, email: 'alice@example.com' }
];

 router.post('/sendtoken', 
     passwordless.requestToken(
         // Turn the email address into an user's ID
         function(user, delivery, callback, req) {
            console.log('sendtoken route!!!')
            /*
                *** MY PSEUDOCODE ***
                -- after Login page, hit submit, call this method, then redirect to React App
                - check if email is in DB 
                - send email to user
                - display 'Sent! page'
                - if email is in DB
                -- show app with all products and shopping cart
                -- else show use Demo Page


            */


             /*
             // usually you would want something like:
             User.find({email: user}, callback(ret) {
                if(ret) {
                    callback(null, ret.id)
                }
                else {
                    callback(null, null)
                }
           })
           
           // but you could also do the following 
           // if you want to allow anyone:
           // callback(null, user);
           */
           for (var i = users.length - 1; i >= 0; i--) {
            if(users[i].email === user.toLowerCase()) {
                return callback(null, users[i].id);
            }
        }
        callback(null, null);
        }),
     function(req, res) {
        // success!
           res.render('sent');
        
 });

 /* GET restricted site. */
router.get('/restricted', passwordless.restricted(),
function(req, res) {
 // render the DEMO page
});

/* Logout user */
router.get('/logout', passwordless.logout(),
	function(req, res) {
		res.redirect('/');
});
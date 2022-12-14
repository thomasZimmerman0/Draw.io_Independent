const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const port = process.env.PORT || 3000;
const cookieSession = require('cookie-session');

app.use(express.static('public'));
app.set('view engine', 'ejs');

// app.use(express.urlencoded({extended: false}))
// app.use(express.json())

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: true, limit:'10mb'}));

const passport = require('passport');
require('./auth/passport-config')(passport)

app.use(cookieSession({
    name: 'session', 
    keys: ['alsd;lasjlaskdjlsj;slkjas'], 
    maxAge: 14 * 24 * 60 * 60 * 1000
}))

app.use( passport.initialize() );
app.use( passport.session() );
app.use(express.static(__dirname + '/public'));

//-------------------------------------------------------------------------------------


app.use(require('./routes/index.js'))
app.use(require('./routes/draw.js'))
app.use(require('./routes/logIn.js'))
app.use(require('./routes/registration.js'))
app.use(require('./routes/contact.js'))
app.use(require('./routes/profile.js'))
app.use(require('./routes/canvasLibrary.js'))
app.use(require('./routes/accounts.js'))
app.use(require('./routes/followers.js'))
app.use(require('./routes/user_profile.js'))




//-------------------------------------------------------------------------------------
app.listen(port);
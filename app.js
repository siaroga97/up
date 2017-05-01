let express = require('express');
let app = express();

let bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({extended: true}));


let db = require('diskdb');
db.connect('./db', ['articles','allUsers']);


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const sessionStore = require('connect-diskdb')(session);
const store = new sessionStore({ path: './db', name: 'sessions' });
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: store
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => {
    const error = user ? null : new Error('deserialize');
    done(error, user)
});

passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {
        const user = db.allUsers.findOne({ username: username });
        if (!user) {
            console.log('User Not Found with username ' + username);
            return done(null, false, { message: 'user not found' });
        }
        if (password !== user.password) {
            console.log('Invalid Password');
            return done(null, false, { message: 'incorrect password' });
        }
        return done(null, user);
    })
);

app.post('/login', passport.authenticate('login'), (req, res) => res.send(req.user.username));

app.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

app.get('/username', (req, res) => req.user ? res.send(req.user.username) : res.sendStatus(401));

app.get('/articles', function (req, res) {
    res.json(db.articles.find());
});

app.get('/articles/:id', function (req, res) {
    res.json(db.articles.findOne({id: req.params.id}));
});

app.delete('/articles', function (req, res) {
    res.json(db.articles.remove({id: req.params.body.id}));
});

app.delete('/articles/:id', function (req, res) {
    res.json(db.articles.remove({id: req.params.id}));
});

app.post('/articles', function (req, res) {
    res.json(db.articles.save(req.body));
});

app.patch('/articles', function (req, res) {
    let options = {
        multi: false,
        upsert: false
    };
    let query = db.articles.findOne({id: req.body.id});
    res.json(db.articles.update(query, req.body, options));

});

app.patch('articles/:id', function (req, res) {
    let options = {
        multi: false,
        upsert: false
    };
    let query = db.articles.findOne({id: req.params.id});
    res.json(db.articles.update(query, req.body, options));
});

app.listen(app.get('port'), function () {
    console.log('app.js run', app.get('port'));
});


const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const SessionStore = require('connect-mongo')(session);

const store = new SessionStore({ url: 'mongodb://localhost/sergey' });
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let users = require('./db.js').users;
let articles = require('./db.js').articles;

/*
 let db = require('diskdb');
 db.connect('./db', ['articles'],['allUsers']);
 let arts = db.articles.find();
 arts.forEach(item => {
 delete item.id;
 delete item._id;
 new articles(item).save();
 });

 
 db.connect('./db', ['allUsers']);
 arts = db.allUsers.find();
 arts.forEach(item => {
 new users(item).save();
 });*/
 

function createFilter(filterConfig) {
    const filter = {};
    if (filterConfig) {
        if (filterConfig.tags) filter.tags = { $all: filterConfig.tags };
        if (filterConfig.author) filter.author = filterConfig.author;
        if (filterConfig.createdAt) filter.createdAt = { $gte: new Date(filterConfig.createdAt) };
    }
    return filter;
}

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => {
    const error = user ? null : new Error('deserialize');
    done(error, user);
});
passport.use('login', new LocalStrategy({
    passReqToCallback: true,
},
    (req, name, password, done) => {
        users.findOne({ username: name }, (err, user) => {
            if (!user) {
                console.log('User Not Found with username ' + name);
                return done(null, false, { message: 'user not found' });
            }
            if (password !== user.password) {
                console.log('Invalid Password');
                return done(null, false, { message: 'incorrect password' });
            }
            return done(null, user);
        });
    }));
app.post('/login', passport.authenticate('login'), (req, res) => res.sendStatus(200));
app.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});
app.get('/username', (req, res) => req.user ? res.send(req.user.username) : res.sendStatus(401));

app.put('/articles', (req, res) => {
    articles.find(createFilter(req.body.filterConfig))
        .sort({ createdAt: -1 })
        .skip(req.body.skip || 0)
        .limit(req.body.top || 0)
        .exec((err, data) => !err ? res.json(data) : res.sendStatus(500));
});
app.get('/articles/:id', (req, res) => {
    articles.findById(req.params.id, (err, data) => !err ? res.json(data) : res.sendStatus(500));
});
app.delete('/articles/:id', (req, res) => {
    articles.findByIdAndRemove(req.params.id, err =>
        !err ? res.sendStatus(200) : res.sendStatus(500));
});
app.post('/articles', (req, res) => {
    new articles(req.body).save(err => !err ? res.sendStatus(200) : res.sendStatus(500));
});

app.patch('/articles', (req, res) => {
    articles.findByIdAndUpdate(req.body._id, { $set: req.body },
        err => !err ? res.sendStatus(200) : res.sendStatus(500));
});

app.listen(app.get('port'), () => {
    console.log('app.js run', app.get('port'));
});

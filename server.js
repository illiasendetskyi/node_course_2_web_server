const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const PS = path.sep;

let app = express();

hbs.registerPartials(__dirname + PS + 'views' + PS + 'partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', err => {
        if (err) {
            console.log('Unable to append file.')
        }
    });
    console.log(log);
    next();
});


app.use((req, res, next) => {
    res.render('maintance.hbs', {
        pageTitle: 'we\' ll be right back'
    });
});
app.use(express.static(__dirname + PS + 'public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to the home page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About render page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request 404'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});
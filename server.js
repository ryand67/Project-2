const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('./config/passport');
const session = require('express-session')

const app = express();

const PORT = process.env.PORT || 8080;

const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

require('./controllers/api-user-routes')(app);
require('./controllers/hb-routes')(app);
require('./controllers/api-post-routes')(app);

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => {
        console.log(`LISTENING ON: ${PORT}`);
    })
})
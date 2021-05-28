const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');


// Initialization
const app = express();
require('./database');


// Settings
/*
.hbs referencia al modulo de handlebars
*/
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
/*
-methodOverride -> Permite que formularios puedan hacer request PUT o Delete
-session -> mantiene la sesion del usuario iniciada aunque
cierre la pagina durante un periodo corto de tiempo
*/
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'crud',
    resave: true,
    saveUninitialized: true
}));


// Global variables



// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


// Static Files
app.use(express.static(path.join(__dirname, 'public')));



//Server Initilization
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port') )
});
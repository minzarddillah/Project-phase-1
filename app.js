const express   = require(`express`);
const routes    = require('./routes');
const session   = require('express-session');
const app       = express();
const port      = process.env.PORT || 4000;

app.set('view engine',`ejs`);

app.use(session({
    secret: 'ini rahasia boy',
    resave: false,
    saveUninitialized: true
}));
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.error = null
    next();
});
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('./views'));
app.use('/',routes);



app.listen(port,()=>{
    console.log(`Server Start on ${port}`);
});

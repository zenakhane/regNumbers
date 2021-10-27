const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const pg = require('pg')
const Registra = require("./reg")
const app = express()


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}


const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/register';
const { Pool } = require('pg');
const { request } = require('express');
// const routes = require('./routes');
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const handlebarSetup = exphbs({
  partialsDir: "./views/partials",
  viewPath: './views',
  layoutsDir: './views/layouts'
});

let townRegistrations = Registra(pool)
// let regRoutes = routes(registrations)

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.get('/', async function (req, res) {
  req.flash('info');
  res.render('index', {
    title: 'Home',
    regDisplay: townRegistrations.displayRegistrations()
   
  })
});

app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});

app.post('/', function(req, res){
  let regi = req.body.registration
  console.log(regi)
  res.render('index',{
   
    regDisplay:  townRegistrations.setRegNumbers(regi),
    errors: townRegistrations.regErrors()
    })
    console.log(townRegistrations.setRegNumbers(regi))
})
// app.post('/regNum', function(req,res){
//   let regi = req.body.registration
//   console.log(regi)
//         res.render('index', {
//           regDisplay:  townRegistrations.setRegDisplay(regi),
//           })
//   })


// app.get('/reset', routesG.resetAll)

const PORT = process.env.PORT || 2082;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
});

require('./db/db');
const express   = require('express');
const app       = express();
const port      = 3000;
const userController = require('./controllers/userController');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/users', userController);

app.get('/', (req,res)=>{
    res.render('index.ejs');
})

app.listen(port, ()=>{
    console.log(`server is listening on port: ${port}`);
})
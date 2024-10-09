const express = require('express') ;
const colors = require('colors')
const app = express() ;
const PORT = 3000 ;
const dbConnect = require('./db')
const errorHandler  = require('./middleware/errorHandler')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
//NOTE parse the data from the req.body
app.use(cors()) ;
require('dotenv').config()
require('./config/passportConfig')


//NOTE creating a session whenever login with google hit..
app.use('/uploads',express.static('uploads'))
app.use(session({
  secret: 'my-secret-string',
  resave: false,    
  saveUninitialized: false ,  //if something is not store we donot need to create session
  cookie: { maxAge : 1000 * 60 * 60 * 24 * 30 }
}))

//NOTE initializing the passport middleware in the express app
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());


dbConnect() ;

app.get('/',(req,res)=>{
    res.send('HOMEPAGE')
})
app.use('/api',require('./routes/userRoutes'))
app.use('/api', require('./routes/productRoutes'))
app.use('/api',require('./routes/checkRoutes'))
app.use('/api',require('./routes/orderRoutes'))
//global route handler 
app.use((req,res,next)=>{
    res.status(404).send(`requested url ${req.url} not found`)
    next()
})

//global error handler middleware
app.use(errorHandler) ;


app.listen(PORT , ()=>{
    console.log(colors.yellow(`App is listening on the PORT:${PORT}`))
})
const express = require('express')
const app = express()
const mongosse=require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require ("body-parser")

var indexRouter = require('./routes/index');
var apiRouter = require("./routes/api");

dotenv.config()

mongosse.connect(`mongodb://${process.env.MONGO_URI}/${process.env.MONGO_INITDB_DATABASE}`).then(()=> {console.log("db connected ");})

mongosse.connection.on('error' , err =>{
    console.log(` DB connection error ; ${err.message}`);
})


app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/api', apiRouter);





const port = process.env.PORT || 8080

app.listen(port, ()=>{
    console.log(`A Node Js API is listing on port: ${port}`);
});
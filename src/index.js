const express = require('express')
const mongoose = require('mongoose')
const route = require('./Routes/route')
const app = express()
app.use(express.json())



mongoose.connect('mongodb+srv://bloggingSite:project123@project-01-group-3.2zpxn0w.mongodb.net/Project-02-Interns',{
    useNewUrlParser:true
}).then( ()=> console.log('MongoDB connected 😎🥰😎'))
.catch(err=> console.log(err.message))

app.use('/', route)

app.listen(3000 , function(){
    console.log('Server Running On Port Num-' , 3000)
})





const express = require('express');
const mongoose = require('mongoose');
const route = require('./Routes/route.js');
const app = express();
const multer = require('multer')

app.use(express.json());
app.use(multer().any())


mongoose.connect('mongodb+srv://bloggingSite:project123@project-01-group-3.2zpxn0w.mongodb.net/Project-02-Interns', {
    useNewUrlParser: true
}).then(() => console.log('MongoDB connected😎😎'))
    .catch(err => console.log(err.message))

app.use('/', route);

app.listen(3001, function () {
    console.log('Server Running On Port Number' + 3001)
});







// function abc(a,b){
//     let x = a.split(' ')
//     let arr = x.filter((p)=>{
//         var av = '  '
//         if(p!==b) return p
//         if(p==b) return av
//         // return '.'
//     })
//     return arr.join('')
// }
// var aa = 'hello world hello'
// var bb = 'hello'
// console.log(abc(aa,bb))

























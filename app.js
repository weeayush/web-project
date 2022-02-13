const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require('body-parser')
const port = 8000;
const fs = require("fs");
var Mongoose = require('Mongoose');
const { stringify } = require("querystring");
Mongoose.connect = ('mongodb://localhost/contactdance', {useNewUrlParser: true})

var ContactSchema = new Mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var contact = Mongoose.model('contact', ContactSchema)



app.use('/static', express.static('static'));
app.use(express.urlencoded())

app.set('views engine' , 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req,res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact',(req,res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has benn saved to database")
    }).catch(()=>{
        res.status(400).send("item was not saved the database")
    })
    // res.status(200).render('contact.pug')
})
app.listen(port, ()=>{
    console.log(`the application run successfully on ${port}`);
})
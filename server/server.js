import express from "express";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import fs from "fs";
import path from "path";
import {Page404} from '../src/component/404'
import {GetApi} from '../src/component/GetApi'
//const regeneratorRuntime = require("regenerator-runtime");
const PORT = process.env.PORT || 8080;;
const connectDb = require('./connect');
const app = express();
const ShortUrl = require('../modals/shortUrl');
const RegisteredUsers = require('../modals/registeredUsers')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../modals/auth");
export const registeredUser = false


let bodyParser = require('body-parser')
let cors = require('cors')
const validUrl = require('valid-url');

connectDb();
app.use((express.json({extended:false})));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '..', 'build')))
app.use(cors({
    origin: 'http://localhost:8000'
}));

/*
//fix favicon.icon error
app.get('/favicon.ico', (req, res) => {
 
  res.sendFile(path.resolve("/build/favicon.png"));
});

*/
//set headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  
  next();
});


//app.use(express.static(path.resolve(__dirname, '..', 'build')))


// home endpoint
app.get('/', async function(req, res) {

  const shortUrls = await ShortUrl.find();
  res.sendFile(process.cwd() + '/build/index.html');

});



//users

app.get('/logged', (req, res) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root"><LoggedUser/></div>`
      )
    )
}) 
})

//register endpoint
app.post('/register', async function(req,res){
  
  const fn =  await RegisteredUsers.findOne({email:req.body.email})
  const fnName = await RegisteredUsers.findOne({name:req.body.name})
if(fn){

    res.status(400).send({
      message: "Email is registered",
     
    });
  
}else if(fnName){
  res.status(402).send({
    message: "Name already used",
   
  });
}else{
  
  try {
    bcrypt
    .hash(req.body.password, 10)
    .then(async (hashedPassword) => {
      // create a new user 
    const data =  await RegisteredUsers.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
         
      })
      res.status(201).send({
        message: "User Created Successfully",
        res,
      });
     //console.log("User Created Successfully",)
})

}catch (error) {
//console.error(error);


}
res.redirect('/')
}
/*else{
  res.status(400).send({
    message: "User is registered",
   
  });
}*/


})


// login endpoint
app.post("/login", (request, response) => {
  console.log(request.body.email)

RegisteredUsers.findOne({ email: request.body.email })
  .then((user) => {

      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {

          if(!passwordCheck) {
           
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
         
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
       .catch((e) => {
         response.status(404).send({
         message: "Email not found",
         e,
      });
    });
});
//users data endpoint
app.get('/userdata/:id', auth, async function(req,res){
  console.log(req.params)
  const {id} = req.params
  try {
    let email = await RegisteredUsers.aggregate([
      {$match:{email:id}},
      {$project:{name:1,email:1}}
    ])    
    if (!email) return res.status(400).json({ error: "invalid login" });

//const validPassword = await bcrypt.compare(password, userEmail.password);
   // if (!validPassword) return res.status(400).json({ error: "invalid login" });

   // user.password = undefined;

    res.json(email);
  } catch (err) {
    console.log(err);
    return next(err);
  }
 // const RegisteredUsers  = await RegisteredUsers.findOne()
})




//////////////////////////////////////
//urls
app.get('/link', (req, res) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root"><GetApi/></div>`
      )
    )
}) 
})
app.post('/shortUrls', async function(req, res) {
  if (validUrl.isUri(req.body.url)){
    console.log('Looks like an URL');

  const fn =  await ShortUrl.findOne({long:req.body.url})
  if(!fn){
    await ShortUrl.create({long:req.body.url});
  }

res.redirect('/link')
   
} else {
    console.log('Not a URL');
    res.redirect('/')
}
 
  //res.json({ greeting: 'hello API' });
  //await ShortUrl.create({long:"https://kb.objectrocket.com/mongo-db/create-react-app-with-mongodb-part-4-connecting-backend-with-the-frontend-902"});
  //await ShortUrl.create({long:'https://us.search.yahoo.com/search?fr=yhs-invalid&p=Cannot+find+module+%27html%27'})
  
});

  app.get('/api/shortUrls', async (req,res)=>{
  const shortUrls = await ShortUrl.find()
  res.json({ shortUrls });
}) 

app.get('/:shortUrl', async (req,res) => {
  const shortUrl = await ShortUrl.findOne({short:req.params.shortUrl})
  if(shortUrl===null) return res.sendStatus(404);
  shortUrl.count++
  await shortUrl.save();
  res.redirect(shortUrl.long)
})

app.use(function(req, res) {
  res.send('404: Page not Found', 404);
});

// Handle 500
app.use(function(error, req, res, next) {
  res.send('500: Internal Server Error', 500);
});



app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});

//other 

/*

app.get('*', (req, res) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root"><Page404/></div>`
        )
      )
    }
    
}) 
})

*/



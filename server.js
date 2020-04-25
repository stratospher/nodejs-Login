// npm run devStart
//every time we make a change it's going to refresh our server and rerun code

//first thing we want to do is set up basic express application
const express=require('express');
//we also want to get app variable from express
const app=express();

//in order to use ejs syntax,we have to tell server we r using ejs
//and this is y we installed ejs dependency  
app.set('view-engine','ejs'); 


//so we set up a route
//home page route
//send them a certain page we  want to create
app.get('/',(req,res)=>{
 res.render('index.ejs',{name:'Ruhi'});  
});

app.get('/login',(req,res)=>{
    res.render('login.ejs');
});

app.get('/register',(req,res)=>{
    res.render('register.ejs');
});

app.post('/register',(req,res)=>{
   
});

//we have an application running on port 3000
//if we dont set up route,localhost:3000 displays cannot GET /
app.listen(3000);
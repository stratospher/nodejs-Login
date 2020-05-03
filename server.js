//to load in environment variable
//in devvelopment, we need development tendency of .env
if(process.env.NODE_ENV!=='production')
{
    require('dotenv').config()
}
// npm run devStart
//every time we make a change it's going to refresh our server and rerun code

//first thing we want to do is set up basic express application
const express=require('express');
//we also want to get app variable from express
const app=express();
//bcrypt will allow us to hash passwords as well as compare hashed passwords
const bcrypt=require('bcrypt'); 
const passport=require('passport');
const flash=require('express-flash');
const session=require('express-session'); 

const initializePassport=require('./passport-config');
initializePassport(passport,
    email=>users.find(user=>user.email===email),
    id=>users.find(user=>user.id===id)
);
//instead of database
const users=[];

//in order to use ejs syntax,we have to tell server we r using ejs
//and this is y we installed ejs dependency  
app.set('view-engine','ejs');

//take these forms from email and password
//and we want to be able to access them inside of our request variable of our post method 
app.use(express.urlencoded({extended:false}));
app.use(flash());
// session takes a bunch of different options
//secret is a key that we want to keep secret which will encrypt all different information for us
//its an environment variable 
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false, //we dont want to resave our session variable if nothing is changed  
    saveUninitialized:false //do u want to save empty value if no value and we dont want to do that
}))

app.use(passport.initialize())
app.use(passport.session())
//so we set up a route
//home page route
//send them a certain page we  want to create
app.get('/',(req,res)=>{
 res.render('index.ejs',{name:req.user.name});  
});

app.get('/login',(req,res)=>{
    res.render('login.ejs');
});
//use local strategy
app.post('/login',passport.authenticate('local',{
 successRedirect:'/',
 failureRedirect:'/login',
 failureFlash:true      //same as message in passport-config.js
}));

app.get('/register',(req,res)=>{
    res.render('register.ejs');
});

app.post('/register',async (req,res)=>{
//    req.body.name would correspond to name field  and what we put after body (here name) corresponds to name="" in ejs form 

//we want to create new user with correct hashed password
//we use try catch block since we r using asynchronous code
try{

    //to make a hashed password
    //2nd argument is 
    //we use await since its an asynchronous function and its going to return something after waiting for it 
    const hashedPassword=await bcrypt.hash(req.body.password,10);//10 is how many times we  want to generate the hash
    users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    res.redirect('/login'); 
}catch{
    res.redirect('/register'); 
}
console.log(users);
});

//we have an application running on port 3000
//if we dont set up route,localhost:3000 displays cannot GET /
app.listen(3000);
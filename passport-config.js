//passport-local allows to use username and password for logging in
//passport has different versions of logging in google,fb,etc..

//in order to store and persist user across different pages we use  express-session

//express-flash is used to display messages in case we fail to login 


const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');


function initialize(passport, getUserByEmail, getUserById){
   const authenticateUser = async (email, password, done) => {
        const user=getUserByEmail(email);
        if(user==null)
            //null since no error, false since no user found,and error message
            return done(null,false,{message:'No user with that email'});
        try {
            if(await bcrypt.compare(password,user.password))
            {
                return done(null,user);
            }else{
                return done(null,false,{message:'Password incorrect'});
            }
        } catch (e) {
            return done(e);
        }
}

  //second argument is function that is going to be called to authenticate user
  passport.use(new LocalStrategy({usernameField:'email' },
  authenticateUser))
  passport.serializeUser((user,done)=>done(null,user.id));
  passport.deserializeUser((id,done)=>{
    return done(null,getUserById(id))
  })
}

module.exports=initialize;
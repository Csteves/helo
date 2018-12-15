require('dotenv').config();
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      authCtrl = require('./controller')

const app = express();
let {PORT,CONNECTION_STRING,SECRET} = process.env;
// TOP LEVEL MIDDLEWARE
app.use(express.json());
app.use(express.static(__dirname +'/../build'));
app.use(session({
    secret:SECRET,
    resave:true,
    saveUninitialized:false
}));

massive(CONNECTION_STRING).then(db =>{
    app.set('db',db);
    app.listen(PORT, ()=>{
        console.log('running on port: ' + PORT)
    })
})

app.post('/auth/register',authCtrl.register);
app.post('/auth/login', authCtrl.login);

app.get("/api/posts:id", authCtrl.getFilterdPost);
app.get('/api/posts', authCtrl.getAllPosts);
app.get('/api/post:id', authCtrl.getPost);
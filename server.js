const express = require('express')
const app = new express();
const port = 8090;
const db = require('./models');
const bodyParser = require('body-parser');
const logger = require('morgan') // after npm install morgan. Used to see all 
                                  //the pages that are being loaded on the console.Lets you see all the logs.
const expressSession = require('express-session'); // after install npm install express-session. 
                                                  //Used to keeep user logged in



app.use(expressSession({secret:' I love Node Js '}))  // adding cookie to our login redirect
app.use(bodyParser.json());
app.use(logger("dev"))
app.use(express.static('public'));
app.set("view engine", "ejs");

//user is logged in or not 
global.loggedIn = null;   // nobody is logged in by deafult 
app.use("*", (request, response, next) => {   
  loggedIn = request.session.userId;
  next();
});



const UsersRouter  = require('./routes/UsersRouter'); 
const CommentsRouter  = require('./routes/CommentsRouter');
const PhotosRouter  = require('./routes/PhotosRouter');
const PageRouter = require ('./routes/PageRouter')




app.use('/images', PhotosRouter)
app.use('/comments', CommentsRouter)
app.use('/users', UsersRouter)
app.use('/', PageRouter)

//db connectiom
const sqlPort = 3306;
db.sequelize
.sync({})   // to dump a database .sync({force:true}).
            // Used for testing purposes. Use force true to delete everything in the database
.then(()  => {
    app.listen(sqlPort, () => {
    console.log(
        `MariaDb Connection Successful - localhost://:${sqlPort}.`
    )
})

})
.catch((error) => {
    console.log("Unable to connect to the databse .", error)
})

//server
app.listen(port, () => {
    console.log(`Running photo app on serevr  http://localhost:${port}`)
})







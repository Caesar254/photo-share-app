const { request, response } = require("express");
const express = require("express");
const UsersRouter = express.Router();
const db = require("../models");
const bodyParser = require("body-parser");

UsersRouter.use(bodyParser.urlencoded());
UsersRouter.use(bodyParser.json());

const bcrypt = require("bcryptjs");  //to encrypt paswords when stored in the database. npm install  bcryptjs
const saltRounds = 10; // menas the cause factor. casue factor controls how much time to calculte a single 
                         //bcrypt hash. the higher the casue factor the more the hash round are done

// UsersRouter.route("/login")

// .post( (request, response) => {
//     // username and password are required
//     console.log(request.body)
//     const username = request.body.username;
//     const password = request.body.password;
//     db.user
//       .findOne({ where: { username: username, password: password } }) // findOne is sequelize syntax
//       .then( async(user) => {
//         if (user){
//           bcrypt.compare(password.user.password, (error,same) =>{
//             if(same){
//               console.log("Logged In, user ID =", user.id)
//               request.session.userId = user.id
//               reaponse.redirect('/')
//             }else{
//               response.redirect('/login')

//             }
//           })
//         }

//       })
//       .catch((error) => {
//         response.send("You do not have an account.Try signing up");
//       });
//   });
UsersRouter.route("/login").post(async (request, response) => {
  // username and password are required
  console.log(request.body)
  const username = request.body.username;
  const password = request.body.password;
  db.user
    .findOne({ where: { username: username } })
    .then(async (user) => {
      // console.log("User.password=", user.password)
      // console.log("password = ", password)
      if (user) {
        await bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            //console.log(user.id)
            request.session.userId = user.id; 
            console.log('LOGGED IN')
            response.redirect("/");
          } else {
            response.status(401)
            console.log("401 error");
            response.send("/badlogin"); 
          }
        });
      }else{
        response.send("NO such user")
      }
    })
    .catch((error) => {
            console.log("error");
            response.send(error);
     
    });
});


// UsersRouter.route("/signup")
// .post(async (request, response) => {
//   console.log(request.body)
//   const password = request.body.password;
//   const encryptedPassword = await bcrypt.hash(password, saltRounds); 
//   const email = request.body.email;
//   const username = request.body.username;
// //   console.log(encryptedPassword)
//   db.user
//     .create({ email: email, password: encryptedPassword  ,username: username })
//     //   response.send(user) 
//       .then((user) => {
//         // response.send(user) 
//         response.redirect("/login");
//       })
//       .catch((error) => { 
//         response.send("You do not have an account.Try signing up");
//       });
//   });
UsersRouter.route("/signUp").post(async (request, response) => {
  console.log(request.body)
  const password = request.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  // email, password, username
  const email = request.body.email;
  const username = request.body.username;
//   console.log(encryptedPassword)
  db.user
    .create({ email: email[0], password: encryptedPassword, username: username })
      //response.send(user) // changed in chapter 7.2
      .then((user) => {
        //response.send(user) // changed in chapter 7.2
        response.redirect("/login");
      })
      .catch((err) => {
        err;
      });
  });
module.exports = UsersRouter;

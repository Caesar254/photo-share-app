const express = require('express')
const PageRouter = express.Router()
const db = require('../models')
const fs = require("fs");


// routes
// get request for the home tab
// PageRouter.get("/",(request,response) => {   // can still stay as app.get("/", (request,response))
//     console.log(request.session.userId)
//     if(request.session.userId){
//         db.photos.findAll()  // receive from database
//         .then((photos) => {//function
//             response.render('index', {data: photos});            
//         })
 
//     }else{ // if not logged in/ not in session
//         response.redirect('/login')

//     }
// })
// WE USE THE CODE BELOW INSTADE TO PREVENT UPLOAIDNG WRONG IMAGE FORMATS.
// E.G SOMON MAY CHANGE THE FORMAT OF A DOCUMENT TO .png BUT IT WILL REJECT. IT WIL SCRUB OUT BAD FILES AFTE UPLOAD.


PageRouter.get("/", (request, response) => {
  if (request.session.userId) {
    const { exec } = require("child_process");
    exec(
      `for item in $(ls $(pwd)/public/images); do
      if [ $( file --mime-type $(pwd)/public/images/$item -b ) != "image/jpeg" ] && [ $( file --mime-type $(pwd)/public/images/$item -b ) != "image/png" ]; then
      echo "$(pwd)/public/images/$item"
      fi; 
      done;`,
      (error, stdout, stderr) => {
        if (stdout) {
          fs.unlink(stdout.slice(0, -1), (err) => {
            if (err) {
              throw err;
            }
          });
          console.log(`Deleted ${stdout} because it wasn't an image`);
        }
      }
    );

    db.photos
      .findAll()
      .then((photos) => {
        console.log("GET IMAGES");
        response.render("index", { data: photos });
      })
      .catch((error) => {
        response.send(error);
      });
  } else {
    response.redirect("/login");
  }
});

//adding images through our UI
PageRouter.get('/photo',(request,response)  => {
    console.log('/photo')
    if(request.session.userId){
        
        response.render('photo');
    }else{
        response.render('/login')
    }
})
PageRouter.get("/login", (request, response) => {
    console.log("/LOGGING IN!");
    response.render("login", { data: "" });
  });
  PageRouter.get("/badlogin", (request, response) => {
    console.log("/LOGGING IN!");
    response.render("login", { data: "Bad Login Credentials" });
  });
PageRouter.get('/signup',(request,response)  => {
    console.log('/signup')
    response.render('signup')
})
PageRouter.get("/logout", (request, response) => {
    console.log("logging out");
    request.session.destroy(() => {
      response.redirect("/login");
    });
  });
  PageRouter.get("/*", (request, response) => {
    console.log("404");
    response.render("404");
  });

module.exports = PageRouter;
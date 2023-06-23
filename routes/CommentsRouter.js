// const { request, response } = require("express");
// const express = require("express");
// const CommentsRouter = express.Router();



// CommentsRouter.route("/:photoId")
// .get((request, response) => {
//     const photoId = request.params.photoId;
//     db.comments
//       .findAll({ where: { photoId: photoId } })
//       .then((comment) => {
//         db.photos.findAll({ where: { Id: photoId } }).then((photo) => {
//           response.render("comment", { photo: photo, comment: comment, requestURL: request.url});
//         });
//       })
//       .catch((err) => {
//         response.send(err);
//       });
//   });


//   CommentsRouter.route("/:photoId")
//   .post((request, response) => {
//     console.log(request.body)
//   const photoId = request.params.photoId;
//   const content = request.body.comment;
//   db.comment
//     .create({ photoId: photoId, content: content })
//     .then((comment) => {
//       response.redirect(`/comments${request.url}`);
//     })
//     .catch((err) => {
//       response.send(err);
//     });
// });


// CommentsRouter.route('/:photoId')
// .get((request, response)=>{
//     const photoId = request.params.photoId
//     db.comment.findAll({where:{photoId: photoId}}).then(comment=>{
//         response.send(comment)
//     }).catch((err) =>{
//         response.send(err)
//     })
// })


// module.exports = CommentsRouter;
const express = require("express");
const CommentsRouter = express.Router();
const db = require("../models");
const bodyParser = require("body-parser");
CommentsRouter.use(bodyParser.urlencoded());
CommentsRouter.use(bodyParser.json());
CommentsRouter.use(express.static("public"));

CommentsRouter.route("/:photoId")
.get((request, response) => {
  const photoId = request.params.photoId;
  db.comments
    .findAll({ where: { photoId: photoId } })
    .then((comments) => {
      db.photo.findAll({ where: { Id: photoId } })
      .then((photo) => {
        response.render("comments", { photo: photo, comments: comments, requestURL: request.url});
      });
    })
    .catch((error) => {
      response.send(error);
    });
});
CommentsRouter.route("/:photoId").
post((request, response) => {
    console.log(request.body)
  const photoId = request.params.photoId;
  const content = request.body.comment;
  db.comments
    .create({ photoId: photoId, content: content })
    .then((comments) => {
      response.redirect(`/comments${request.url}`);
    })
    .catch((err) => {
      response.send(err);
    });
});
module.exports = CommentsRouter;

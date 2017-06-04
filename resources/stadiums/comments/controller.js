const Comment = require('../../../models/comment');

module.exports = {
  show(req, res, next) {
      Comment.showComment(req.params.commentId)
        .then((comment_data) => {
          console.log(comment_data);
          res.json(comment_data);
        })
        .catch(err => next(err));
    },
    create(req, res, next) {
      Comment.saveNewComment(req.body.comment)
        .then((comment_data) => {
          // console.log(comment_data);
          res.redirect(`/stadiums/${comment_data.stadium_id}`);
        })
        .catch(err => next(err));
    },
    updateLike(req, res, next) {
      Comment.updateLike(req.params.commentId)
        .then((data) => {
          res.sendStatus(202);
          res.json(data);
          // res.redirect(`/stadiums/${res.locals.stadium.stadium_id}`);

        })
        .catch(err => next(err));
    },
    updateComment(req, res, next) {
      Comment.updateComment(req.body)
        .then((data) => {
          // res.redirect(`/stadiums/${req.params.stadiumId}`);
          res.sendStatus(202);
          res.json(data);
          // res.redirect(`/stadiums/${res.locals.stadium.stadium_id}`);

        })
        .catch(err => next(err));
    },


};

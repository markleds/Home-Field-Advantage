const Stadium = require('../../models/stadium');

module.exports = {
  home(req, res, next) {
      Stadium.findAllStadiums()
        .then((stadiums) => {
          // console.log(stadiums);
          res.locals.stadiums = stadiums;
          next();
        })
        .catch(err => next(err));
    },
    homeNFL(req, res, next) {
      Stadium.findNFLStadiums()
        .then((stadiums) => {
          res.locals.stadiums = stadiums;
          next();
        })
        .catch(err => next(err));
    },
    homeMLB(req, res, next) {
      Stadium.findMLBStadiums()
        .then((stadiums) => {
          res.locals.stadiums = stadiums;
          next();
        })
        .catch(err => next(err));
    },
    index(req, res, next) {
      Stadium.findAllComments(req.params.stadiumId)
        .then((stadium) => {
          console.log(stadium);
          res.locals.stadium = stadium;
          next();
        })
        .catch(err => next(err));
    },
    // index(req, res, next) {
    //   Stadium.findStadium(req.params.stadiumId)
    //     .then((stadium) => {
    //       console.log(stadium);
    //       res.locals.stadium = stadium;
    //       let commentsArr = [];
    //       Stadium.findAllComments(req.params.stadiumId)
    //         .then((comments) => {
    //           commentsArr = comments;
    //         });
    //       console.log(commentsArr);
    //       res.locals.comments = commentsArr;
    //       next();
    //     })
    //     .catch(err => next(err));
    // },
    sortByLikes(req, res, next) {
      Stadium.sortCommentsLikes(req.params.stadiumId)
        .then((stadium) => {
          // console.log(stadium);
          res.locals.stadium = stadium;
          next();
        })
        .catch(err => next(err));
    },
    sortByCategory(req, res, next) {
      Stadium.filterCommentsCategory(req.params.stadiumId, req.params.category)
        .then((stadium) => {
          // console.log(stadium);
          res.locals.stadium = stadium;
          next();
        })
        .catch(err => next(err));
    },
    create(req, res, next) {
      Stadium.saveNewComment(req.body.comment)
        .then((comment_data) => {
          // console.log(comment_data);
          res.redirect(`/stadiums/${comment_data.stadium_id}`);
        })
        .catch(err => next(err));
    },
    update(req, res, next) {
      Stadium.updateComment(req.params.commentId)
        .then((data) => {
          res.sendStatus(202);
          res.json(data);
          // res.redirect(`/stadiums/${res.locals.stadium.stadium_id}`);

        })
        .catch(err => next(err));
    },
    updateLike(req, res, next) {
      Stadium.updateLike(data, req.params.commentId)
        .then((data) => {
          res.sendStatus(202);
          res.json(data);
          // res.redirect(`/stadiums/${res.locals.stadium.stadium_id}`);

        })
        .catch(err => next(err));
    },
    destroy(req, res, next) {
      Stadium.destroyComment(req.params.commentId)
        .then((data) => {
          res.sendStatus(202);
          res.json(data);
          // res.redirect(`/stadiums/${res.locals.stadium.stadium_id}`);

        })
        .catch(err => next(err));
    },



};

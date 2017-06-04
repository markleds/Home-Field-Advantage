module.exports = {

  listStadiums(req, res) {
      res.format({
        /* SEND OUT HTML */
        html() {
            res.render('stadiums/allStadiums', {
              stadium: res.locals.stadiums,
            });
          },
          /* SEND OUT JSON */
          json() {
            res.json(res.locals.stadiums);
          },
      });
    },

    // listComments(req, res) {
    //   res.format({
    //     /* SEND OUT HTML */
    //     html() {
    //       res.render('stadiums/oneStadium', {
    //         stadium: res.locals.stadium,
    //       });
    //     },
    //
    //     /* SEND OUT JSON */
    //     json() {
    //       res.json(res.locals);
    //     },
    //   });
    // },
    listComments(req, res) {
      res.format({
        /* SEND OUT HTML */
        html() {
            res.render('stadiums/oneStadium', {
              stadium: res.locals.stadium,
              comments: res.locals.comments,
            });
          },

          /* SEND OUT JSON */
          json() {
            res.json(res.locals);
          },
      });
    },


}

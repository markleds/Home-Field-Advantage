const router = require('express').Router();
const controller = require('./controller');
const views = require('./viewsController');

// special routes (HTML ONLY)
// router.get('/:stadiumId/new', views.formNew);
// router.get('/:stadiumId/:commentId/edit', controller.getOne, views.formEdit);

// PUT or DELETE a single comment
router.route('/:stadiumId(\\d+)/:commentId(\\d+)/')
  .delete(controller.destroy)
  .put(controller.update);

// route to view all NFL stadiums
router.route('/allstadiums')
  .get(controller.home, views.listStadiums);

// route to view all NFL stadiums
router.route('/nfl')
  .get(controller.homeNFL, views.listStadiums);

// route to view all MLB stadiums
router.route('/mlb')
  .get(controller.homeMLB, views.listStadiums);

router.route('/')
  .get(views.homePage);


// Get all comments by Category
router.route('/:stadiumId(\\d+)/parking')
  .get(controller.sortByLikes, views.listComments);

// Get all comments to /:stadiumId display by most likes DESC
router.route('/:stadiumId(\\d+)/likes')
  .get(controller.sortByLikes, views.listComments);

// CREATE new comment and GET all comments to /:stadiumId
router.route('/:stadiumId(\\d+)')
  .get(controller.index, views.listComments);

// .post(controller.create);
// GET all stadiums to /
// router.route('/')
//   .get(controller.home, views.listStadiums)

module.exports = router;

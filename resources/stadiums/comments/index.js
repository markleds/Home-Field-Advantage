const router = require('express').Router();
const controller = require('./controller');
const views = require('./viewsController');

router.route('/:commentId/update')
  .put(controller.updateComment);

router.route('/:commentId')
  .get(controller.show)
  .put(controller.updateLike);

router.route('/')
  .post(controller.create);


module.exports = router;

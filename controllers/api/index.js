const router = require('express').Router();
const usersRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');


router.use('/user', usersRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);


module.exports = router;
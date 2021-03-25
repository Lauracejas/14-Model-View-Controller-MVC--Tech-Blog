const router = require('express').Router();
const usersRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');


router.use('/users', usersRoutes);
router.use('/users', postRoutes);
router.use('/users', commentRoutes);


module.exports = router;
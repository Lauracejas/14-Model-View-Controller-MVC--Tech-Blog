const router = require('express').Router();
//const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const dashboardData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
        });
        const posts = dashboardData.map((posts) => posts.get({ plain: true }));

        res.render('dashboard', {
            posts, logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            where: {
                id: req.params.id
            },
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            ]
        });
        const post = postData.get({ plain: true });
        res.render('edit-post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new',(req, res) => {
    res.render('new-post');
});



module.exports = router;
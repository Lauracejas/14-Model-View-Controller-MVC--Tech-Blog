const router = require('express').Router();
const { Post, User, Comment } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {posts});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User, 
                {
                    model: Comment,
                    include: [User]
                 }]
        });
        if (postData) {
            const post = postData.get({ plain: true });
            res.render('single-post', {post});
        }   else {
            res.status(400).end();
        }    
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/posts-comment', withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id, {
//             where: {
//                 id: req.params.id
//             },
//             include: [{
//                 model: Comment,
//                 attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//             ]
//         });
//         const posts = postData.get({ plain: true });
//         res.render('posts-comments', {
//             ...posts,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;




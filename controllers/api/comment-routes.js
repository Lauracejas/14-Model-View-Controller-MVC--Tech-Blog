const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async, (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async, (req, res) => {
    try {
        const commentData = await Comment.findAll(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async, (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const commentData = await Comment.create(req.body, {
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

    }
});


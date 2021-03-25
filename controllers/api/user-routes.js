const router = require('express').Router();
const { User, Post, Comment } = require('../../models/user');

router.get('/', async (req, res) => {
    // find all Users    
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    // find one User by its `id` value    
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text'],
                    include: {
                        model: Post,
                        attributes: ['title'],
                    }
                },
            ]
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }

    router.post('/', async (req, res) => {
        try {
          const userData = await User.create(req.body);
      
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
      
            res.status(200).json(userData);
          });
        } catch (err) {
          res.status(400).json(err);
        }
      });      

    router.post('/login', async (req, res) => {
        try {
            const userData = await User.findOne({ where: { user_name: req.body.user_name } });

            if (!userData) {
                res
                    .status(400).json({ message: 'Incorrect password, please try again' });
                return;
            }

            const validPassword = await userData.checkPassword(req.body.password);

            if (!validPassword) {
                res
                    .status(400)
                    .json({ message: 'Incorrect password, please try again' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;

                res.json({ user: userData, message: 'You are now logged in!' });
            });

        } catch (err) {
            res.status(400).json(err);
        }
    });

    router.post('/logout', (req, res) => {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const userData = await User.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
          const userData = await User.destroy({
            where: {
              id: req.params.id,
            },
          });
          if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.status(200).json(userData);
        } catch (err) {
          res.status(500).json(err);
        }
      });



});


module.exports = router;
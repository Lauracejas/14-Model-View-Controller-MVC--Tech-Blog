const { Comment } = require('../models');

const commentData = [{
        comment_text: "There is a lot more to the back end than just controlling the overall functionality of an app or a website.",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Check out Express, Flask, and asp.net. We also recommend checking out this great MDN Web Docs article on server-side frameworks and how to select one.",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "Over the past few years, I had the opportunity to implement or supervise about 10 greenfield projects, both personal and for clients.",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
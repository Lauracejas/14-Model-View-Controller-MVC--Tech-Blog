const { Post } = require('../models');

const postData = [
    {
        title: 'What is a back-end development?',
        content: 'Back-end development dictates how programs function by creating hidden processes that run behind the scenes.',
        user_id: 1
    },
    {
        title: 'Back-end programming languages',
        content: "There are a whole variety of programming languages used on the back end. Here at Codecademy, we teach back-end development primarily in JavaScript, Python, and C#. When you're starting out, we recommend focusing on JavaScript, as having a single language for front end and back end makes for an easier path towards strong full stack development.",
        user_id: 2
    },
    {
        title: 'Should I start with frontend or backend?',
        content: 'When creating a new application, always start with the Front End. More precisely, always implement the UI first, then do the data bindings and only later touch the API and the Back End.',
        user_id: 3
    },
   
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
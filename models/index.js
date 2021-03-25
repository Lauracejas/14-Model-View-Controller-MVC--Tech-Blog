const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users have many Posts
// User.hasMany(Post, {
//     foreignKey: 'user_id',
// });

// Users have many Comments
// User.hasMany(Comment, {
//     foreignKey: 'user_id',    
// })

//Post have many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

//Post belongsTo user
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//Comment belongsTo User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//Comment belongsTo Post
// Comment.belongsTo(Post, {
//     foreignKey: 'post_id',
// });

module.exports = { User, Post, Comment };
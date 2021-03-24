const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

//Users have many Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
});

//Users have many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',    
})

//Post have many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

//Post belongsTo user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

//Comment belongsTo User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

//Comment belongsTo Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };
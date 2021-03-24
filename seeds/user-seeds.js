const { User } = require('../models');

const userData = [{
        username: 'Hellen',
        password: 'abc123'

    },
    {
        username: 'Alicia',
        password: '123abc'
    },
    {
        username: 'Santi',
        password: '1a2b3c'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
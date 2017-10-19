import sequelize from './sequelize';

import Sequelize from 'sequelize';

const User = sequelize.define('user', {
        username: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        displayname: { type: Sequelize.STRING, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false }
    },
    {
        timestamps: false
    });

export default User;
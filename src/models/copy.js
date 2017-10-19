import sequelize from './sequelize';

import Sequelize from 'sequelize';

const Copy = sequelize.define('copy', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: Sequelize.STRING, allowNull: false },
        author: { type: Sequelize.STRING, allowNull: false },
        isbn: { type: Sequelize.STRING }
    },
    {
        timestamps: false
    });

export default Copy;
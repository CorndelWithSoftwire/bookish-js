import sequelize from './sequelize';

import Sequelize from 'sequelize';

const Book = sequelize.define('book', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: Sequelize.STRING, allowNull: false },
        author: { type: Sequelize.STRING, allowNull: false },
        isbn: { type: Sequelize.STRING }
    },
    {
        timestamps: false
    });

export default Book;
import { dbConnectionString } from "../config";

import Sequelize from 'sequelize';

export default new Sequelize(dbConnectionString);

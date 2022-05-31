import { Sequelize } from 'sequelize-typescript';

import { User } from '../models/user.model';
import { Photo } from '../models/photo.model';
import { LoginUser } from '../models/login.model';
import { dbConfig } from '../config/db.config';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      console.log(`dbConfig.DB:${dbConfig.DB}`);
      console.log(`dbConfig.USER: ${dbConfig.USER}`);
      console.log(`dbConfig.PASSWORD: ${dbConfig.PASSWORD}`);
      console.log(`dbConfig.port: ${dbConfig.port}`);
      const sequelize = new Sequelize(
        dbConfig.DB, 
        dbConfig.USER, 
        dbConfig.PASSWORD, 
        {
          host: dbConfig.HOST,
          dialect: "mysql",
          port: Number(dbConfig.port) || 3307,
          pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
          }
        }
      );

      sequelize.addModels([User]);
      sequelize.addModels([Photo]);
      sequelize.addModels([LoginUser]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

require('dotenv-flow').config({
  silent: true
});

export const dbConfig = {
    HOST: process.env.MYSQLDB_HOST,
    USER: process.env.MYSQLDB_USER,
    PASSWORD: process.env.MYSQLDB_ROOT_PASSWORD,
    DB: process.env.MYSQLDB_DATABASE,
    port: process.env.MYSQLDB_DOCKER_PORT,
    dialect:"mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
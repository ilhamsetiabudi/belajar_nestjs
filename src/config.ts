import { ConfigModule } from '@nestjs/config';
export const setEnv = () => {
  return ConfigModule.forRoot();
};

export const mysql = () => {
  return {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
  };
};

export const redis = () => {
  return {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  };
};

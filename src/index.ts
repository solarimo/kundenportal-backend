import { createConnection } from 'typeorm';
import { app } from './app';
import { Address } from './entity/address';
import { Hausnummer } from './entity/hausnummer';
import { ProjectPrice } from './entity/project-price';
import { config } from 'dotenv';
import { User } from './entity/user';
import { RefreshToken } from './entity/refresh-token';
import { initDb } from './bootstrap/bootstrap';


const start = async () => {
  config();

  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET must be defined');
  }

  if(!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET must be defined')
  }

  try {

    //connect to mysql
    const con = await createConnection({
      type: 'mysql',
      host: process.env.DB_DOMAIN || 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'mieter',
      dropSchema: true,
      synchronize: true,
      entities: [Address, Hausnummer, ProjectPrice, User, RefreshToken]
    });
    console.log('Connected to Database');
    await initDb();
    
    
  } catch (error) {
    throw error;
  }




  app.listen(8080, () => {
    console.log('listening...8080 ');

  });
}

start();




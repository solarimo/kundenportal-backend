import { createConnection } from 'typeorm';
import { app } from './app';
import { Address } from './entity/address';
import { Hausnummer } from './entity/hausnummer';
import 'reflect-metadata';
import { ProjectPrice } from './entity/project-price';


const start = async () => {

  try {

    //connect to mysql
    const con = await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'mieter',
      synchronize: true,
      entities: [Address, Hausnummer, ProjectPrice]
    });
    console.log('Connected to Database');
    
    
  } catch (error) {
    console.error(error);
  }




  app.listen(8080, () => {
    console.log('listening...8080 ');

  });
}

start();




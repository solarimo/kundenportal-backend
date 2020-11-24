import { Connection, createConnection, getConnection, getRepository } from "typeorm";
import { Address } from "../entity/address";
import { Hausnummer } from "../entity/hausnummer";
import { ProjectPrice } from "../entity/project-price";
import { User } from "../entity/user";
import { config } from 'dotenv';
import { RefreshToken } from "../entity/refresh-token";
import { initDb } from "../bootstrap/bootstrap";

const entities = [Address, Hausnummer, ProjectPrice, User, RefreshToken];


beforeAll(async () => {
  
  config();

  await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'mieter-test',
    entities,
    synchronize: true,
    dropSchema: true
  }).catch(e => console.log(e)
  );
  
  await initDb();
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});


afterAll(async () => {
  await getConnection().close();
});


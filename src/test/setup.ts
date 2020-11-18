import { Connection, createConnection, getConnection, getRepository } from "typeorm";
import { Address } from "../entity/address";
import { Hausnummer } from "../entity/hausnummer";
import { ProjectPrice } from "../entity/project-price";
import { User } from "../entity/user";
import { config } from 'dotenv';
import { RefreshToken } from "../entity/refresh-token";

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
  )  

  await initDb();
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});


const initDb = async () => {

  const hausnummer = new Hausnummer();
  hausnummer.nummer = '15A';
  await getRepository(Hausnummer).save(hausnummer);

  const hausnummer2 = new Hausnummer();
  hausnummer2.nummer = '11';
  await getRepository(Hausnummer).save(hausnummer2);

  const projectPrice = new ProjectPrice();
  projectPrice.grundpreis = 120.34;
  projectPrice.arbeitspreis = 29.88;
  projectPrice.grundpreisGv = 130.23;
  projectPrice.arbeitspreisGv = 31.78;
  await getRepository(ProjectPrice).save(projectPrice);

  const addr = new Address();
  addr.strasse = 'Musterstraße';
  addr.postleitzahl = '12345';
  addr.stadt = 'Musterstadt';
  addr.hausnummern = [hausnummer, hausnummer2];
  addr.projectPrice = projectPrice;

  await getRepository(Address).save(addr);

}

afterAll(async () => {
  await getConnection().close();
});


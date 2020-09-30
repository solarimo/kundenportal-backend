import { Connection, createConnection, getRepository } from "typeorm";
import { Address } from "../entity/address";
import { Hausnummer } from "../entity/hausnummer";

let con: Connection;

beforeAll(async () => {
  con = await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'mieter',
    synchronize: true,
    entities: [Address, Hausnummer]
  });

  await initDb();
});


const initDb = async () => {

  const hausnummer = new Hausnummer();
  hausnummer.nummer = '15A';
  await getRepository(Hausnummer).save(hausnummer);

  const hausnummer2 = new Hausnummer();
  hausnummer2.nummer = '11';
  await getRepository(Hausnummer).save(hausnummer2);

  const addr = new Address();
  addr.strasse = 'Musterstraße';
  addr.postleitzahl = '12345';
  addr.stadt = 'Musterstadt';
  addr.hausnummern = [hausnummer, hausnummer2];

  await getRepository(Address).save(addr);

}

afterAll(() => {
  con.close();
})

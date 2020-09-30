import { getConnection, getManager, getRepository } from "typeorm";
import { AddressDto } from "../domain/user-dto";
import { Address } from "../entity/address";
import { Hausnummer } from "../entity/hausnummer";

export const initDb = async () => {

  const hausnummer = new Hausnummer();
  hausnummer.nummer = '2';
  await getRepository(Hausnummer).save(hausnummer);

  const addr = new Address();
  addr.strasse = 'Toitz-Rustow';
  addr.postleitzahl = '17121';
  addr.stadt = 'Loitz';
  addr.hausnummern = [hausnummer];

  await getRepository(Address).save(addr);

}
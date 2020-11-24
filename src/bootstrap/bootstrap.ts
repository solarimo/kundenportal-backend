import { getRepository } from "typeorm";
import { Address } from "../entity/address";
import { Hausnummer } from "../entity/hausnummer";
import { ProjectPrice } from "../entity/project-price";

export const initDb = async () => {

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
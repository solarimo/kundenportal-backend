import { v4 as randomUUID } from 'uuid';
import { Kuendigung } from '../../domain/zaehlerdaten';

export const getUserDto = (args?: any) => {
  return {
    addressId: randomUUID(),
    anrede:  args?.anrede || 'HERR',
    titel: 'PROF_DR',
    vorname: 'Max',
    nachname: 'Mustermann',
    geburtsdatum: args?.geburtsdatum || '20.01.1980',
    telefonnummer: '0152489430590',
    email: args?.email || 'max.muster@gmail.com',
    password:  args?.password || 'randomPassword',
    iban: 'DE11111111111111111111',
    kontoinhaber: 'Peter Lustig',
    rabattCode: '12234',
    empfehlung: 'Freund',
    zaehlerdaten: args?.zaehlerdaten || getZaehlerdaten(),
  }
}

export const getZaehlerdaten = (args?: any) => {
  return {
    type: args?.type || 'ANBIETERWECHSEL',
    zaehlernummer: 'sdfhJHK349jHJ',
    bisherigerAnbieter: args?.bisherigerAnbieter || 'eon',
    bereitsGekuendigt:  args?.bereitsGekuendigt || Kuendigung.BEREITS_GEKUENDIGT,
    vertragslaufzeitBis: new Date()
  }
}
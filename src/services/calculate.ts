/* Functions um Abschlag und CO2 Einsparung zu berechenen */

const SPAR_FACTOR = 0.424;


/** returnt den floored monatlichen Abschlag */
export function calculateByStromverbrauch(
  stromverbrauch: number,
  grundpreis: number,
  arbeitspreis: number
) {
  const arbeitspreisInCent = arbeitspreis / 100;
  const monatlAbschlag = ( grundpreis / 12 ) + (( stromverbrauch * arbeitspreisInCent ) / 12);
  return Math.floor(monatlAbschlag);
}

/** returnt das jaehrliche Ersparnis im Vergleich zum Grundversorger */
export function calculateErsparnisYear(monatlAbschlagGv: number, monatlAbschlag: number) {
  return (monatlAbschlagGv * 12) - (monatlAbschlag * 12);
}

/** returnt das CO2 Ersparnis in Kg */
export function calcualteErspparnisC02(stromverbrauch: number) {
  return SPAR_FACTOR * stromverbrauch;
}

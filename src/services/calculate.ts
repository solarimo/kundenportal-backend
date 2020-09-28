/* Functions um Abschlag und CO2 Einsparung zu berechenen */


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

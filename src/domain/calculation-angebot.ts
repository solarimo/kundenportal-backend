export class CalculationAngebotDto {

  stromverbrauch: number;
  monatlAbschlag: number;
  ersparnisPerYear: number;
  ersparniC02Kg: number;
  grundpreis: number;
  arbeitspreis: number;

  constructor(
    stromverbrauch: number,
    monatlAbschlag: number,
    ersparnisPerYear: number,
    ersparniC02Kg: number,
    grundpreis: number,
    arbeitspreis: number
  ) {
    this.stromverbrauch = stromverbrauch;
    this.monatlAbschlag = monatlAbschlag;
    this.ersparnisPerYear = ersparnisPerYear;
    this.ersparniC02Kg = ersparniC02Kg;
    this.grundpreis = grundpreis;
    this.arbeitspreis = arbeitspreis;
  }

}
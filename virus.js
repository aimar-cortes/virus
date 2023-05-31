import Cartes from './cartes.js';

/**
 * Classe virus que és un extends de la classe Cartes.
 */
export default class Virus extends Cartes {
  /**
   * Igual que en el constructor de cures,
   * necessitem variables per crear la baralla de virus.
   * @param {[]} color
   * @param {[]} tipus
   */
  constructor(color, tipus) {
    super(color);
    this.arrayvirus = [];
    this.tipus = tipus;
  }
  /**
   * Funció per crear la baralla de virus
   */
  crearBarallaVirus() {
    for (const color of Cartes.color) {
      for (let i = 0; i < 4; i++) {
        this.arrayvirus.push(new Virus(color, 'Virus'));
      }
    }
    this.arrayvirus.push(new Virus('multi', 'Virus'));
  }
}

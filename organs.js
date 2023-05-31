import Cartes from './cartes.js';

/**
 * Classe Organ que es un extends de la classe cartes
 */
export default class Organs extends Cartes {
  /**
   * En el constructor necessitem les següents
   * variables per especificar l'estat de les cartes.
   * @param {String} color
   * @param {int} infectat
   * @param {boolean} inmunitat
   * @param {String} tipus
   */
  constructor(color, infectat, inmunitat, tipus) {
    super(color);
    this.arrayorgans = [];
    this.tipus = tipus;
  }

  /**
   * Funció per crear la baralla d'organs amb els diferents colors.
   */
  crearBarallaOrgans() {
    for (const color of Cartes.color) {
      for (let i = 0; i < 5; i++) {
        this.arrayorgans.push(new Organs(color, 0, false, 'Organs'));
      }
    }
    this.arrayorgans.push(new Organs('multi', 0, false, 'Organs'));
  }
}

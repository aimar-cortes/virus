import Cartes from './cartes.js';
/**
 * Classe de cures que és un extends de la classe Cartes.
 */
export default class Cures extends Cartes {
/**
 * En el constructor passem variables
 * que necessitarem per inicialitzar les cartes de tipus cures.
 * @param {String} color
 * @param {string} tipus
 */
  constructor(color, tipus) {
    super(color);
    this.arraycures = [];
    this.tipus = tipus;
  }

  /**
   * Funció per crear una baralla de cures.
   */
  crearBarallaCures() {
    let contador = 0;
    for (const color of Cartes.color) {
      for (let i = 0; i < 4; i++) {
        this.arraycures.push(new Cures(color, 'Cures'));
      }
    }
    while (contador < 4) {
      this.arraycures.push(new Cures('multi', 'Cures'));
      contador++;
    }
  }
}

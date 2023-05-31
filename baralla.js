import Organs from './organs.js';
import Virus from './virus.js';
import Cures from './cures.js';

/**
 * Classe de la baralla
 */
export default class Baralla {
  /**
   * Constructor de la classe Baralla
   */
  constructor() {
    this.baralla = [];
  }

  /**
   * Funció per crear les cartes i concatenar-les en una mateixa baralla
   */
  crearCartes() {
    const organ = new Organs();
    const virus = new Virus();
    const cura = new Cures();
    organ.crearBarallaOrgans();
    virus.crearBarallaVirus();
    cura.crearBarallaCures();
    console.log((this.baralla));
    this.baralla = organ.arrayorgans.concat(virus.arrayvirus, cura.arraycures);
    console.log((this.baralla));
  }

  /**
   * Funció per barrejar les cartes de la baralla concatenada
   */
  barrejar() {
    const llargada = this.baralla.length;
    for (let i = llargada - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const Barrejada = this.baralla;
      [Barrejada[i], Barrejada[j]] = [Barrejada[j], Barrejada[i]];
    }
    console.log(this.baralla);
  }
}

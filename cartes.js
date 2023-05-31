/**
 * Classe de cartes on especifiquem els tipus.
 */
export default class Cartes {
  static color = ['groc', 'blau', 'vermell', 'verd'];

  /**
   * Constructor de la classe Cartes.
   * @param {String} color
   */
  constructor(color) {
    this.color = color;
  }
}

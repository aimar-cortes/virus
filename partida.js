import {prohibir} from './main.js';

/**
 * Classe partida on s'executa tot el joc.
 */
export default class partida {
  /**
     * @param {Baralla} baralla
     * @param {Jugador} jugador
     * @param {Jugador} maquina
     * @param {torn} torn
     */
  constructor(baralla, jugador, maquina, torn) {
    this.baralla = baralla;
    this.jugador = jugador;
    this.maquina = maquina;
    this.blau = true;
    this.vermell = true;
    this.verd = true;
    this.groc = true;
    this.multi = true;
    this.blauMaquina = true;
    this.vermellMaquina = true;
    this.verdMaquina = true;
    this.grocMaquina = true;
    this.multiMaquina = true;
    this.torn = torn;
    this.posicio1 = false;
    this.posicio2 = false;
    this.posicio3 = false;
    this.posicio0 = false;
    this.estatGroc = 0;
    this.estatVerd = 0;
    this.estatVermell = 0;
    this.estatBlau = 0;
    baralla.crearCartes();
  }/**
     * Funció per cridar la baralla
     */
  cridarbarrejar() {
    this.baralla.barrejar();
    this.donarbaralla();
  }
  /**
     * Funcio per donar carta i baralla al jugador.
     */
  donarbaralla() {
    while (this.jugador.cartesJugador < 3) {
      const LlargadaArray = this.baralla.baralla.length;
      const aleatori = Math.floor(Math.random() * (LlargadaArray));
      const llargada = this.baralla.baralla[aleatori];
      this.jugador.arrayjugador.push(llargada);
      const tipusCarta = this.baralla.baralla[aleatori].tipus;
      const color = this.baralla.baralla[aleatori].color;
      this.jugador.cartesJugador++;
      this.baralla.baralla.splice(aleatori, 1);
      const image = `./imatges/${tipusCarta+color}.png`;
      const imatge = document.createElement('img');
      imatge.src = image;
      const tipus = llargada.tipus;
      imatge.setAttribute('tipus', tipus);
      const colorImatge = llargada.color;
      imatge.setAttribute('color', colorImatge);
      const div = document.getElementById('cartes');
      console.log(image);
      div.appendChild(imatge);
    }
    this.donarBarallaMaquina();
  }

  /**
     *Funció per donar cartes i baralla a la maquina.
     */
  donarBarallaMaquina() {
    while (this.maquina.cartesJugador < 3) {
      const LlargadaArrayMaquina = this.baralla.baralla.length;
      const aleatoriMaquina = Math.floor(Math.random() *
      (LlargadaArrayMaquina));
      const llargadaMaquina = this.baralla.baralla[aleatoriMaquina];
      this.maquina.arrayjugador.push(llargadaMaquina);
      const tipusCartaMaquina = this.baralla.baralla[aleatoriMaquina].tipus;
      const color = this.baralla.baralla[aleatoriMaquina].color;
      this.maquina.cartesJugador++;
      this.baralla.baralla.splice(aleatoriMaquina, 1);
      const image = `./imatges/${tipusCartaMaquina+color}.png`;
      const imatge = document.createElement('img');
      imatge.setAttribute('tipus', tipusCartaMaquina);
      imatge.setAttribute('color', color);
      imatge.src = image;
      const div = document.getElementById('cartesMaquina');
      console.log(image);
      div.appendChild(imatge);
    }
  }

  /**
   * Funció per adaptar el tamany de la imatge
   * secundaria (cura o virus) en la carta d'organ.
     * @param {int} posicio
     * @param {string} carta
     */
  calcularEscalada(posicio, carta) {
    if (posicio === 0) {
      if ( this.posicio0 === true) {
        carta.classList.add('primerasegonaposicio');
      } else {
        carta.classList.add('primeraposicio');
        this.posicio0 = true;
      }
    } else if (posicio === 1) {
      if (this.posicio1 === true) {
        carta.classList.add('segonasegonaposicio');
      } else {
        carta.classList.add('segonaposicio');
        this.posicio1 = true;
      }
    } else if (posicio === 2) {
      if (this.posicio2 === true) {
        carta.classList.add('tercerasegonaposicio');
      } else {
        carta.classList.add('terceraposicio');
        this.posicio2 = true;
      }
    } else if (posicio === 3) {
      if (this.posicio3 === true) {
        carta.classList.add('quartasegonaposicio');
      } else {
        carta.classList.add('quartaposicio');
        this.posicio3 = true;
      }
    }
  }/**
     *Funció trobar la carta i retornar la posicio d'aquesta.
     * @param {string} color
     * @param {string} tipus
     * @return {int} {number}
     */
  espaiCartaSecundaria(color, tipus) {
    let contador = 0;
    let posicio = 0;
    if (this.torn === 'jugador') {
      if (tipus === 'Virus') {
        const div = document.querySelector('#taulerMaquina');
        const imgs = div.querySelectorAll('img');
        imgs.forEach(function(img) {
          if (img.getAttribute('color') === color &&
                        img.getAttribute('tipus') === 'Organs' ||
                        img.getAttribute('color') === 'multi') {
            posicio = contador;
          } else if (img.getAttribute('tipus') === 'Organs' &&
                        img.getAttribute('color') !== color) {
            contador++;
          }
        });
        return posicio;
      } else {
        const div = document.querySelector('#taulerJugador');
        const imgs = div.querySelectorAll('img');
        imgs.forEach(function(img) {
          if (img.getAttribute('color') === color &&
                        img.getAttribute('tipus') === 'Organs' ||
                        img.getAttribute('color') === 'multi') {
            posicio = contador;
          } else if (color === 'multi') {
            posicio = contador;
          } else if (img.getAttribute('tipus') === 'Organs' &&
                        img.getAttribute('color') !== color) {
            contador++;
          }
        });
        return posicio;
      }
    } else if (this.torn === 'maquina') {
      if (tipus === 'Virus') {
        const div = document.querySelector('#taulerJugador');
        const imgs = div.querySelectorAll('img');
        imgs.forEach(function(img) {
          if (img.getAttribute('color') === color &&
                        img.getAttribute('tipus') === 'Organs' ||
                        img.getAttribute('color') === 'multi') {
            posicio = contador;
            imgs[posicio].setAttribute('estat', '-1');
          } else if (img.getAttribute('tipus') === 'Organs' &&
                        img.getAttribute('color') !== color) {
            contador++;
          }
        });
        return posicio;
      } else {
        const div = document.querySelector('#taulerMaquina');
        const imgs = div.querySelectorAll('img');
        imgs.forEach(function(img) {
          if (img.getAttribute('color') === color &&
                        img.getAttribute('tipus') === 'Organs' ||
                        img.getAttribute('color') === 'multi') {
            posicio = contador;
            imgs[posicio].setAttribute('estat', '1');
          } else if (color === 'multi') {
            posicio = contador;
          } else if (img.getAttribute('tipus') === 'Organs' &&
                        img.getAttribute('color') !== color) {
            contador++;
          }
        });
        return posicio;
      }
    }
  }/**
     * Funció per verificar la carta entrant en el
     * tauler del jugador.
     * @param {string} color
     * @param {boolean} condicio
     * @param {string} torn
     * @param {string} tipus
     * @return {boolean} {boolean}
     */
  verificarCarta(color, condicio, torn, tipus) {
    if (color === 'blau' && this.blau === condicio ||
            torn === 'jugador' && tipus === 'Virus' &&
            color === 'blau' && this.blau === condicio) {
      this.blau = false;
      return true;
    } else if (color === 'vermell' && this.vermell === condicio ||
            torn === 'jugador' && tipus === 'Virus' &&
            color === 'vermell' && this.vermell === condicio) {
      this.vermell = false;
      return true;
    } else if (color === 'groc' && this.groc === condicio ||
            torn === 'jugador' && tipus === 'Virus' &&
            color === 'groc' && this.groc === condicio) {
      this.groc = false;
      return true;
    } else if (color === 'verd' && this.verd === condicio ||
            torn === 'jugador' && tipus === 'Virus' &&
            color === 'verd' && this.verd === condicio) {
      this.verd = false;
      return true;
    } else if (color === 'multi' && (tipus === 'Cures' ||
            tipus === 'Virus') && ( this.verd === condicio ||
            this.groc === condicio || this.vermell === condicio ||
            this.multi === condicio || this.blau === condicio)) {
      this.multi = false;
      return true;
    } else {
      return false;
    }
  }/**
     * Funció per treure la carta tirada o descartada de
     * la baralla del jugador.
     * @param {carta} carta
     * @param {string} color
     * @param {string} tipus
     */
  treureCartaJugador(carta, color, tipus) {
    let contador = 0;
    let verificador = true;
    while (contador < this.jugador.arrayjugador.length &&
    verificador === true) {
      console.log(this.jugador.arrayjugador[contador].tipus);
      if (color === this.jugador.arrayjugador[contador].color &&
                tipus === this.jugador.arrayjugador[contador].tipus) {
        this.jugador.arrayjugador.splice(contador, 1);
        verificador = false;
      }
      contador++;
      console.log(this.jugador);
    }
  }/**
     * Funció per les cartes que no siguin organs.
     * @param {boolean} verificar
     * @param {string} contenidor
     * @param {carta} carta
     * @param {string} color
     * @param {string} tipus
     * @param {string} torn
     */
  noEsOrgan(verificar, contenidor, carta, color, tipus, torn) {
    verificar = this.verificarCarta(color, false, torn, tipus);
    if (verificar === false) {
      if (torn === 'maquina') {
        const altrecontenidor = document.getElementById('cartesMaquina');
        altrecontenidor.insertBefore(carta, altrecontenidor[2]);
      } else {
        contenidor.insertBefore(carta, contenidor[2]);
      }
    } else {
      const posicio = this.espaiCartaSecundaria(color, tipus);
      const estatCarta = this.cartaTrobadaJugador(tipus, color);
      console.log(estatCarta);
      if (torn === 'maquina' && tipus === 'Virus' &&
          estatCarta <= 0 && estatCarta > -1) {
        this.canviTorn();
        this.calcularEscalada(posicio, carta);
        this.maquina.cartesJugador--;
        this.donarBarallaMaquina();
      } else if (torn === 'jugador' && tipus === 'Cures') {
        this.canviTorn();
        this.calcularEscalada(posicio, carta);
        this.jugador.cartesJugador--;
        this.donarbaralla();
        this.treureCartaJugador(carta, color, tipus);
      } else if (estatCarta > 0) {
        this.borrarCartes();
      } else {
        if (torn === 'maquina') {
          const altrecontenidor = document.getElementById('cartesMaquina');
          altrecontenidor.insertBefore(carta, altrecontenidor[2]);
        } else {
          contenidor.insertBefore(carta, contenidor[2]);
        }
      }
    }
  }/**
     * Funció dedicada principalment cap a les cartes que son organs.
     * @param {boolean} verificar
     * @param {string} contenidor
     * @param {carta} carta
     * @param {string} color
     * @param {string} tipus
     * @param {int} contadorCartes
     */
  esOrgan(verificar, contenidor, carta, color, tipus, contadorCartes ) {
    contadorCartes++;
    verificar = this.verificarCarta(color, true);
    if (verificar === true) {
      this.canviTorn();
      this.treureCartaJugador(carta, color, tipus);
      this.jugador.cartesJugador--;
      console.log(this.jugador);
      this.donarbaralla();
      carta.style.position = 'block';
      carta.style.zIndex = 0;
    } else {
      contenidor.insertBefore(carta, contenidor[2]);
    }
  }/**
     * Funció per canviar de torn.
     * @return {string}
     */
  canviTorn() {
    if (this.torn === 'jugador') {
      this.torn = 'maquina';
      console.log(this.torn);
      document.getElementById('tornActual')
          .innerHTML = 'El torn actual es: Maquina';
      prohibir('jugador');
      return 'maquina';
    } else {
      this.torn = 'jugador';
      console.log(this.torn);
      document.getElementById('tornActual')
          .innerHTML = 'El torn actual es: Jugador';
      prohibir('maquina');
      return 'jugador';
    }
  }/**
     * Funció per donar funcionalitat als botons que apareixen
     * en l'html.
     */
  posarBotons() {
    document.getElementById('botoRobarCartes').addEventListener('click', ()=>{
      this.donarbaralla();
      this.donarBarallaMaquina();
      this.canviTorn();
    });
  }/**
     * Funcio dedicada principalment a les cartes que siguin
     * organs i formin part de la maquina
     * @param {boolean} verificarMaquina
     * @param {String} contenidor
     * @param {carta} carta
     * @param {string} color
     * @param {string} tipus
     * @param {int} contadorCartesMaquina
     */
  esOrganMaquina(verificarMaquina,
      contenidor, carta,
      color, tipus, contadorCartesMaquina ) {
    contadorCartesMaquina++;
    verificarMaquina = this.verificarCartaMaquina(color, true, tipus);
    if (verificarMaquina === true) {
      this.canviTorn();
      this.treureCartaJugador(carta, color, tipus);
      this.maquina.cartesJugador--;
      console.log(this.maquina);
      this.donarBarallaMaquina();
      carta.style.position = 'block';
      carta.style.zIndex = 0;
    } else {
      contenidor.insertBefore(carta, contenidor[2]);
    }
  }/**
     * Funció dedicada a les cortes que no siguin organs
     * i que formin part de la maquina
     * @param {boolean} verificarMaquina
     * @param {string} contenidor
     * @param {carta} carta
     * @param {string} color
     * @param {string} tipus
     * @param {string} torn
     */
  noEsOrganMaquina(verificarMaquina, contenidor, carta, color, tipus, torn) {
    verificarMaquina = this.verificarCartaMaquina(color, false, torn, tipus);
    if (verificarMaquina === false) {
      if (torn === 'jugador') {
        const altrecontenidor = document.getElementById('cartes');
        altrecontenidor.insertBefore(carta, altrecontenidor[2]);
      } else {
        contenidor.insertBefore(carta, contenidor[2]);
      }
    } else {
      const tornMaquina = this.canviTorn();
      const posicio = this.espaiCartaSecundaria(color, tipus, '#taulerJugador');
      if (tornMaquina === 'maquina' && tipus === 'Virus') {
        this.calcularEscalada(posicio, carta);
        this.jugador.cartesJugador--;
        this.donarbaralla();
        this.treureCartaJugador(carta, color, tipus);
      } else if ( tornMaquina === 'jugador' && tipus === 'Cures') {
        this.calcularEscalada(posicio, carta);
        this.maquina.cartesJugador--;
        this.donarBarallaMaquina();
      } else {
        const altrecontenidor = document.getElementById('cartes');
        altrecontenidor.insertBefore(carta, altrecontenidor[2]);
      }
    }
  }/**
     * Funció dedicada a verificar les cartes de la maquina
     * @param {string} colorMaquina
     * @param {boolean} condicio
     * @param {string} torn
     * @param {string} tipus
     * @return {boolean}
     */
  verificarCartaMaquina(colorMaquina, condicio, torn, tipus) {
    if (colorMaquina === 'blau' && this.blauMaquina === condicio ||
            torn === 'maquina' && tipus === 'Virus' &&
            colorMaquina === 'blau' && this.blauMaquina === condicio) {
      this.blauMaquina = false;
      return true;
    } else if (colorMaquina === 'vermell' && this.vermellMaquina === condicio ||
            torn === 'maquina' && tipus === 'Virus' &&
            colorMaquina === 'vermell' &&
            this.vermellMaquina === condicio) {
      this.vermellMaquina = false;
      return true;
    } else if (colorMaquina === 'groc' && this.grocMaquina === condicio ||
            torn === 'maquina' && tipus === 'Virus' &&
            colorMaquina === 'groc' && this.grocMaquina === condicio) {
      this.grocMaquina = false;
      return true;
    } else if (colorMaquina === 'verd' && this.verdMaquina === condicio ||
            torn === 'maquina' && tipus === 'Virus' &&
            colorMaquina === 'verd' && this.verdMaquina === condicio) {
      this.verdMaquina = false;
      return true;
    } else if (colorMaquina === 'multi' && ( this.verdMaquina === condicio ||
            this.grocMaquina === condicio || this.vermellMaquina === condicio ||
            this.blauMaquina === condicio || this.multiMaquina === condicio ||
            torn === 'maquina' &&
        tipus === 'Virus' && colorMaquina === 'multi')) {
      this.multiMaquina = true;
      return true;
    } else {
      return false;
    }
  }/**
     * Funcio per retornar el torn actual
     * @return {torn} {torn}
     */
  getTorn() {
    return this.torn;
  }

  /**
   * Funció per trobar la carta secundaria
   * @param {string} tipus
   * @param {string} color
   * @return {return} {number}
   */
  cartaTrobadaJugador(tipus, color) {
    if (color === 'blau') {
      if (tipus === 'Virus') {
        this.estatBlau = this.estatBlau--;
        return this.estatBlau;
      } else if (tipus === 'Cures') {
        this.estatBlau = this.estatBlau++;
        return this.estatBlau;
      }
    }
    if (color === 'verd') {
      if (tipus === 'Virus') {
        this.estatVerd = this.estatVerd--;
        return this.estatVerd;
      } else if (tipus === 'Cures') {
        this.estatVerd = this.estatVerd++;
        return this.estatVerd;
      }
    }
    if (color === 'vermell') {
      if (tipus === 'Virus') {
        this.estatVermell = this.estatVermell--;
        return this.estatVermell;
      } else if (tipus === 'Cures') {
        this.estatVermell = this.estatVermell++;
        return this.estatVermell;
      }
    }
    if (color === 'groc') {
      if (tipus === 'Virus') {
        this.estatGroc = this.estatGroc--;
        return this.estatGroc;
      } else if (tipus === 'Cures') {
        this.estatGroc = this.estatGroc++;
        return this.estatGroc;
      }
    }
  }
}

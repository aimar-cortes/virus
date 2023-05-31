import Baralla from './baralla.js';
import Jugador from './jugador.js';
import partida from './partida.js';

const drag = document.getElementById('cartes');
const drop = document.getElementById('taulerJugador');
const basura = document.getElementById('imatgeBasura');
const dragMaquina = document.getElementById('cartesMaquina');
const dropMaquina = document.getElementById('taulerMaquina');
const baralla = new Baralla();
const jugador = new Jugador();
const maquina = new Jugador();
const torn = 'jugador';
const joc = new partida(baralla, jugador, maquina, torn);
console.log(maquina);
console.log(jugador);
window.onload = function() {
  joc.cridarbarrejar();
  console.log(joc.jugador);
  joc.posarBotons();
};
const sacarJugador = Sortable.create(drag, {
  group: 'shared',
  animation: 150,
  onAdd: function(t) {
  },

});
const sacarMaquina = Sortable.create(dragMaquina, {
  group: 'shared',
  animation: 150,
  disabled: true,
  onAdd: function(t) {
  },

});
const arrastrarMaquina = Sortable.create(dropMaquina, {
  group: {
    name: 'shared',
  },
  animation: 150,
  onAdd: function(evtMaquina) {
    const verificar = false;
    const contadorCartes = 0;
    const torn = joc.getTorn();
    const contenidor = document.getElementById('cartesMaquina');
    const cartaMaquina = evtMaquina.item;
    const tipusMaquina = cartaMaquina.getAttribute('tipus');
    const color = cartaMaquina.getAttribute('color');
    if (tipusMaquina === 'Cures') {
      joc.noEsOrganMaquina(verificar,
          contenidor, cartaMaquina, color,
          tipusMaquina, torn);
    } else if (tipusMaquina === 'Virus') {
      if (torn === 'maquina') {
        contenidor.insertBefore(cartaMaquina, contenidor[2]);
      } else if (torn === 'jugador') {
        const altrecontenidor = document.getElementById('cartes');
        joc.noEsOrganMaquina(verificar,
            altrecontenidor, cartaMaquina,
            color, tipusMaquina, torn);
      }
    } else if (contadorCartes < 3) {
      if (torn === 'jugador') {
        const altrecontenidor = document.getElementById('cartes');
        altrecontenidor.insertBefore(cartaMaquina, contenidor[2]);
      } else {
        joc.esOrganMaquina(verificar,
            contenidor, cartaMaquina,
            color, tipusMaquina, contadorCartes);
      }
    } else {
      contenidor.insertBefore(cartaMaquina, contenidor[2]);
    }
  },
});
const arrastrar = Sortable.create(drop, {
  group: {
    name: 'shared',
  },
  sort: false,
  onAdd: function(evt) {
    const verificar = false;
    const contadorCartes = 0;
    const contenidor = document.getElementById('cartes');
    const carta = evt.item;
    const torn = joc.getTorn();
    const tipus = carta.getAttribute('tipus');
    const color = carta.getAttribute('color');
    if (tipus === 'Cures') {
      joc.noEsOrgan(verificar, contenidor, carta, color, tipus, torn);
    } else if (tipus === 'Virus') {
      if (torn === 'jugador') {
        joc.noEsOrgan(verificar, contenidor, carta, color, tipus, torn);
      } else if (torn ==='maquina') {
        const altrecontenidor = document.getElementById('cartesMaquina');
        joc.noEsOrgan(verificar, altrecontenidor, carta, color, tipus, torn);
      }
    } else if (contadorCartes < 3) {
      if (torn === 'maquina') {
        const altrecontenidor = document.getElementById('cartesMaquina');
        altrecontenidor.insertBefore(carta, altrecontenidor[2]);
      } else {
        joc.esOrgan(verificar, contenidor, carta, color, tipus, contadorCartes);
      }
    } else {
      contenidor.insertBefore(carta, contenidor[2]);
    }
  },
});
Sortable.create(basura, {
  group: 'shared',
  animation: 150,
  onAdd: function(canviar) {
    const cartaTirada = canviar.item;
    const tipusCartaTirada = cartaTirada.getAttribute('tipus');
    const colorCartaTirada = cartaTirada.getAttribute('color');
    const torn = joc.getTorn();
    arrastrar.option('disabled', true);
    arrastrarMaquina.option('disabled', true);
    if (torn === 'jugador') {
      jugador.cartesJugador--;
      joc.treureCartaJugador(cartaTirada, colorCartaTirada, tipusCartaTirada);
    } else {
      maquina.cartesJugador--;
    }
  },
});

/**
 * Funcio per restringir els moviments dels jugadors.
 * @param {string} castigat
 */
export function prohibir(castigat) {
  if (castigat === 'jugador') {
    sacarMaquina.option('disabled', false);
    sacarJugador.option('disabled', true);
    arrastrar.option('draggable', false);
    arrastrarMaquina.option('draggable', false);
    arrastrar.option('disabled', false);
    arrastrarMaquina.option('disabled', false);
  } else {
    sacarMaquina.option('disabled', true);
    sacarJugador.option('disabled', false);
    arrastrar.option('disabled', false);
    arrastrarMaquina.option('disabled', false);
  }
}

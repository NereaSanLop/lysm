const YOUTUBE_PLAYLIST_ID = 'RDEM9-GaHcaopNoPYSd_W4Of6g';

if (sessionStorage.getItem('lysm_login_ok') !== '1') {
  window.location.replace('../index.html');
}

const playlistPanel = document.getElementById('playlistPanel');
const playlistFrame = document.getElementById('playlistFrame');
const typedText = document.getElementById('typedText');

if (YOUTUBE_PLAYLIST_ID) {
  playlistFrame.src = `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(YOUTUBE_PLAYLIST_ID)}`;
  playlistPanel.hidden = false;
}

const FRASES = Array.isArray(window.HOMEPAGE_PHRASES) && window.HOMEPAGE_PHRASES.length > 0
  ? window.HOMEPAGE_PHRASES
  : ['Frases no configuradas.'];

let fraseIndex = 0;
let charIndex = 0;
let borrando = false;

const velocidadEscritura = 85;
const velocidadBorrado = 45;
const pausaAlFinal = 1400;
const pausaAntesDeEscribir = 300;

function animarTexto() {
  const frase = FRASES[fraseIndex];

  if (!borrando) {
    typedText.textContent = frase.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === frase.length) {
      borrando = true;
      setTimeout(animarTexto, pausaAlFinal);
      return;
    }

    setTimeout(animarTexto, velocidadEscritura);
    return;
  }

  typedText.textContent = frase.slice(0, charIndex - 1);
  charIndex -= 1;

  if (charIndex === 0) {
    borrando = false;
    fraseIndex = (fraseIndex + 1) % FRASES.length;
    setTimeout(animarTexto, pausaAntesDeEscribir);
    return;
  }

  setTimeout(animarTexto, velocidadBorrado);
}

if (FRASES.length > 0) {
  animarTexto();
}

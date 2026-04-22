const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const message = document.getElementById('message');
const storedHash = '$2y$10$RuFwqwEz0PTS/gvUAb.FDuS8YtIk.ujQpJXVfAS5DXg9gv4FLzj7i';

// bcryptjs in browser expects $2a$/$2b$ prefix; convert $2y$ for compatibility.
function normalizeBcryptHash(hash) {
  if (hash.startsWith('$2y$')) {
    return '$2a$' + hash.slice(4);
  }

  return hash;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const username = usernameInput.value.trim();

  if (!username) {
    message.textContent = 'Escribe un usuario.';
    message.style.color = '#b91c1c';
    return;
  }

  if (typeof dcodeIO === 'undefined' || !dcodeIO.bcrypt) {
    message.textContent = 'No se pudo cargar el validador de hash.';
    message.style.color = '#b91c1c';
    return;
  }

  const hashToCheck = normalizeBcryptHash(storedHash);
  const isValid = dcodeIO.bcrypt.compareSync(username, hashToCheck);

  if (!isValid) {
    message.textContent = 'Usuario incorrecto.';
    message.style.color = '#b91c1c';
    return;
  }

  message.textContent = `Hola, ${username}. Sesión iniciada.`;
  message.style.color = '#166534';
  window.location.href = 'homepage.html';
});

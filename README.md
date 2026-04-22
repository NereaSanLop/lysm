# lysm

## Frases privadas en homepage con GitHub Secrets

Para que las frases no aparezcan en el repo pero si se vean en la web desplegada:

1. En GitHub ve a `Settings > Secrets and variables > Actions`.
2. Crea este secret:
	- Nombre: `HOMEPAGE_PHRASES_JSON`
	- Valor: un JSON array valido, por ejemplo:

```json
["Hola mi amor", "Esta frase viene de un secret", "No esta en el repo publico"]
```

   Si prefieres, tambien puedes crear `HOMEPAGE_PHRASES` y poner una frase por linea.

3. En `Settings > Pages`, selecciona `Source: GitHub Actions`.
4. Haz push a `main` para desplegar.

El workflow `.github/workflows/deploy-pages.yml` genera `js/phrases-secrets.js` durante el deploy con ese secret.

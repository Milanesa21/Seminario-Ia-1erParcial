const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Manejar la solicitud GET para la ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Envía el archivo index.html como respuesta
});

// Manejar la solicitud POST para la multiplicación de matrices
app.post('/', (req, res) => {
  const matrix1 = req.body['matrix1'];
  const matrix2 = req.body['matrix2'];

  const filas1 = matrix1.length;
  const columnas1 = matrix1[0].length;
  const filas2 = matrix2.length;
  const columnas2 = matrix2[0].length;

  if(columnas1 != filas2) {
    res.status(400).send('Las matrices no son multiplicables');
    return;
  }

  const resultado = new Array(filas1);
  for(let i = 0; i < filas1; i++) {
    resultado[i] = new Array(columnas2).fill(0);

    for(let j = 0; j < columnas2; j++) {
      for(let k = 0; k < columnas1; k++) {
        resultado[i][j] += matrix1[i][k] * matrix2[k][j];
      }
    }
  }

  res.send(resultado);
});

app.listen(1000, () => {
  console.log('Servidor escuchando en el puerto 1000');
});

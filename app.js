const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

// Configurar Handlebars para usar el layout principal
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

// Configurar carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
  res.render('index', { title: 'IPN-SAES' });
});

app.get('/perfil', (req, res) => {
  res.render('perfil', {
    title: 'Perfil Estudiantil - IPN Campus Tlaxcala',
    student: {
      boleta: '2022300523',
      nombre: 'Ximena Yahel Juárez Franco',
      fechaNacimiento: '18 Enero 2001',
      nacionalidad: 'Mexicana',
      curp: 'JUFX010118MMCRM45',
      sexo: 'Mujer'
    }
  });
});

// Nueva ruta para /boleta
app.get('/boleta', (req, res) => {
  res.render('boleta', {
    title: 'Boleta de Calificaciones - IPN Campus Tlaxcala',
    student: {
      boleta: '2022300523',
      nombre: 'Ximena Yahel Juárez Franco',
      carrera: 'Ingeniería en Inteligencia Artificial',
      plan: '20',
      promedio: '9.22'
    },
    grades: [
      { subject: 'Fundamentos de Programación', period: '23/1', evaluation: 'ORD.', grade: '9' },
      { subject: 'Matemáticas Discretas', period: '23/1', evaluation: 'ORD.', grade: '9' },
      { subject: 'Comunicación Oral y Escrita', period: '23/1', evaluation: 'ORD.', grade: '10' }
    ]
  });
});

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});

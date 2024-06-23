const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

// Configurar Handlebars
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

// Configurar carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
  res.render('index', { title: 'Sistema de Administración Escolar' });
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

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});

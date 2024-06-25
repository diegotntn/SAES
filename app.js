const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const app = express();
const port = 3000;

// Configurar Handlebars para usar el layout principal
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

// Configurar carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para manejar las sesiones
app.use(session({
  secret: 'mi-secreto',
  resave: false,
  saveUninitialized: false
}));

// Ruta para la página de inicio de sesión y manejar la autenticación
app.get('/', (req, res) => {
  res.render('index', { title: 'IPN-SAES', error: null });
});

app.post('/', (req, res) => {
  const { boleta, password } = req.body;
  const users = JSON.parse(fs.readFileSync('users.json'));

  const user = users.find(u => u.boleta === boleta && u.password === password);

  if (user) {
    req.session.user = user;
    res.redirect('/perfil');
  } else {
    res.render('index', { title: 'IPN-SAES', error: 'Boleta o contraseña incorrecta' });
  }
});

// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}

// Rutas protegidas
app.get('/perfil', isAuthenticated, (req, res) => {
  res.render('perfil', {
    title: 'Perfil Estudiantil - IPN Campus Tlaxcala',
    student: req.session.user
  });
});

app.get('/boleta', isAuthenticated, (req, res) => {
  res.render('boleta', {
    title: 'Boleta de Calificaciones - IPN Campus Tlaxcala',
    student: req.session.user,
    grades: req.session.user.grades
  });
});

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});

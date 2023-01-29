const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'contraseña',
  passReqToCallback: true
}, async (req, usuario, contraseña, done) => {
  const rows = await pool.query('SELECT * FROM tb_usuarios WHERE usuario = ?', [usuario]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(contraseña, user.contraseña)
    if (validPassword) {
      done(null, user, req.flash('success', 'Welcome ' + user.usuario));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
    }
  } else {
    return done(null, false, req.flash('message', 'The Username does not exists.'));
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'contraseña',
  passReqToCallback: true
}, async (req, usuario, contraseña, done) => {

  const {nombres, apellidos,fecha_nacimiento,edad, dpi,
  telefono,direccion,estado_civil,genero,area_medica} = req.body;
  const perfil='/img/'

let personal={
  nombres,
  apellidos,
  fecha_nacimiento,
  edad,
  dpi,
  telefono,
  direccion,
  estado_civil,
  genero,
  area_medica,
  perfil
};

  let newUser = {
    usuario,
    contraseña
  };
  newUser.contraseña = await helpers.encryptPassword(contraseña);
  // Saving in the Database
  await pool.query('INSERT INTO tb_personalmedico SET?',personal);
  const result = await pool.query('INSERT INTO tb_usuarios SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
 return  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM tb_usuarios WHERE id = ?', [id]);
  return done(null, rows[0]);
});


const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const iterator=require('../lib/iterator');

//RUTAS POST
router.post('/search', isLoggedIn, async (req, res) => {
  let datos =await iterator.refresh(req.body.id);
  const paciente = datos[0];
  const antecedentes = datos[1];
  const hemograma = datos[2];
  const p_renal = datos[3];
  const p_lipidico = datos[4];
  const tratamientos = datos[5];
    res.render('profile/perfil', { paciente,antecedentes,hemograma,p_renal,p_lipidico, tratamientos});
});

router.post('/newpaciente', isLoggedIn, async (req,res)=>{
  const {nombres, apellidos,fecha_nacimiento,edad, dpi,
    telefono,direccion,estado_civil,genero} = req.body;
  const perfil='/uploads/';
  let paciente={
    nombres,
    apellidos,
    fecha_nacimiento,
    edad,
    dpi,
    telefono,
    direccion,
    estado_civil,
    genero,
    perfil
  };
    // Guardando nuevo paciente
    await pool.query('INSERT INTO tb_paciente SET?',paciente);
    res.render('profile/perfil');
});

//RUTAS GET
router.get('/perfil/:id_paciente', isLoggedIn, async (req,res)=>{
  const {id_paciente} =req.params;
  let datos =await iterator.refresh(id_paciente);
  const paciente = datos[0];
  const antecedentes = datos[1];
  const hemograma = datos[2];
  const p_renal = datos[3];
  const p_lipidico = datos[4];
  const tratamientos = datos[5];
  res.render('profile/perfil', { paciente,antecedentes,hemograma,p_renal,p_lipidico, tratamientos});
});

router.get('/newpaciente', isLoggedIn, async (req,res)=>{
  res.render('profile/newpaciente');
});

router.get('/perfil', isLoggedIn, async (req,res)=>{
  res.render('profile/perfil');
});

router.get('/perfilmedico',isLoggedIn, async(req,res)=>{
  const perfilesmedicos = await pool.query('SELECT * FROM tb_personalmedico WHERE id_medico=?',[req.user.id]);
  const usuarios= await pool.query('SELECT * FROM tb_usuarios WHERE id=?',[req.user.id]);
  res.render('profile/perfilmedico',{perfilesmedicos,usuarios});
});
module.exports=router;
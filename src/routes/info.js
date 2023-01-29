const express = require('express');
const router = express.Router();
const {
  isLoggedIn
} = require('../lib/auth');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');
const pool = require('../database');
const iterator = require('../lib/iterator');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  dest: path.join(__dirname, '../public/uploads')
}).single('image');

//RUTA PARA EDITAR EL PERFIL DEL PACIENTE
router.get('/edit_perfilfoto/:id_paciente', isLoggedIn, async (req, res) => {
  const id = req.params;
  const pacientes = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente=?', [id.id_paciente]);
  res.render('info/edit_perfilfoto', {
    paciente: pacientes[0]
  });
});

router.post('/edit_perfilfoto/:id_paciente/', isLoggedIn, upload, async (req, res) => {
  const perfil = '/uploads/' + req.file.filename;
  const {
    id_paciente
  } = req.params;
  const newpaciente = {
    perfil
  };
  iterator.cambiarperfilpaciente(id_paciente);
  //actualizacion de registro
  await pool.query('UPDATE tb_paciente set? WHERE id_paciente=?', [newpaciente, id_paciente]);
  req.flash('success', 'Registro Actualizado Exitosamente!!!');
  //refresh de la pagina
  let datos = await iterator.refresh(id_paciente);
  const paciente = datos[0];
  const antecedentes = datos[1];
  const hemograma = datos[2];
  const p_renal = datos[3];
  const p_lipidico = datos[4];
  const tratamientos = datos[5];
  res.render('profile/perfil', {
    paciente,
    antecedentes,
    hemograma,
    p_renal,
    p_lipidico,
    tratamientos
  });
});

router.get('/edit_perfilpaciente/:id_paciente', isLoggedIn, async (req, res) => {
  const id = req.params;
  const pacientes = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente =?', [id.id_paciente]);
  res.render('info/edit_perfilpaciente', {paciente: pacientes[0]});
});

router.post('/edit_perfilpaciente/:id_paciente', isLoggedIn, async (req, res) => {
  const {
    id_paciente
  } = req.params;
  const {
    nombres,
    apellidos,
    fecha_nacimiento,
    edad,
    dpi,
    telefono,
    direccion,
    estado_civil,
    genero
  } = req.body;
  const newpaciente = {
    nombres,
    apellidos,
    fecha_nacimiento,
    edad,
    dpi,
    telefono,
    direccion,
    estado_civil,
    genero
  };
  //actualizacion de registro
  await pool.query('UPDATE tb_paciente set? WHERE id_paciente=?', [newpaciente, id_paciente]);
  req.flash('success', 'Registro Actualizado Exitosamente!!!');
  //refresh de la pagina
  let datos = await iterator.refresh(id_paciente);
  const paciente = datos[0];
  const antecedentes = datos[1];
  const hemograma = datos[2];
  const p_renal = datos[3];
  const p_lipidico = datos[4];
  const tratamientos = datos[5];
  res.render('profile/perfil', {
    paciente,
    antecedentes,
    hemograma,
    p_renal,
    p_lipidico,
    tratamientos
  });
});

//RUTAS PARA EDITAR EL PERFIL DEL PERSONAL MEDICO
router.get('/edit_perfilmedico/:id_medico',isLoggedIn,async(req,res)=>{
  const id_medico=req.params;
  const perfilesmedicos = await pool.query('SELECT * FROM tb_personalmedico WHERE id_medico=?', [id_medico]);
res.render('info/edit_perfilmedico',{perfilesmedicos});
});
router.post('/edit_perfilmedico/:id_medico', upload,isLoggedIn, async (req, res) => {
  const {
    id_medico
  } = req.params; 
  const perfil = '/uploads/' + req.file.filename;
  iterator.cambiarperfilmedico(id_medico);

  const {
    nombres,
    apellidos,
    fecha_nacimiento,
    edad,
    dpi,
    telefono,
    direccion,
    estado_civil,
    genero,
    area_medica
  } = req.body;
  const newmedico = {
    nombres,
    apellidos,
    fecha_nacimiento,
    edad,
    dpi,
    telefono,
    direccion,
    estado_civil,
    genero,
    perfil,
    area_medica
  };
  //actualizacion de registro
  await pool.query('UPDATE tb_personalmedico set? WHERE id_medico=?', [newmedico, id_medico]);
  req.flash('success', 'Registro Actualizado Exitosamente!!!');
  res.render('profile/perfil');
});

//RUTAS PARA EDITAR ANTECEDENTES FAMILIARES
router.get('/edit_antecedentes/:id_paciente', isLoggedIn, async (req, res) => {
  const id = req.params;
  const antecedentes = await pool.query('SELECT * FROM tb_antecedentes WHERE id_paciente=?', [id.id_paciente]);
  res.render('info/edit_antecedentes', {
    antecedente: antecedentes[0]
  });
});
router.post('/edit_antecedentes/:id_paciente', isLoggedIn, async (req, res) => {
  const id_paciente = req.params;
  const {
    cancer,
    vih,
    asma,
    ceguera,
    ansiedad,
    depresion,
    fecha
  } = req.body;

  const antecedente = {
    cancer,
    fecha,
    vih,
    asma,
    ceguera,
    ansiedad,
    depresion,
  }
  //actualizacion de registro
  await pool.query('UPDATE tb_antecedentes set? WHERE id_antecedente=?', [antecedente, id_paciente]);
  req.flash('success', 'Registro Actualizado Exitosamente!!!');
  //refresh de la pagina
  let datos = await iterator.refresh(id_paciente);
  const paciente = datos[0];
  const antecedentes = datos[1];
  const hemograma = datos[2];
  const p_renal = datos[3];
  const p_lipidico = datos[4];
  const tratamientos = datos[5];
  res.render('profile/perfil', {
    paciente,
    antecedentes,
    hemograma,
    p_renal,
    p_lipidico,
    tratamientos
  });
});

//rutas para editar laboratorios

//rutas del hemograma
router.get('/edit_hemograma/:id_paciente', isLoggedIn, async (req, res) => {
  const id = req.params;
  const hemogramas = await pool.query('SELECT * FROM tb_hemogramacompleto WHERE id_paciente =?', [id.id_paciente]);
  res.render('info/edit_hemograma', {
    hemograma: hemogramas[0]
  });
});
router.post('/edit_hemograma/:id_paciente', isLoggedIn, async (req, res) => {
  const {
    id_paciente
  } = req.params;
  const {
    r_g_blancos,
    neutrofilos,
    eosinofilos,
    basofilos,
    linfocitos,
    monocitos,
    cayados,
    r_g_rojos,
    hemoglobina,
    hematocrito,
    v_corupuscular_m,
    hemoglobina_c_m,
    concentracion_hcm,
    r_plaquetas,
    fecha,
    velocidad_eritrodimentacion
  } = req.body;

  const newhemograma = {
    r_g_blancos,
    neutrofilos,
    eosinofilos,
    basofilos,
    linfocitos,
    monocitos,
    cayados,
    r_g_rojos,
    hemoglobina,
    hematocrito,
    v_corupuscular_m,
    hemoglobina_c_m,
    concentracion_hcm,
    r_plaquetas,
    fecha,
    velocidad_eritrodimentacion
  }
  //actualizacion de registro
  await pool.query('UPDATE tb_hemogramacompleto set? WHERE id_hemograma=?', [newhemograma, id_paciente]);
  req.flash('success', 'Registro Actualizado Exitosamente!!!');
  //refresh de la pagina
  let datos = await iterator.refresh(id_paciente);
  const paciente = datos[0];
  const antecedentes = datos[1];
  const hemograma = datos[2];
  const p_renal = datos[3];
  const p_lipidico = datos[4];
  const tratamientos = datos[5];
  res.render('profile/perfil', {
    paciente,
    antecedentes,
    hemograma,
    p_renal,
    p_lipidico,
    tratamientos
  });
});


//rutas de perfil renal
router.get('/edit_prenal/:id_paciente', isLoggedIn, async (req, res) => {
  const id = req.params;
  const p_renales = await pool.query('SELECT * FROM tb_perfilrenal WHERE id_paciente=?', [id.id_paciente]);
  res.render('info/edit_prenal', {
    prenal: p_renales[0]
  });
});

router.post('/edit_prenal/:id_paciente', isLoggedIn, async (req, res) => {
  const {
    id_paciente
  } = req.params;
  const {
    color,
    aspecto,
    densidad,
    sedimiento,
    glucosa,
    proteinas,
    cetonas,
    urobilinogeno,
    bilirrubina,
    nitritos,
    sangre,
    leucocitos,
    ph,
    epitelio,
    bacterias,
    eritrocitos,
    cristales,
    cilindros,
    mucosa,
    levaduras,
    fecha
  } = req.body;
  const newprenal = {
    color,
    aspecto,
    densidad,
    sedimiento,
    glucosa,
    proteinas,
    cetonas,
    urobilinogeno,
    bilirrubina,
    nitritos,
    sangre,
    leucocitos,
    ph,
    epitelio,
    bacterias,
    eritrocitos,
    cristales,
    cilindros,
    mucosa,
    levaduras,
    fecha
  }
  //actualizacion de registro
  await pool.query('UPDATE tb_perfilrenal set? WHERE id_perfilrenal=?', [newprenal, id_paciente]);
  req.flash('success', 'Registro Actualizado Exitosamente!!!');
  //refresh de la pagina
  let datos = await iterator.refresh(id_paciente);
  const paciente = datos[0];
  const antecedentes = datos[1];
  const hemograma = datos[2];
  const p_renal = datos[3];
  const p_lipidico = datos[4];
  const tratamientos = datos[5];
  res.render('profile/perfil', {
    paciente,
    antecedentes,
    hemograma,
    p_renal,
    p_lipidico,
    tratamientos
  });
});

//rutas de perfil lipidico
router.get('/edit_plipidico/:id_paciente', isLoggedIn, async (req, res) => {
  const id = req.params;
  const p_lipidicos = await pool.query('SELECT * FROM tb_perfillipicido WHERE id_paciente=?', [id.id_paciente]);
  res.render('info/edit_plipidico', {
    plipidico: p_lipidicos[0]
  });
});

router.post('/edit_plipidico/:id_paciente', isLoggedIn, async (req, res) => {
  const {
    id_paciente
  } = req.params;
  const {
    c_total,
    c_hdl,
    c_ldl,
    c_vldl,
    trigliceridos,
    fecha,
    riesgo_aterogenico,
    riesgo_ateroesclerosis
  } = req.body;
  const newplipidico = {
    c_total,
    c_hdl,
    c_ldl,
    c_vldl,
    fecha,
    trigliceridos,
    riesgo_aterogenico,
    riesgo_ateroesclerosis
  }
  //actualizacion de registro
  await pool.query('UPDATE tb_perfillipicido set? WHERE id_perfillipidico=?', [newplipidico, id_paciente]);
  req.flash('success', 'Registro Actualizado Exitosamente!!!');
  //refresh de la pagina
  let datos = await iterator.refresh(id_paciente);
  const paciente = datos[0];
  const antecedentes = datos[1];
  const hemograma = datos[2];
  const p_renal = datos[3];
  const p_lipidico = datos[4];
  const tratamientos = datos[5];
  res.render('profile/perfil', {
    paciente,
    antecedentes,
    hemograma,
    p_renal,
    p_lipidico,
    tratamientos
  });
});

//rutas de tratamientos
router.get('/edit_tratamientos/:id_paciente', isLoggedIn, async (req, res) => {
  const id = req.params;
  const tratamientos = await pool.query('SELECT * FROM tb_tratamientos WHERE id_paciente=?', [id.id_paciente]);
  console.log(tratamientos);
  res.render('info/edit_tratamientos', {
    tratamiento: tratamientos[0]
  });
});

router.post('/edit_tratamientos/:id_paciente', isLoggedIn, async (req, res) => {
  const {
    id_paciente
  } = req.params;
  const {
    descripcion,
    medicamento,
    dosis,
    tiempo,
    fecha
  } = req.body;
  const newtratamiento = {
    descripcion,
    medicamento,
    dosis,
    tiempo,
    fecha
  }
  //actualizacion de registro
  await pool.query('UPDATE tb_tratamientos set? WHERE id_tratamiento=?', [newtratamiento, id_paciente]);
  req.flash('success', 'Registro Actualizado Exitosamente!!!');
  //refresh de la pagina
  let datos = await iterator.refresh(id_paciente);
  const paciente = datos[0];
  const antecedentes = datos[1];
  const hemograma = datos[2];
  const p_renal = datos[3];
  const p_lipidico = datos[4];
  const tratamientos = datos[5];
  res.render('profile/perfil', {
    paciente,
    antecedentes,
    hemograma,
    p_renal,
    p_lipidico,
    tratamientos
  });
});


module.exports = router;
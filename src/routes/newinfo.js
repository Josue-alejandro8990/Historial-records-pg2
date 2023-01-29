const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const iterator = require('../lib/iterator');


//RUTAS PARA AGREGAR NUEVOS ANTECEDENTES
router.get('/newantecedente/:id_paciente', isLoggedIn, async (req, res) => {
  const id = req.params;
    const pacientes = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente =?',[id.id_paciente]);
    res.render('newinfo/newantecedente', {paciente:pacientes[0]});
});
router.post('/newantecedente/:id_paciente', isLoggedIn, async (req, res) => {
    const {id_paciente} =req.params;
    const{fecha,cancer,vih,
    asma,ceguera,ansiedad,depresion}=req.body;
    const antecedente ={
      id_paciente,
      fecha,
      cancer,
      vih,
      asma,
      ceguera,
      ansiedad,
      depresion,
    } 
    //INSERCION DEL REGISTRO A LA TABLA ANTECEDENTES
    await pool.query('INSERT INTO tb_antecedentes SET?',[antecedente]);
    req.flash('success', 'Registro Creado Exitosamente!!!');
  //REFRESH DE LA PAGINA
  let datos =await iterator.refresh(id_paciente);
  const paciente = datos[0];
  const antecedentes = datos[1];
  const hemograma = datos[2];
  const p_renal = datos[3];
  const p_lipidico = datos[4];
  const tratamientos = datos[5];
    res.render('profile/perfil', { paciente,antecedentes,hemograma,p_renal,p_lipidico, tratamientos});
  });

  //RUTAS PARA CREAR HEMOGRAMAS
  router.get('/newhemograma/:id_paciente', isLoggedIn, async (req, res) => {
    const id = req.params;
    const pacientes = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente =?',[id.id_paciente]);
    res.render('newinfo/newhemograma', {paciente:pacientes[0]});
});
router.post('/newhemograma/:id_paciente', isLoggedIn, async (req, res) => {
    const {id_paciente} =req.params;
    const{r_g_blancos,
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
      velocidad_eritrodimentacion}=req.body;
        const newhemograma ={
        id_paciente,
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
        //INSERCION DEL REGISTRO
        await pool.query('INSERT INTO tb_hemogramacompleto SET?',[newhemograma]);
        req.flash('success', 'Registro Creado Exitosamente!!!');
      //REFRESH DE LA PAGINA
      let datos =await iterator.refresh(id_paciente);
      const paciente = datos[0];
      const antecedentes = datos[1];
      const hemograma = datos[2];
      const p_renal = datos[3];
      const p_lipidico = datos[4];
      const tratamientos = datos[5];
        res.render('profile/perfil', { paciente,antecedentes,hemograma,p_renal,p_lipidico, tratamientos});
  });
  //RUTAS PARA CREAR PRENAL
  router.get('/newprenal/:id_paciente', isLoggedIn, async (req, res) => {
    const id = req.params;
    const pacientes = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente =?',[id.id_paciente]);
    res.render('newinfo/newprenal', {paciente:pacientes[0]});
});
router.post('/newprenal/:id_paciente', isLoggedIn, async (req, res) => {
  const {id_paciente} =req.params;
  const{color,
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
    fecha}=req.body;
  const newprenal ={
    id_paciente,
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
        //INSERCION DEL REGISTRO
        await pool.query('INSERT INTO tb_perfilrenal SET?',[newprenal]);
        req.flash('success', 'Registro Creado Exitosamente!!!');
      //REFRESH DE LA PAGINA
      let datos =await iterator.refresh(id_paciente);
      const paciente = datos[0];
      const antecedentes = datos[1];
      const hemograma = datos[2];
      const p_renal = datos[3];
      const p_lipidico = datos[4];
      const tratamientos = datos[5];
        res.render('profile/perfil', { paciente,antecedentes,hemograma,p_renal,p_lipidico, tratamientos});
  });
  //RUTAS PARA CREAR PLIPIDICO
  router.get('/newplipidico/:id_paciente', isLoggedIn, async (req, res) => {
    const id = req.params;
    const pacientes = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente =?',[id.id_paciente]);
    res.render('newinfo/newplipidico', {paciente:pacientes[0]});
});
router.post('/newplipidico/:id_paciente', isLoggedIn, async (req, res) => {
  const {id_paciente} =req.params;
  const{c_total,
    c_hdl,
    c_ldl,
    c_vldl,
    trigliceridos,
    fecha,
    riesgo_aterogenico,
    riesgo_ateroesclerosis}=req.body;
  const newplipidico ={
    id_paciente,
    c_total,
    c_hdl,
    c_ldl,
    c_vldl,
    fecha,
    trigliceridos,
    riesgo_aterogenico,
    riesgo_ateroesclerosis
  } 
        //INSERCION DEL REGISTRO
        await pool.query('INSERT INTO tb_perfillipicido SET?',[newplipidico]);
        req.flash('success', 'Registro Creado Exitosamente!!!');
      //REFRESH DE LA PAGINA
      let datos =await iterator.refresh(id_paciente);
     const paciente = datos[0];
     const antecedentes = datos[1];
     const hemograma = datos[2];
     const p_renal = datos[3];
     const p_lipidico = datos[4];
     const tratamientos = datos[5];
        res.render('profile/perfil', { paciente,antecedentes,hemograma,p_renal,p_lipidico, tratamientos});
  });
  //RUTAS PARA CREAR TRATAMIENTOS
  router.get('/newtratamiento/:id_paciente', isLoggedIn, async (req, res) => {
    const id = req.params;
    const pacientes = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente =?',[id.id_paciente]);
    res.render('newinfo/newtratamiento', {paciente:pacientes[0]});
});
router.post('/newtratamiento/:id_paciente', isLoggedIn, async (req, res) => {
  const {id_paciente} =req.params;
  const{descripcion, medicamento,dosis,tiempo,fecha}=req.body;
  const newtratamiento ={
    id_paciente,descripcion, medicamento,dosis,tiempo,fecha
  } 
        //INSERCION DEL REGISTRO
        await pool.query('INSERT INTO tb_tratamientos SET?',[newtratamiento]);
        req.flash('success', 'Registro Creado Exitosamente!!!');
      //REFRESH DE LA PAGINA
      let datos =await iterator.refresh(id_paciente);
      const paciente = datos[0];
      const antecedentes = datos[1];
      const hemograma = datos[2];
      const p_renal = datos[3];
      const p_lipidico = datos[4];
      const tratamientos = datos[5];
        res.render('profile/perfil', { paciente,antecedentes,hemograma,p_renal,p_lipidico, tratamientos});
  });

module.exports=router;
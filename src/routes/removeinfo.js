const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

//RUTA PARA ELIMINAR ANTECEDENTES
router.get('/removeantecedente/:id_antecedente/:id_paciente', isLoggedIn, async (req, res) => {
    const { id_antecedente,id_paciente } = req.params;
    await pool.query('DELETE FROM tb_antecedentes WHERE id_antecedente = ?', [id_antecedente]);
    req.flash('success', 'Registro eliminado exitosamente');
 //REFRESH DE LA PAGINA
  const paciente = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente = ?', [id_paciente]);
  const antecedentes = await pool.query('SELECT * FROM tb_antecedentes WHERE id_paciente =?',[id_paciente]);
  const hemograma = await pool.query('SELECT * FROM tb_hemogramacompleto WHERE id_paciente =?',[id_paciente] );
  const p_renal = await pool.query('SELECT * FROM tb_perfilrenal WHERE id_paciente=?', [id_paciente]);
  const p_lipidico = await pool.query('SELECT * FROM tb_perfillipicido WHERE id_paciente=?',[id_paciente]);
  const tratamientos = await pool.query('SELECT * FROM tb_tratamientos WHERE id_paciente=?',[id_paciente]);
  res.render('profile/perfil', { paciente,antecedentes,hemograma,p_renal,p_lipidico, tratamientos});
});

//RUTA PARA ELIMINAR HEMOGRAMAS
router.get('/removehemograma/:id_hemograma/:id_paciente', isLoggedIn, async (req, res) => {
    const { id_hemograma,id_paciente } = req.params;
    await pool.query('DELETE FROM tb_hemogramacompleto WHERE id_hemograma = ?', [id_hemograma]);
    req.flash('success', 'Registro eliminado exitosamente');
 //REFRESH DE LA PAGINA
  const paciente = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente = ?', [id_paciente]);
  const antecedentes = await pool.query('SELECT * FROM tb_antecedentes WHERE id_paciente =?',[id_paciente]);
  const hemograma = await pool.query('SELECT * FROM tb_hemogramacompleto WHERE id_paciente =?',[id_paciente] );
  const p_renal = await pool.query('SELECT * FROM tb_perfilrenal WHERE id_paciente=?', [id_paciente]);
  const p_lipidico = await pool.query('SELECT * FROM tb_perfillipicido WHERE id_paciente=?',[id_paciente]);
  const tratamientos = await pool.query('SELECT * FROM tb_tratamientos WHERE id_paciente=?',[id_paciente]);
  res.render('profile/perfil', { paciente,antecedentes,hemograma,p_renal,p_lipidico, tratamientos});
});
//RUTA PARA ELIMINAR PERFILES RENALES
router.get('/removeprenal/:id_perfilrenal/:id_paciente', isLoggedIn, async (req, res) => {
    const { id_perfilrenal,id_paciente } = req.params;
    await pool.query('DELETE FROM tb_perfilrenal WHERE id_perfilrenal = ?', [id_perfilrenal]);
    req.flash('success', 'Registro eliminado exitosamente');
 //REFRESH DE LA PAGINA
  const paciente = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente = ?', [id_paciente]);
  const antecedentes = await pool.query('SELECT * FROM tb_antecedentes WHERE id_paciente =?',[id_paciente]);
  const hemograma = await pool.query('SELECT * FROM tb_hemogramacompleto WHERE id_paciente =?',[id_paciente] );
  const p_renal = await pool.query('SELECT * FROM tb_perfilrenal WHERE id_paciente=?', [id_paciente]);
  const p_lipidico = await pool.query('SELECT * FROM tb_perfillipicido WHERE id_paciente=?',[id_paciente]);
  const tratamientos = await pool.query('SELECT * FROM tb_tratamientos WHERE id_paciente=?',[id_paciente]);
  res.render('profile/perfil', { paciente,antecedentes,hemograma,p_renal,p_lipidico, tratamientos});
});
//RUTA PARA ELIMINAR PERFILES LIPIDICOS
router.get('/removeplipidico/:id_perfillipidico/:id_paciente', isLoggedIn, async (req, res) => {
    const { id_perfillipidico,id_paciente } = req.params;
    await pool.query('DELETE FROM tb_perfillipicido WHERE id_perfillipidico = ?', [id_perfillipidico]);
    req.flash('success', 'Registro eliminado exitosamente');
 //REFRESH DE LA PAGINA
  const paciente = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente = ?', [id_paciente]);
  const antecedentes = await pool.query('SELECT * FROM tb_antecedentes WHERE id_paciente =?',[id_paciente]);
  const hemograma = await pool.query('SELECT * FROM tb_hemogramacompleto WHERE id_paciente =?',[id_paciente] );
  const p_renal = await pool.query('SELECT * FROM tb_perfilrenal WHERE id_paciente=?', [id_paciente]);
  const p_lipidico = await pool.query('SELECT * FROM tb_perfillipicido WHERE id_paciente=?',[id_paciente]);
  const tratamientos = await pool.query('SELECT * FROM tb_tratamientos WHERE id_paciente=?',[id_paciente]);
  res.render('profile/perfil', { paciente,antecedentes,hemograma,p_renal,p_lipidico, tratamientos});
});
//RUTA PARA ELIMINAR TRATAMIENTOS
router.get('/removetratamiento/:id_tratamiento/:id_paciente', isLoggedIn, async (req, res) => {
    const { id_tratamiento,id_paciente } = req.params;
    await pool.query('DELETE FROM tb_tratamientos WHERE id_tratamiento = ?', [id_tratamiento]);
    req.flash('success', 'Registro eliminado exitosamente');
 //REFRESH DE LA PAGINA
  const paciente = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente = ?', [id_paciente]);
  const antecedentes = await pool.query('SELECT * FROM tb_antecedentes WHERE id_paciente =?',[id_paciente]);
  const hemograma = await pool.query('SELECT * FROM tb_hemogramacompleto WHERE id_paciente =?',[id_paciente] );
  const p_renal = await pool.query('SELECT * FROM tb_perfilrenal WHERE id_paciente=?', [id_paciente]);
  const p_lipidico = await pool.query('SELECT * FROM tb_perfillipicido WHERE id_paciente=?',[id_paciente]);
  const tratamientos = await pool.query('SELECT * FROM tb_tratamientos WHERE id_paciente=?',[id_paciente]);
  res.render('profile/perfil', { paciente,antecedentes,hemograma,p_renal,p_lipidico, tratamientos});
});
module.exports=router;
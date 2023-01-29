const deleteimage = require('fs-extra');
const pool = require('../database');
const path = require('path');

const iterator ={};

iterator.cambiarperfilpaciente= async(id_paciente)=>{
    let datos = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente=?',[id_paciente]);
    for(let dato of datos){
        if(dato.perfil !=null){
            await deleteimage.unlink(path.resolve('./src/public/'+dato.perfil));
            break;
        }
        else{
            break;
        }
    }
};

iterator.cambiarperfilmedico= async(id_medico)=>{
    let datos = await pool.query('SELECT * FROM tb_personalmedico WHERE id_medico=?',[id_medico]);
    for(let dato of datos){
        if(dato.perfil !=null){
            await deleteimage.unlink(path.resolve('./src/public/'+dato.perfil));
            break;
        }
        else{
            break;
        }
    }
};
iterator.refresh=async(id_paciente)=>{
    const paciente = await pool.query('SELECT * FROM tb_paciente WHERE id_paciente = ?', [id_paciente]);
    const antecedentes = await pool.query('SELECT * FROM tb_antecedentes WHERE id_paciente =?',[id_paciente]);
    const hemograma = await pool.query('SELECT * FROM tb_hemogramacompleto WHERE id_paciente =?',[id_paciente] );
    const p_renal = await pool.query('SELECT * FROM tb_perfilrenal WHERE id_paciente=?', [id_paciente]);
    const p_lipidico = await pool.query('SELECT * FROM tb_perfillipicido WHERE id_paciente=?',[id_paciente]);
    const tratamientos = await pool.query('SELECT * FROM tb_tratamientos WHERE id_paciente=?',[id_paciente]);

    let datos =[paciente,antecedentes,hemograma,p_renal,p_lipidico,tratamientos];
    return datos;
};
module.exports=iterator;

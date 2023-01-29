#Creacion de base de datos
CREATE DATABASE db_minsalud;

USE db_minsalud;

#Creacion de la tabla paciente
CREATE TABLE Tb_Paciente(
id_paciente INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombres VARCHAR(50) NOT NULL,
apellidos VARCHAR(50) NOT NULL,
dpi VARCHAR(14) NOT NULL,
telefono VARCHAR(14) NOT NULL,
direccion VARCHAR(100) NOT NULL,
estado_civil VARCHAR(50)NOT NULL,
genero VARCHAR(1)NOT NULL
);

#Creacion de la tabla de usuarios
CREATE TABLE Tb_Usuarios(
id_usuario INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
usuario VARCHAR(20) NOT NULL,
contraseña VARCHAR(50)NOT NULL,
CONSTRAINT fk_idpaciente FOREIGN KEY(id_usuario) REFERENCES Tb_Paciente(id_paciente)
);

#Creacion de la tabla tipo de usuario
CREATE TABLE Tb_TipoUsuario(
id_tipo INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
id_usuario INT(2),
tipo_usuario VARCHAR(10) NOT NULL,
CONSTRAINT fk_tipo FOREIGN KEY(id_usuario) REFERENCES Tb_Usuarios(id_usuario)
);

#Creacion de la tabla tratamientos 
CREATE TABLE Tb_Tratamientos(
id_tratamiento INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_paciente INT(11),
descripcion TEXT(200) NOT NULL,
medicamento VARCHAR(50) NOT NULL,
dosis VARCHAR(50) NOT NULL,
tiempo VARCHAR(50) NOT NULL,
CONSTRAINT fk_tratamiento FOREIGN KEY(id_paciente) REFERENCES Tb_Paciente(id_paciente)
);

#Creacion de la tabla examenes 
CREATE TABLE Tb_Examenes(
id_examen INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_paciente INT(11),
hemograma_completo VARCHAR(5)NOT NULL,
perfil_renal VARCHAR(5) NOT NULL,
perfil_lipidico VARCHAR(5) NOT NULL,
CONSTRAINT fk_examen FOREIGN KEY(id_paciente) REFERENCES Tb_Paciente(id_paciente)
);

#Creacion de la tabla antecedentes
CREATE TABLE Tb_Antecedentes(
id_antecedente INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_paciente INT(11),
cancer VARCHAR(2)NOT NULL,
vih VARCHAR(2) NOT NULL,
asma VARCHAR(2) NOT NULL,
ceguera VARCHAR(2) NOT NULL,
ansiedad VARCHAR(2) NOT NULL,
depresion VARCHAR(2) NOT NULL,
CONSTRAINT fk_antecedente FOREIGN KEY(id_paciente) REFERENCES Tb_Paciente(id_paciente)
);

#Creacion de la tabla hemograma completo
CREATE TABLE Tb_HemogramaCompleto(
id_hemograma INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_paciente INT(11),
fecha VARCHAR(20) NOT NULL,
r_g_blancos VARCHAR(20) NOT NULL,
neutrofilos VARCHAR(20) NOT NULL,
eosinofilos VARCHAR(20) NOT NULL,
basofilos VARCHAR(20) NOT NULL,
linfocitos VARCHAR(20) NOT NULL,
monocitos VARCHAR(20) NOT NULL,
cayados VARCHAR(20) NOT NULL,
r_g_rojos VARCHAR(20) NOT NULL,
hemoglobina VARCHAR(20) NOT NULL,
hematocrito VARCHAR(20) NOT NULL,
v_corupuscular_m VARCHAR(20) NOT NULL,
hemoglobina_c_m VARCHAR(20) NOT NULL,
concentracion_hcm VARCHAR(20) NOT NULL,
r_plaquetas VARCHAR(20) NOT NULL,
velocidad_eritrodimentacion VARCHAR(20) NOT NULL,
CONSTRAINT fk_hemograma FOREIGN KEY (id_paciente) REFERENCES Tb_Paciente(id_paciente)
);

#Creacion de la tabla perfil renal
CREATE TABLE Tb_PerfilRenal(
id_perfilrenal INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_paciente INT(11),
fecha VARCHAR(20) NOT NULL,
color VARCHAR(25) NOT NULL,
aspecto VARCHAR(25) NOT NULL,
densidad VARCHAR(25) NOT NULL,
sedimiento VARCHAR(25) NOT NULL,
glucosa VARCHAR(25) NOT NULL,
proteinas VARCHAR(25) NOT NULL,
cetonas VARCHAR(25) NOT NULL,
urobilinogeno VARCHAR(25) NOT NULL,
bilirrubina VARCHAR(25) NOT NULL,
nitritos VARCHAR(25) NOT NULL,
sangre VARCHAR(25) NOT NULL,
leucocitos VARCHAR(25) NOT NULL,
ph VARCHAR(25) NOT NULL,
epitelio VARCHAR(25) NOT NULL,
bacterias VARCHAR(25) NOT NULL,
eritrocitos VARCHAR(25) NOT NULL,
cristales VARCHAR(25) NOT NULL,
cilindros VARCHAR(25) NOT NULL,
mucosa VARCHAR(25) NOT NULL,
levaduras VARCHAR(25) NOT NULL,
epitelio_renal VARCHAR(25) NOT NULL,
CONSTRAINT fk_renal FOREIGN KEY( id_paciente) REFERENCES Tb_Paciente(id_paciente)
);

#Creacion de la tabla de perfil lipidico
CREATE TABLE Tb_PerfilLipicido(
id_perfillipidico INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_paciente INT(11),
fecha VARCHAR(20) NOT NULL,
c_total VARCHAR(15) NOT NULL,
c_hdl VARCHAR(15) NOT NULL,
c_ldl VARCHAR(15) NOT NULL,
c_vldl VARCHAR(15) NOT NULL,
trigliceridos VARCHAR(15) NOT NULL,
riesgo_aterogenico VARCHAR(15) NOT NULL,
riesgo_ateroesclerosis VARCHAR(15) NOT NULL,
CONSTRAINT fk_lipidico FOREIGN KEY(id_paciente) REFERENCES Tb_Paciente(id_paciente)
);


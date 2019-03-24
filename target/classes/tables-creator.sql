CREATE DATABASE
IF NOT EXISTS `test`;
USE `test`;
CREATE TABLE `role`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `name` ENUM
('CUSTOMER', 'PROFESSIONAL', 'ANALYST')  NOT NULL DEFAULT 'CUSTOMER',
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `usuario`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar
(255) DEFAULT NULL,
  `apellidos` varchar
(255) DEFAULT NULL,
  `email` varchar
(255) DEFAULT NULL,
`perfil_id` int
(11) DEFAULT NULL,
  `contraseña` varchar
(255) DEFAULT NULL,
  `fecha_nacimiento` varchar
(255) DEFAULT NULL,
  `ciudad_residencia` varchar
(255) DEFAULT NULL,
FOREIGN KEY
  (`perfil_id`) REFERENCES `role`
  (`id`) ON
DELETE CASCADE ON
UPDATE CASCADE
  ,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `servicio`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar
(255) DEFAULT NULL,
  `descripcion` varchar
(255) DEFAULT NULL,
  `categoria` varchar
(255) DEFAULT NULL,
  `horas` int
(11) DEFAULT NULL,
  `precio_total` varchar
(255) DEFAULT NULL,
  `profesional_id` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`id`),
  FOREIGN KEY
(`profesional_id`) REFERENCES `usuario`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=latin1;

CREATE TABLE `solicitud`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int
(11) NOT NULL,
  `servicio_id` int
(11) NOT NULL,
  `fecha_solicitud` varchar
(255) DEFAULT NULL,
  `fecha_servicio` varchar
(255) DEFAULT NULL,
  `direccion` varchar
(255) DEFAULT NULL,
  `importe` int
(11) DEFAULT NULL,
`estado` ENUM
('Pendiente', 'Confirmada', 'Denegada', 'Cancelada', 'Completada', 'Incidencia')  NOT NULL DEFAULT 'Pendiente',
`descripcion_estado` varchar
(255) DEFAULT NULL,
  PRIMARY KEY
(`id`),
FOREIGN KEY
(`usuario_id`) REFERENCES `usuario`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE,
FOREIGN KEY
(`servicio_id`) REFERENCES `servicio`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=latin1;


insert into role
  (id,name)
values
  (1, 'ANALYST'),
  (2, 'CUSTOMER');
  
insert into usuario
  (id,nombre,apellidos,email,contraseña,perfil_id,fecha_nacimiento,ciudad_residencia)
values
  (1, 'Nico', 'Alexe', 'nico@gmail.com', '1234', 1, '11-01-1991', 'Madrid'),
  (2, 'Diego', 'Mendez', 'diego@gmail.com', '1234', 2, '11-01-1991', 'Madrid');

insert into servicio
  (id,nombre,descripcion,categoria,horas,precio_total,profesional_id)
values
  (1, 'Reparación de ordenadores', 'Reparamos todo tipo de dispositivos', 'Informática', '50', '100', 1),
  (2, 'Veterinario', 'Veterinario a domicilio', 'Veterinaria', '5', '15', 2);



insert into solicitud
  (id, usuario_id, servicio_id, fecha_solicitud, fecha_servicio, direccion, importe, estado)
values
  (1, 1, 2, '15-03-2019', '16-03-19', 'Paseo de la Chopera 14, Madrid', 50, 'Confirmada'),
  (2, 2, 1, '15-03-2019','16-03-19', 'Paseo de la Chopera 14, Madrid', 50, 'Pendiente')

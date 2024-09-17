create database DB_Construcciones;
-- drop database DB_Construcciones;

use DB_Construcciones;

-- OK
create table Obras(
id_obra int primary key auto_increment not null,
nombreObra varchar(50),
descripcionObra varchar(200),
fechainicioObra varchar(50),
fechafinObra varchar(50), 
precioObra decimal,
sectorObra bool default 0, -- 0 publico 1 privado  ,
progresoObra int default 0,
id_cliente int,
foreign key(id_cliente) references Clientes(id_cliente),
activoObras bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);

-- OK
 create table Certificados(
id_certificado int primary key auto_increment not null,
montoCert decimal,
nroCertificado int unique,
fechaEmisionCert varchar(50),
fechaPagoCert varchar(50), -- fecha de cobrado
estadoCert boolean default 0,
linkFacturaCert varchar(2000),
linkFacturaPagadaCert varchar(2000),
redeterminacion bool default 0, -- 0 no revalorizado 1 revalorizado
valorredeterminacion decimal (10,2) default 0,
fechaRedeterminacion varchar (50),
id_obra int,
foreign key(id_obra) references Obras(id_obra),
activoCert bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);

-- OK
create table Terrenos(
id_terreno int primary key auto_increment not null,
direccionTerreno varchar (50),
metrosTerrenos varchar(50),
disponibilidadTerreno bool default 1,
precioTerreno int,
activoTerreno bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);

-- OK
create table Clientes(
id_cliente int primary key auto_increment not null,
nombreCliente varchar (50),
condicionCliente varchar (50), -- privado, autonomo, monotributista etc
cuilCliente varchar (50),
telefonoCliente varchar (250),
mailCliente varchar(250),
direccionCliente varchar (50),
datosGarantes varchar(600),
activoCliente bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);

-- OK
create table VentaTerrenos(
id_ventaTerreno int primary key auto_increment not null,
id_terreno int,
id_cliente int,
fechaVentaTerreno varchar(50),
foreign key(id_cliente) references Clientes(id_cliente),
foreign key(id_terreno) references Terrenos(id_terreno),
activoTerreno bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);


-- OK

create table Vehiculos(
id_vehiculo int primary key auto_increment not null,
marcaVehiculo varchar(50),
patenteVehiculo varchar(50),
tipoVehiculo varchar (50),
seguroVehiculo varchar (50),
activoVehiculo bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);

-- OK

create table Viajes(
id_viaje int primary key auto_increment not null,
fechaViaje varchar (50),
id_obra int,
foreign key(id_obra) references Obras(id_obra),
id_vehiculo int,
foreign key(id_vehiculo) references Vehiculos(id_vehiculo),
activoViaje bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);
-- OK

create table DetallesViajes (
id_DetallesViaje int primary key auto_increment not null,
cantidadDetalleViaje int,
id_viaje int,
id_stock int,
foreign key(id_viaje) references Viajes(id_viaje),
foreign key(id_stock) references StockMateriales(id_stock),
activoDetalleViaje bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);


-- Ok
create table StockMateriales(
id_stock int primary key auto_increment not null,
nombreMaterial varchar(50),
ubicacionStock varchar (50),
cantidadStock int,
activoStock bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);
select * from StockMateriales;
-- OK
create table CompraMateriales(
id_compraMaterial int primary key auto_increment not null,
cantidadMaterial int,
precioMaterial decimal (10,2),
estadoRetiro varchar (50),
fechaCompraMateriales varchar (50),
lugardeCompra varchar (50),
id_stock int,
foreign key(id_stock) references StockMateriales(id_stock),
activoCompra bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);

-- OK

create table Operaciones(
id_operacion int primary key auto_increment not null,
nombreOperacion varchar (50),
tipoOperacion varchar (50),
montoOperacion decimal (10,2),
detalleOperacion varchar (100),
fechaOperacion varchar (50),
activoOperacion bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);

-- OK 
-- esta tabla sera para determinar los sueldos

create table Remuneraciones (
id_remuneracion int primary key auto_increment not null,
montoRemuneracion decimal (10,2),
cantEmpleado varchar(20),
tipoEmpleado bool default 0, -- 0 administrativo u 1 obrero
fechaRemuneracion varchar (50), 
sectorRemuneracion bool default 0, -- 0 publico o 1 privado
activoRemuneracion bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);
select*from Remuneraciones;
-- OK
create table Departamentos(
id_departamento int primary key auto_increment not null,
nombreDepartamento varchar(50),
direccionDepartamento varchar (50),
disponibilidadDepartamento bool default 1,
descripcionDepartamento varchar(50),
precioDepartamento varchar (50), -- es informativo para el cliente
precioExpensa varchar(50),
serviciosIncluidos bool default 0,
contratoDescripcion varchar(600),
activoDepto bool default 1
);

-- OK
create table AlquilerDepartamentos(
id_alquilerDepto int primary key auto_increment not null,
fechaInicioAlquiler varchar(50),
fechaFinAlquiler varchar(50),
id_departamento int,
id_cliente int,
foreign key(id_departamento) references Departamentos(id_departamento),
foreign key(id_cliente) references Clientes(id_cliente),
activoAlquiler bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
); 

-- OK
create table PagosAlquileres(
id_pagoAlquiler int primary key auto_increment not null,
fechaPagoAlquiler varchar(50),
montoPagoAlquiler decimal (10,2), -- se agrega manualmente independientemente del precio del departamento
id_alquilerDepto int,
foreign key(id_alquilerDepto) references AlquilerDepartamentos(id_alquilerDepto),
activoPagoAlquiler bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);

-- OK

create table LibroDiario (
id_libroDiario int primary key auto_increment not null,
id_certificado int,
foreign key(id_certificado) references Certificados(id_certificado),
id_ventaTerreno int,
foreign key(id_ventaTerreno) references VentaTerrenos(id_ventaTerreno),
id_operacion int,
foreign key (id_operacion) references Operaciones(id_operacion),
id_compraMaterial int,
foreign key (id_compraMaterial) references CompraMateriales(id_compraMaterial),
id_remuneracion int,
foreign key (id_remuneracion) references Remuneraciones(id_remuneracion),
id_pagoAlquiler int,
foreign key (id_pagoAlquiler) references PagosAlquileres (id_pagoAlquiler),
activoLibro bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);

-- OK

create table Usuarios(
id_usuario int primary key auto_increment not null,
nombreUsuario varchar(50),
mailUsuario varchar(50),
passwordUsuario varchar(50),
rol enum('admin', 'usuario') default 'usuario',
activoUsuario bool default 1 -- 1 Activo y 0 Desactivado (No visible) 
);


-- INSERTS DE TABLAS SIN FK

-- TERRENOS

INSERT INTO Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno)VALUES ('Calle 123, Ciudad A', '250', 1, 50000, 1);
INSERT INTO Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno)VALUES ('Avenida 45, Ciudad B', '300', 1, 60000, 1);
INSERT INTO Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno)VALUES ('Boulevard 12, Ciudad C', '150', 0, 40000, 0);
INSERT INTO Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno)VALUES ('Callejón 7, Ciudad D', '200', 1, 45000, 1);
INSERT INTO Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno)VALUES ('Ruta 66, Ciudad E', '320', 0, 55000, 1);
INSERT INTO Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno)VALUES ('Calle Principal, Ciudad F', '400', 1, 70000, 1);
INSERT INTO Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno)VALUES ('Avenida 20, Ciudad G', '220', 1, 48000, 1);
INSERT INTO Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno)VALUES ('Camino Real, Ciudad H', '500', 1, 80000, 0);
INSERT INTO Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno)VALUES ('Calle 8, Ciudad I', '180', 1, 42000, 1);
INSERT INTO Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno)VALUES ('Avenida del Sol, Ciudad J', '350', 1, 65000, 1);


-- CLIENTES

INSERT INTO Clientes (nombreCliente, condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes, activoCliente)VALUES ('Juan Pérez', 'privado', '20-12345678-9', '1123456789', 'juan.perez@mail.com', 'Calle Falsa 123, Ciudad A', 'Garante: Pedro García, Tel: 1198765432', 1);
INSERT INTO Clientes (nombreCliente, condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes, activoCliente)VALUES ('Ana Gómez', 'autonomo', '27-98765432-1', '1198765432', 'ana.gomez@mail.com', 'Avenida Siempre Viva 456, Ciudad B', 'Garante: Laura López, Tel: 1145678901', 1);
INSERT INTO Clientes (nombreCliente, condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes, activoCliente)VALUES ('Carlos Fernández', 'monotributista', '23-12345678-3', '1134567890', 'carlos.fernandez@mail.com', 'Boulevard 789, Ciudad C', 'Garante: Martín Suárez, Tel: 1134567890', 1);
INSERT INTO Clientes (nombreCliente, condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes, activoCliente)VALUES ('María Rodríguez', 'privado', '27-87654321-2', '1123456780', 'maria.rodriguez@mail.com', 'Calle del Sol 101, Ciudad D', 'Garante: José Martínez, Tel: 1123456780', 1);
INSERT INTO Clientes (nombreCliente, condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes, activoCliente)VALUES ('José González', 'autonomo', '20-23456789-0', '1198765431', 'jose.gonzalez@mail.com', 'Ruta 66, Ciudad E', 'Garante: Andrea Ortiz, Tel: 1198765431', 1);
INSERT INTO Clientes (nombreCliente, condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes, activoCliente)VALUES ('Lucía López', 'monotributista', '23-98765432-2', '1145678902', 'lucia.lopez@mail.com', 'Calle Principal 202, Ciudad F', 'Garante: Fernando Ramírez, Tel: 1145678902', 1);
INSERT INTO Clientes (nombreCliente, condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes, activoCliente)VALUES ('Miguel Torres', 'privado', '20-34567890-1', '1134567891', 'miguel.torres@mail.com', 'Camino Real 303, Ciudad G', 'Garante: Patricia Muñoz, Tel: 1134567891', 1);
INSERT INTO Clientes (nombreCliente, condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes, activoCliente)VALUES ('Sofía Sánchez', 'autonomo', '27-76543210-4', '1123456781', 'sofia.sanchez@mail.com', 'Avenida del Sol 404, Ciudad H', 'Garante: Daniel Herrera, Tel: 1123456781', 1);
INSERT INTO Clientes (nombreCliente, condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes, activoCliente)VALUES ('Pablo Ramírez', 'monotributista', '23-87654321-1', '1198765433', 'pablo.ramirez@mail.com', 'Calle 8, Ciudad I', 'Garante: Karina Díaz, Tel: 1198765433', 1);
INSERT INTO Clientes (nombreCliente, condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes, activoCliente)VALUES ('Laura Martínez', 'privado', '20-65432109-2', '1145678903', 'laura.martinez@mail.com', 'Avenida 20, Ciudad J', 'Garante: Luis Pérez, Tel: 1145678903', 1);


-- VEHICULOS

INSERT INTO Vehiculos (marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo, activoVehiculo)VALUES ('Toyota', 'ABC123', 'Sedán', 'La Caja', 1);
INSERT INTO Vehiculos (marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo, activoVehiculo)VALUES ('Ford', 'DEF456', 'Camioneta', 'Sancor', 1);
INSERT INTO Vehiculos (marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo, activoVehiculo)VALUES ('Chevrolet', 'GHI789', 'SUV', 'Zurich', 1);
INSERT INTO Vehiculos (marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo, activoVehiculo)VALUES ('Honda', 'JKL012', 'Motocicleta', 'Mercantil Andina', 1);
INSERT INTO Vehiculos (marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo, activoVehiculo)VALUES ('Volkswagen', 'MNO345', 'Sedán', 'Federación Patronal', 1);
INSERT INTO Vehiculos (marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo, activoVehiculo)VALUES ('Fiat', 'PQR678', 'Hatchback', 'Provincia Seguros', 1);
INSERT INTO Vehiculos (marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo, activoVehiculo)VALUES ('Renault', 'STU901', 'Furgón', 'Mapfre', 1);
INSERT INTO Vehiculos (marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo, activoVehiculo)VALUES ('Peugeot', 'VWX234', 'SUV', 'Rivadavia', 1);
INSERT INTO Vehiculos (marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo, activoVehiculo)VALUES ('Nissan', 'YZA567', 'Pick-up', 'Allianz', 1);
INSERT INTO Vehiculos (marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo, activoVehiculo)VALUES ('BMW', 'BCD890', 'Coupé', 'Sura', 1);


-- DEPARTAMENTOS

INSERT INTO Departamentos (nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, activoDepto)VALUES ('Departamento A', 'Calle 123, Ciudad A', 1, '2 ambientes, balcón', '50000', '5000', 1, 'Contrato estándar por 24 meses', 1);
INSERT INTO Departamentos (nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, activoDepto)VALUES ('Departamento B', 'Avenida 45, Ciudad B', 1, '1 ambiente, vista al parque', '40000', '3000', 0, 'Contrato estándar por 12 meses', 1);
INSERT INTO Departamentos (nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, activoDepto)VALUES ('Departamento C', 'Boulevard 12, Ciudad C', 0, '3 ambientes, piscina', '75000', '6000', 1, 'Contrato estándar por 24 meses', 1);
INSERT INTO Departamentos (nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, activoDepto)VALUES ('Departamento D', 'Callejón 7, Ciudad D', 1, '2 ambientes, cocina equipada', '55000', '4500', 0, 'Contrato estándar por 18 meses', 1);
INSERT INTO Departamentos (nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, activoDepto)VALUES ('Departamento E', 'Ruta 66, Ciudad E', 1, '1 ambiente, cerca de transporte público', '35000', '2500', 1, 'Contrato estándar por 12 meses', 1);
INSERT INTO Departamentos (nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, activoDepto)VALUES ('Departamento F', 'Calle Principal, Ciudad F', 1, '3 ambientes, terraza privada', '80000', '7000', 1, 'Contrato estándar por 24 meses', 1);
INSERT INTO Departamentos (nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, activoDepto)VALUES ('Departamento G', 'Avenida 20, Ciudad G', 0, '2 ambientes, vista al mar', '60000', '5000', 1, 'Contrato estándar por 18 meses', 1);
INSERT INTO Departamentos (nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, activoDepto)VALUES ('Departamento H', 'Camino Real, Ciudad H', 1, '1 ambiente, amoblado', '45000', '3500', 0, 'Contrato estándar por 12 meses', 1);
INSERT INTO Departamentos (nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, activoDepto)VALUES ('Departamento I', 'Calle 8, Ciudad I', 1, '2 ambientes, recién renovado', '50000', '4000', 1, 'Contrato estándar por 24 meses', 1);
INSERT INTO Departamentos (nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, activoDepto)VALUES ('Departamento J', 'Avenida del Sol, Ciudad J', 1, '3 ambientes, piscina y gimnasio', '90000', '8000', 1, 'Contrato estándar por 24 meses', 1);


-- REMUNERACIONES

INSERT INTO Remuneraciones (montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion, activoRemuneracion)VALUES (50000.00, '5 empleados', 0, '2024-01-15', 1, 1);
INSERT INTO Remuneraciones (montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion, activoRemuneracion)VALUES (75000.50, '10 empleados', 1, '2024-02-10', 0, 1);
INSERT INTO Remuneraciones (montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion, activoRemuneracion)VALUES (120000.75, '8 empleados', 1, '2024-03-05', 1, 1);
INSERT INTO Remuneraciones (montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion, activoRemuneracion)VALUES (45000.00, '3 empleados', 0, '2024-04-20', 0, 1);
INSERT INTO Remuneraciones (montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion, activoRemuneracion)VALUES (68000.25, '7 empleados', 1, '2024-05-15', 1, 1);
INSERT INTO Remuneraciones (montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion, activoRemuneracion)VALUES (55000.00, '6 empleados', 0, '2024-06-10', 0, 1);
INSERT INTO Remuneraciones (montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion, activoRemuneracion)VALUES (130000.00, '15 empleados', 1, '2024-07-05', 1, 1);
INSERT INTO Remuneraciones (montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion, activoRemuneracion)VALUES (70000.75, '12 empleados', 0, '2024-08-01', 0, 1);
INSERT INTO Remuneraciones (montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion, activoRemuneracion)VALUES (90000.50, '20 empleados', 1, '2024-09-10', 1, 1);
INSERT INTO Remuneraciones (montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion, activoRemuneracion)VALUES (100000.00, '25 empleados', 0, '2024-10-20', 0, 1);

-- StockMateriales

INSERT INTO StockMateriales (nombreMaterial, ubicacionStock, cantidadStock, activoStock)VALUES ('Cemento', 'Depósito A', 100, 1);
INSERT INTO StockMateriales (nombreMaterial, ubicacionStock, cantidadStock, activoStock)VALUES ('Ladrillos', 'Depósito B', 500, 1);
INSERT INTO StockMateriales (nombreMaterial, ubicacionStock, cantidadStock, activoStock)VALUES ('Pintura Blanca', 'Almacén C', 200, 1);
INSERT INTO StockMateriales (nombreMaterial, ubicacionStock, cantidadStock, activoStock)VALUES ('Madera', 'Depósito D', 150, 1);
INSERT INTO StockMateriales (nombreMaterial, ubicacionStock, cantidadStock, activoStock)VALUES ('Azulejos', 'Almacén E', 300, 1);
INSERT INTO StockMateriales (nombreMaterial, ubicacionStock, cantidadStock, activoStock)VALUES ('Arena', 'Depósito F', 400, 1);
INSERT INTO StockMateriales (nombreMaterial, ubicacionStock, cantidadStock, activoStock)VALUES ('Hierro', 'Depósito G', 250, 1);
INSERT INTO StockMateriales (nombreMaterial, ubicacionStock, cantidadStock, activoStock)VALUES ('Cal', 'Almacén H', 120, 1);
INSERT INTO StockMateriales (nombreMaterial, ubicacionStock, cantidadStock, activoStock)VALUES ('Cerámicos', 'Depósito I', 350, 1);
INSERT INTO StockMateriales (nombreMaterial, ubicacionStock, cantidadStock, activoStock)VALUES ('Yeso', 'Depósito J', 180, 1);

-- Usuarios

INSERT INTO Usuarios (nombreUsuario, mailUsuario, passwordUsuario, rol, activoUsuario)VALUES ('Juan Pérez', 'juan.perez@mail.com', 'password123', 'usuario', 1);
INSERT INTO Usuarios (nombreUsuario, mailUsuario, passwordUsuario, rol, activoUsuario)VALUES ('Ana Gómez', 'ana.gomez@mail.com', 'securepass456', 'admin', 1);
INSERT INTO Usuarios (nombreUsuario, mailUsuario, passwordUsuario, rol, activoUsuario)VALUES ('Carlos Fernández', 'carlos.fernandez@mail.com', 'pass789', 'usuario', 1);
INSERT INTO Usuarios (nombreUsuario, mailUsuario, passwordUsuario, rol, activoUsuario)VALUES ('María Rodríguez', 'maria.rodriguez@mail.com', 'mypassword', 'usuario', 1);
INSERT INTO Usuarios (nombreUsuario, mailUsuario, passwordUsuario, rol, activoUsuario)VALUES ('José González', 'jose.gonzalez@mail.com', 'password321', 'admin', 1);
INSERT INTO Usuarios (nombreUsuario, mailUsuario, passwordUsuario, rol, activoUsuario)VALUES ('Lucía López', 'lucia.lopez@mail.com', 'strongpass987', 'usuario', 1);
INSERT INTO Usuarios (nombreUsuario, mailUsuario, passwordUsuario, rol, activoUsuario)VALUES ('Miguel Torres', 'miguel.torres@mail.com', 'mysecurepassword', 'usuario', 1);
INSERT INTO Usuarios (nombreUsuario, mailUsuario, passwordUsuario, rol, activoUsuario)VALUES ('Sofía Sánchez', 'sofia.sanchez@mail.com', 'pass456', 'admin', 1);
INSERT INTO Usuarios (nombreUsuario, mailUsuario, passwordUsuario, rol, activoUsuario)VALUES ('Pablo Ramírez', 'pablo.ramirez@mail.com', 'newpass123', 'usuario', 1);
INSERT INTO Usuarios (nombreUsuario, mailUsuario, passwordUsuario, rol, activoUsuario)VALUES ('Laura Martínez', 'laura.martinez@mail.com', 'mypassword789', 'usuario', 1);


-- INSERTS DE TABLAS CON FK

-- OBRAS

INSERT INTO Obras (nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, id_cliente, activoObras)VALUES ('Construcción Edificio Central', 'Construcción de un edificio de oficinas de 10 pisos', '2024-01-15', '2025-01-15', 5000000.00, 1, 25, 1, 1);
INSERT INTO Obras (nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, id_cliente, activoObras)VALUES ('Ampliación Hospital General', 'Ampliación del ala de emergencias del hospital', '2024-02-10', '2024-12-10', 3000000.00, 0, 50, 2, 1);
INSERT INTO Obras (nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, id_cliente, activoObras)VALUES ('Renovación Plaza Principal', 'Renovación completa de la plaza principal del municipio', '2024-03-05', '2024-09-05', 1500000.00, 0, 75, 3, 1);
INSERT INTO Obras (nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, id_cliente, activoObras)VALUES ('Construcción Viviendas Sociales', 'Construcción de 50 viviendas sociales en el barrio sur', '2024-04-20', '2025-04-20', 10000000.00, 0, 20, 4, 1);
INSERT INTO Obras (nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, id_cliente, activoObras)VALUES ('Desarrollo de Complejo Residencial', 'Desarrollo de un complejo residencial de lujo', '2024-05-15', '2026-05-15', 20000000.00, 1, 10, 5, 1);
INSERT INTO Obras (nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, id_cliente, activoObras)VALUES ('Modernización de Escuela Técnica', 'Modernización de laboratorios y aulas de la escuela técnica local', '2024-06-10', '2025-06-10', 4000000.00, 0, 60, 6, 1);
INSERT INTO Obras (nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, id_cliente, activoObras)VALUES ('Construcción de Parque Industrial', 'Construcción de un parque industrial con 15 naves', '2024-07-05', '2025-12-05', 25000000.00, 1, 30, 7, 1);
INSERT INTO Obras (nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, id_cliente, activoObras)VALUES ('Restauración Museo Histórico', 'Restauración del edificio histórico del museo', '2024-08-01', '2025-02-01', 2000000.00, 0, 85, 8, 1);
INSERT INTO Obras (nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, id_cliente, activoObras)VALUES ('Edificación Torre Residencial', 'Edificación de torre residencial de 20 pisos', '2024-09-10', '2026-09-10', 30000000.00, 1, 15, 9, 1);
INSERT INTO Obras (nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, id_cliente, activoObras)VALUES ('Pavimentación de Calles Urbanas', 'Pavimentación de 10 km de calles urbanas', '2024-10-20', '2025-04-20', 8000000.00, 0, 40, 10, 1);

-- CERTIFICADOS

INSERT INTO Certificados (montoCert, nroCertificado, fechaEmisionCert, fechaPagoCert, estadoCert, linkFacturaCert, linkFacturaPagadaCert, redeterminacion, valorredeterminacion, fechaRedeterminacion, id_obra, activoCert)VALUES (250000.00, 101, '2024-01-15', '2024-02-15', 1, 'http://factura1.com', 'http://facturapagada1.com', 0, 0, NULL, 1, 1);
INSERT INTO Certificados (montoCert, nroCertificado, fechaEmisionCert, fechaPagoCert, estadoCert, linkFacturaCert, linkFacturaPagadaCert, redeterminacion, valorredeterminacion, fechaRedeterminacion, id_obra, activoCert)VALUES (500000.00, 102, '2024-02-10', '2024-03-10', 0, 'http://factura2.com', NULL, 1, 25000.00, '2024-02-25', 2, 1);
INSERT INTO Certificados (montoCert, nroCertificado, fechaEmisionCert, fechaPagoCert, estadoCert, linkFacturaCert, linkFacturaPagadaCert, redeterminacion, valorredeterminacion, fechaRedeterminacion, id_obra, activoCert)VALUES (750000.00, 103, '2024-03-05', '2024-04-05', 1, 'http://factura3.com', 'http://facturapagada3.com', 0, 0, NULL, 3, 1);
INSERT INTO Certificados (montoCert, nroCertificado, fechaEmisionCert, fechaPagoCert, estadoCert, linkFacturaCert, linkFacturaPagadaCert, redeterminacion, valorredeterminacion, fechaRedeterminacion, id_obra, activoCert)VALUES (300000.00, 104, '2024-04-20', '2024-05-20', 1, 'http://factura4.com', 'http://facturapagada4.com', 1, 15000.00, '2024-04-30', 4, 1);
INSERT INTO Certificados (montoCert, nroCertificado, fechaEmisionCert, fechaPagoCert, estadoCert, linkFacturaCert, linkFacturaPagadaCert, redeterminacion, valorredeterminacion, fechaRedeterminacion, id_obra, activoCert)VALUES (1000000.00, 105, '2024-05-15', '2024-06-15', 0, 'http://factura5.com', NULL, 0, 0, NULL, 5, 1);
INSERT INTO Certificados (montoCert, nroCertificado, fechaEmisionCert, fechaPagoCert, estadoCert, linkFacturaCert, linkFacturaPagadaCert, redeterminacion, valorredeterminacion, fechaRedeterminacion, id_obra, activoCert)VALUES (450000.00, 106, '2024-06-10', '2024-07-10', 1, 'http://factura6.com', 'http://facturapagada6.com', 1, 22500.00, '2024-06-25', 6, 1);
INSERT INTO Certificados (montoCert, nroCertificado, fechaEmisionCert, fechaPagoCert, estadoCert, linkFacturaCert, linkFacturaPagadaCert, redeterminacion, valorredeterminacion, fechaRedeterminacion, id_obra, activoCert)VALUES (600000.00, 107, '2024-07-05', '2024-08-05', 0, 'http://factura7.com', NULL, 0, 0, NULL, 7, 1);
INSERT INTO Certificados (montoCert, nroCertificado, fechaEmisionCert, fechaPagoCert, estadoCert, linkFacturaCert, linkFacturaPagadaCert, redeterminacion, valorredeterminacion, fechaRedeterminacion, id_obra, activoCert)VALUES (1200000.00, 108, '2024-08-01', '2024-09-01', 1, 'http://factura8.com', 'http://facturapagada8.com', 1, 60000.00, '2024-08-15', 8, 1);
INSERT INTO Certificados (montoCert, nroCertificado, fechaEmisionCert, fechaPagoCert, estadoCert, linkFacturaCert, linkFacturaPagadaCert, redeterminacion, valorredeterminacion, fechaRedeterminacion, id_obra, activoCert)VALUES (950000.00, 109, '2024-09-10', '2024-10-10', 0, 'http://factura9.com', NULL, 0, 0, NULL, 9, 1);
INSERT INTO Certificados (montoCert, nroCertificado, fechaEmisionCert, fechaPagoCert, estadoCert, linkFacturaCert, linkFacturaPagadaCert, redeterminacion, valorredeterminacion, fechaRedeterminacion, id_obra, activoCert)VALUES (1100000.00, 110, '2024-10-20', '2024-11-20', 1, 'http://factura10.com', 'http://facturapagada10.com', 1, 55000.00, '2024-10-30', 10, 1);
 
 -- VENTA TERRENOS
 
INSERT INTO VentaTerrenos (id_terreno, id_cliente, fechaVentaTerreno, activoTerreno)VALUES (1, 1, '2024-01-15', 1);
INSERT INTO VentaTerrenos (id_terreno, id_cliente, fechaVentaTerreno, activoTerreno)VALUES (2, 2, '2024-02-10', 1);
INSERT INTO VentaTerrenos (id_terreno, id_cliente, fechaVentaTerreno, activoTerreno)VALUES (3, 3, '2024-03-05', 1);
INSERT INTO VentaTerrenos (id_terreno, id_cliente, fechaVentaTerreno, activoTerreno)VALUES (4, 4, '2024-04-20', 1);
INSERT INTO VentaTerrenos (id_terreno, id_cliente, fechaVentaTerreno, activoTerreno)VALUES (5, 5, '2024-05-15', 1);
INSERT INTO VentaTerrenos (id_terreno, id_cliente, fechaVentaTerreno, activoTerreno)VALUES (6, 6, '2024-06-10', 1);
INSERT INTO VentaTerrenos (id_terreno, id_cliente, fechaVentaTerreno, activoTerreno)VALUES (7, 7, '2024-07-05', 1);
INSERT INTO VentaTerrenos (id_terreno, id_cliente, fechaVentaTerreno, activoTerreno)VALUES (8, 8, '2024-08-01', 1);
INSERT INTO VentaTerrenos (id_terreno, id_cliente, fechaVentaTerreno, activoTerreno)VALUES (9, 9, '2024-09-10', 1);
INSERT INTO VentaTerrenos (id_terreno, id_cliente, fechaVentaTerreno, activoTerreno)VALUES (10, 10, '2024-10-20', 1);

-- VIAJES

INSERT INTO Viajes (fechaViaje, id_obra, id_vehiculo, activoViaje)VALUES ('2024-01-20', 1, 1, 1);
INSERT INTO Viajes (fechaViaje, id_obra, id_vehiculo, activoViaje)VALUES ('2024-02-15', 2, 2, 1);
INSERT INTO Viajes (fechaViaje, id_obra, id_vehiculo, activoViaje)VALUES ('2024-03-10', 3, 3, 1);
INSERT INTO Viajes (fechaViaje, id_obra, id_vehiculo, activoViaje)VALUES ('2024-04-05', 4, 4, 1);
INSERT INTO Viajes (fechaViaje, id_obra, id_vehiculo, activoViaje)VALUES ('2024-05-01', 5, 5, 1);
INSERT INTO Viajes (fechaViaje, id_obra, id_vehiculo, activoViaje)VALUES ('2024-06-15', 6, 6, 1);
INSERT INTO Viajes (fechaViaje, id_obra, id_vehiculo, activoViaje)VALUES ('2024-07-20', 7, 7, 1);
INSERT INTO Viajes (fechaViaje, id_obra, id_vehiculo, activoViaje)VALUES ('2024-08-10', 8, 8, 1);
INSERT INTO Viajes (fechaViaje, id_obra, id_vehiculo, activoViaje)VALUES ('2024-09-25', 9, 9, 1);
INSERT INTO Viajes (fechaViaje, id_obra, id_vehiculo, activoViaje)VALUES ('2024-10-30', 10, 10, 1);

-- DETALLE DE VIAJES

INSERT INTO DetallesViajes (cantidadDetalleViaje, id_viaje, id_stock, activoDetalleViaje)VALUES (50, 1, 1, 1);
INSERT INTO DetallesViajes (cantidadDetalleViaje, id_viaje, id_stock, activoDetalleViaje)VALUES (30, 2, 2, 1);
INSERT INTO DetallesViajes (cantidadDetalleViaje, id_viaje, id_stock, activoDetalleViaje)VALUES (75, 3, 3, 1);
INSERT INTO DetallesViajes (cantidadDetalleViaje, id_viaje, id_stock, activoDetalleViaje)VALUES (20, 4, 4, 1);
INSERT INTO DetallesViajes (cantidadDetalleViaje, id_viaje, id_stock, activoDetalleViaje)VALUES (40, 5, 5, 1);
INSERT INTO DetallesViajes (cantidadDetalleViaje, id_viaje, id_stock, activoDetalleViaje)VALUES (60, 6, 6, 1);
INSERT INTO DetallesViajes (cantidadDetalleViaje, id_viaje, id_stock, activoDetalleViaje)VALUES (90, 7, 7, 1);
INSERT INTO DetallesViajes (cantidadDetalleViaje, id_viaje, id_stock, activoDetalleViaje)VALUES (25, 8, 8, 1);
INSERT INTO DetallesViajes (cantidadDetalleViaje, id_viaje, id_stock, activoDetalleViaje)VALUES (55, 9, 9, 1);
INSERT INTO DetallesViajes (cantidadDetalleViaje, id_viaje, id_stock, activoDetalleViaje)VALUES (85, 10, 10, 1);

-- COMPRA DE MATERIALES

INSERT INTO CompraMateriales (cantidadMaterial, precioMaterial, estadoRetiro, fechaCompraMateriales, lugardeCompra, id_stock, activoCompra)VALUES (100, 1500.00, 'En almacén', '2024-01-15', 'Proveedor A', 1, 1);
INSERT INTO CompraMateriales (cantidadMaterial, precioMaterial, estadoRetiro, fechaCompraMateriales, lugardeCompra, id_stock, activoCompra)VALUES (200, 3000.00, 'Pendiente de retiro', '2024-02-10', 'Proveedor B', 2, 1);
INSERT INTO CompraMateriales (cantidadMaterial, precioMaterial, estadoRetiro, fechaCompraMateriales, lugardeCompra, id_stock, activoCompra)VALUES (150, 2250.00, 'En tránsito', '2024-03-05', 'Proveedor C', 3, 1);
INSERT INTO CompraMateriales (cantidadMaterial, precioMaterial, estadoRetiro, fechaCompraMateriales, lugardeCompra, id_stock, activoCompra)VALUES (250, 3750.00, 'En almacén', '2024-04-20', 'Proveedor D', 4, 1);
INSERT INTO CompraMateriales (cantidadMaterial, precioMaterial, estadoRetiro, fechaCompraMateriales, lugardeCompra, id_stock, activoCompra)VALUES (300, 4500.00, 'Pendiente de retiro', '2024-05-15', 'Proveedor E', 5, 1);
INSERT INTO CompraMateriales (cantidadMaterial, precioMaterial, estadoRetiro, fechaCompraMateriales, lugardeCompra, id_stock, activoCompra)VALUES (400, 6000.00, 'En tránsito', '2024-06-10', 'Proveedor F', 6, 1);
INSERT INTO CompraMateriales (cantidadMaterial, precioMaterial, estadoRetiro, fechaCompraMateriales, lugardeCompra, id_stock, activoCompra)VALUES (180, 2700.00, 'En almacén', '2024-07-05', 'Proveedor G', 7, 1);
INSERT INTO CompraMateriales (cantidadMaterial, precioMaterial, estadoRetiro, fechaCompraMateriales, lugardeCompra, id_stock, activoCompra) VALUES (220, 3300.00, 'Pendiente de retiro', '2024-08-01', 'Proveedor H', 8, 1);
INSERT INTO CompraMateriales (cantidadMaterial, precioMaterial, estadoRetiro, fechaCompraMateriales, lugardeCompra, id_stock, activoCompra)VALUES (250, 3750.00, 'En tránsito', '2024-09-10', 'Proveedor I', 9, 1);
INSERT INTO CompraMateriales (cantidadMaterial, precioMaterial, estadoRetiro, fechaCompraMateriales, lugardeCompra, id_stock, activoCompra)VALUES (350, 5250.00, 'En almacén', '2024-10-20', 'Proveedor J', 10, 1);

-- OPERACIONES

INSERT INTO Operaciones (nombreOperacion, tipoOperacion, montoOperacion, detalleOperacion, fechaOperacion, activoOperacion)VALUES ('Compra Materiales', 'Compra', 1500.00, 'Compra de materiales para construcción', '2024-01-15', 1);
INSERT INTO Operaciones (nombreOperacion, tipoOperacion, montoOperacion, detalleOperacion, fechaOperacion, activoOperacion)VALUES ('Pago a Proveedor', 'Pago', 3000.00, 'Pago por servicios de proveedor', '2024-02-10', 1);
INSERT INTO Operaciones (nombreOperacion, tipoOperacion, montoOperacion, detalleOperacion, fechaOperacion, activoOperacion)VALUES ('Venta Terreno', 'Venta', 50000.00, 'Venta de terreno en la zona norte', '2024-03-05', 1);
INSERT INTO Operaciones (nombreOperacion, tipoOperacion, montoOperacion, detalleOperacion, fechaOperacion, activoOperacion)VALUES ('Salario Empleado', 'Gasto', 2500.00, 'Pago de salario mensual a empleado', '2024-04-01', 1);
INSERT INTO Operaciones (nombreOperacion, tipoOperacion, montoOperacion, detalleOperacion, fechaOperacion, activoOperacion)VALUES ('Compra Vehículo', 'Compra', 20000.00, 'Compra de vehículo para transporte', '2024-05-15', 1);
INSERT INTO Operaciones (nombreOperacion, tipoOperacion, montoOperacion, detalleOperacion, fechaOperacion, activoOperacion)VALUES ('Ingreso por Alquiler', 'Ingreso', 1200.00, 'Ingreso mensual por alquiler de departamento', '2024-06-10', 1);
INSERT INTO Operaciones (nombreOperacion, tipoOperacion, montoOperacion, detalleOperacion, fechaOperacion, activoOperacion)VALUES ('Pago de Impuestos', 'Pago', 3500.00, 'Pago de impuestos trimestrales', '2024-07-05', 1);
INSERT INTO Operaciones (nombreOperacion, tipoOperacion, montoOperacion, detalleOperacion, fechaOperacion, activoOperacion)VALUES ('Compra de Equipos', 'Compra', 10000.00, 'Compra de equipos para oficina', '2024-08-01', 1);
INSERT INTO Operaciones (nombreOperacion, tipoOperacion, montoOperacion, detalleOperacion, fechaOperacion, activoOperacion)VALUES ('Gasto en Publicidad', 'Gasto', 5000.00, 'Gasto en campaña publicitaria', '2024-09-10', 1);
INSERT INTO Operaciones (nombreOperacion, tipoOperacion, montoOperacion, detalleOperacion, fechaOperacion, activoOperacion)VALUES ('Venta de Obra', 'Venta', 80000.00, 'Venta de obra terminada', '2024-10-20', 1);

-- ALQUILER DEPARTAMENTO

INSERT INTO AlquilerDepartamentos (fechaInicioAlquiler, fechaFinAlquiler, id_departamento, id_cliente, activoAlquiler)VALUES ('2024-01-01', '2024-06-30', 1, 1, 1);
INSERT INTO AlquilerDepartamentos (fechaInicioAlquiler, fechaFinAlquiler, id_departamento, id_cliente, activoAlquiler)VALUES ('2024-02-01', '2024-07-31', 2, 2, 1);
INSERT INTO AlquilerDepartamentos (fechaInicioAlquiler, fechaFinAlquiler, id_departamento, id_cliente, activoAlquiler)VALUES ('2024-03-01', '2024-08-31', 3, 3, 1);
INSERT INTO AlquilerDepartamentos (fechaInicioAlquiler, fechaFinAlquiler, id_departamento, id_cliente, activoAlquiler)VALUES ('2024-04-01', '2024-09-30', 4, 4, 1);
INSERT INTO AlquilerDepartamentos (fechaInicioAlquiler, fechaFinAlquiler, id_departamento, id_cliente, activoAlquiler)VALUES ('2024-05-01', '2024-10-31', 5, 5, 1);
INSERT INTO AlquilerDepartamentos (fechaInicioAlquiler, fechaFinAlquiler, id_departamento, id_cliente, activoAlquiler)VALUES ('2024-06-01', '2024-11-30', 6, 6, 1);
INSERT INTO AlquilerDepartamentos (fechaInicioAlquiler, fechaFinAlquiler, id_departamento, id_cliente, activoAlquiler)VALUES ('2024-07-01', '2025-01-31', 7, 7, 1);
INSERT INTO AlquilerDepartamentos (fechaInicioAlquiler, fechaFinAlquiler, id_departamento, id_cliente, activoAlquiler)VALUES ('2024-08-01', '2025-02-28', 8, 8, 1);
INSERT INTO AlquilerDepartamentos (fechaInicioAlquiler, fechaFinAlquiler, id_departamento, id_cliente, activoAlquiler)VALUES ('2024-09-01', '2025-03-31', 9, 9, 1);
INSERT INTO AlquilerDepartamentos (fechaInicioAlquiler, fechaFinAlquiler, id_departamento, id_cliente, activoAlquiler)VALUES ('2024-10-01', '2025-04-30', 10, 10, 1);

-- PAGOS ALQUILER

INSERT INTO PagosAlquileres (fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto, activoPagoAlquiler)VALUES ('2024-01-05', 1200.00, 1, 1);
INSERT INTO PagosAlquileres (fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto, activoPagoAlquiler)VALUES ('2024-02-05', 1200.00, 2, 1);
INSERT INTO PagosAlquileres (fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto, activoPagoAlquiler)VALUES ('2024-03-05', 1300.00, 3, 1);
INSERT INTO PagosAlquileres (fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto, activoPagoAlquiler)VALUES ('2024-04-05', 1400.00, 4, 1);
INSERT INTO PagosAlquileres (fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto, activoPagoAlquiler)VALUES ('2024-05-05', 1500.00, 5, 1);
INSERT INTO PagosAlquileres (fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto, activoPagoAlquiler)VALUES ('2024-06-05', 1600.00, 6, 1);
INSERT INTO PagosAlquileres (fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto, activoPagoAlquiler)VALUES ('2024-07-05', 1700.00, 7, 1);
INSERT INTO PagosAlquileres (fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto, activoPagoAlquiler)VALUES ('2024-08-05', 1800.00, 8, 1);
INSERT INTO PagosAlquileres (fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto, activoPagoAlquiler)VALUES ('2024-09-05', 1900.00, 9, 1);
INSERT INTO PagosAlquileres (fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto, activoPagoAlquiler)VALUES ('2024-10-05', 2000.00, 10, 1);

-- LIBRO DIARIO

INSERT INTO LibroDiario (id_certificado, id_ventaTerreno, id_operacion, id_compraMaterial, id_remuneracion, id_pagoAlquiler, activoLibro)VALUES (1, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO LibroDiario (id_certificado, id_ventaTerreno, id_operacion, id_compraMaterial, id_remuneracion, id_pagoAlquiler, activoLibro)VALUES (NULL, 1, NULL, NULL, NULL, NULL, 1);
INSERT INTO LibroDiario (id_certificado, id_ventaTerreno, id_operacion, id_compraMaterial, id_remuneracion, id_pagoAlquiler, activoLibro)VALUES (NULL, NULL, 1, NULL, NULL, NULL, 1);
INSERT INTO LibroDiario (id_certificado, id_ventaTerreno, id_operacion, id_compraMaterial, id_remuneracion, id_pagoAlquiler, activoLibro)VALUES (NULL, NULL, NULL, 1, NULL, NULL, 1);
INSERT INTO LibroDiario (id_certificado, id_ventaTerreno, id_operacion, id_compraMaterial, id_remuneracion, id_pagoAlquiler, activoLibro)VALUES (NULL, NULL, NULL, NULL, 1, NULL, 1);
INSERT INTO LibroDiario (id_certificado, id_ventaTerreno, id_operacion, id_compraMaterial, id_remuneracion, id_pagoAlquiler, activoLibro)VALUES (NULL, NULL, NULL, NULL, NULL, 1, 1);
INSERT INTO LibroDiario (id_certificado, id_ventaTerreno, id_operacion, id_compraMaterial, id_remuneracion, id_pagoAlquiler, activoLibro)VALUES (1, 1, NULL, NULL, NULL, NULL, 1);
INSERT INTO LibroDiario (id_certificado, id_ventaTerreno, id_operacion, id_compraMaterial, id_remuneracion, id_pagoAlquiler, activoLibro)VALUES (NULL, 2, 2, NULL, NULL, NULL, 1);
INSERT INTO LibroDiario (id_certificado, id_ventaTerreno, id_operacion, id_compraMaterial, id_remuneracion, id_pagoAlquiler, activoLibro)VALUES (NULL, NULL, 2, 2, NULL, NULL, 1);
INSERT INTO LibroDiario (id_certificado, id_ventaTerreno, id_operacion, id_compraMaterial, id_remuneracion, id_pagoAlquiler, activoLibro)VALUES (NULL, NULL, NULL, NULL, 2, 2, 1);



-- Peticiones para Libro diario
-- Primera opcion esta trae los valores par aun mes 
---------------------------------------------------------------------------------------------------------------------------------------
SELECT  o.nombreObra as CERTIFICADO_OBRA, c.montoCert as MONTO_CERTIFICADO, c.fechaPagoCert as Fecha,
 t.direccionTerreno as TERRENO_VENDIDO, t.precioTerreno as PRECIO_TERRENO, vt.fechaVentaTerreno as Fecha,
 concat(op.nombreOperacion," ", op.tipoOperacion) as Operacion, op.montoOperacion as Monto_OP, op.detalleOperacion,
 op.fechaOperacion as Fecha, concat(stm.nombreMaterial," ",cm.cantidadMaterial) as Material_Cantidad,
 cm.precioMaterial as Precio, cm.fechaCompraMateriales as Fecha, rm.montoRemuneracion as Monto_Rem, 
 rm.sectorRemuneracion, rm.fechaRemuneracion as Fecha,concat(dp.nombreDepartamento,
 dp.direccionDepartamento) as Departamento, pal.montoPagoAlquiler as Monto_Alq, pal.fechaPagoAlquiler as Fecha
FROM Obras o
LEFT JOIN Certificados c ON o.id_obra = c.id_obra 
LEFT Join VentaTerrenos vt on vt.fechaVentaTerreno = c.fechaPagoCert
LEFT join Terrenos t on t.id_terreno = vt.id_terreno
LEFT join Operaciones op on vt.fechaVentaTerreno = op.fechaOperacion
LEFT join CompraMateriales cm on cm.fechaCompraMateriales = op.fechaOperacion
LEFT join stockMateriales stm on stm.id_stock = cm.id_stock
LEFT join Remuneraciones rm on rm.fechaRemuneracion = op.fechaOperacion
LEFT join PagosAlquileres pal on pal.fechaPagoAlquiler = rm.fechaRemuneracion
LEFT join AlquilerDepartamentos ald on ald.id_alquilerDepto = pal.id_alquilerDepto
LEFT join Departamentos dp on dp.id_departamento = ald.id_departamento
WHERE c.fechaPagoCert = '2024-01-01' 
or vt.fechaVentaTerreno = '2024-01-01' 
or op.fechaOperacion = '2024-01-01' 
or cm.fechaCompraMateriales = '2024-01-01' 
or rm.fechaRemuneracion = '2024-01-01' 
or pal.fechaPagoAlquiler = '2024-01-01'; 
---------------------------------------------------------------------------------------------------------------------------------------


---------------------------------------------------------------------------------------------------------------------------------------
-- Segunda opcion de Libro Diario

SELECT 'CERTIFICADO' as TIPO, o.nombreObra as Descripcion, c.montoCert as Monto, c.fechaPagoCert as Fecha
FROM Certificados c
JOIN Obras o ON o.id_obra = c.id_obra
WHERE c.fechaPagoCert = '2024-01-15'

UNION ALL

SELECT 'VENTA TERRENO' as TIPO, t.direccionTerreno as Descripcion, t.precioTerreno as Monto, vt.fechaVentaTerreno as Fecha
FROM VentaTerrenos vt
JOIN Terrenos t ON t.id_terreno = vt.id_terreno
WHERE vt.fechaVentaTerreno = '2024-01-01'

UNION ALL

SELECT 'OPERACION' as TIPO, concat(op.nombreOperacion, " ", op.tipoOperacion) as Descripcion, op.montoOperacion as Monto, op.fechaOperacion as Fecha
FROM Operaciones op
WHERE op.fechaOperacion = '2024-01-15'

UNION ALL

SELECT 'COMPRA MATERIAL' as TIPO, concat(stm.nombreMaterial, " (", cm.cantidadMaterial, ")") as Descripcion, 
    cm.precioMaterial as Monto, cm.fechaCompraMateriales as Fecha
FROM CompraMateriales cm
JOIN StockMateriales stm ON stm.id_stock = cm.id_stock
WHERE cm.fechaCompraMateriales = '2024-01-15'

UNION ALL

SELECT 'REMUNERACION' as TIPO, (CASE WHEN rm.tipoEmpleado = 0 THEN 'Administrativo' ELSE 'Obrero' END) as Descripcion, 
    rm.montoRemuneracion as Monto, rm.fechaRemuneracion as Fecha
FROM Remuneraciones rm
WHERE rm.fechaRemuneracion = '2024-01-15'

UNION ALL

SELECT 'ALQUILER' as TIPO, concat(dp.nombreDepartamento, " - ", dp.direccionDepartamento) as Descripcion, 
    pal.montoPagoAlquiler as Monto, pal.fechaPagoAlquiler as Fecha
FROM PagosAlquileres pal
JOIN AlquilerDepartamentos ald ON ald.id_alquilerDepto = pal.id_alquilerDepto
JOIN Departamentos dp ON dp.id_departamento = ald.id_departamento
WHERE pal.fechaPagoAlquiler = '2024-01-01';

---------------------------------------------------------------------------------------------------------------------------------------


---------------------------------------------------------------------------------------------------------------------------------------
-- Cash Flow

SELECT (select sum(montoCert) from Certificados where fechaPagoCert <= '2024-01-01' and fechaPagoCert >='2024-01-31' ) as MONTO_CERTIFICADO,
(select sum(precioTerreno) from Terrenos ) as PRECIO_TERRENO, (select sum(montoOperacion) from Operaciones) as Monto_OP,
(select sum(precioMaterial) from CompraMateriales) as Precio,(select sum(montoRemuneracion) from Remuneraciones) as Monto_Rem, (select sum(montoPagoAlquiler) from PagosAlquileres) as Monto_Alq
FROM Obras o
JOIN Certificados c ON o.id_obra = c.id_obra 
Join VentaTerrenos vt on vt.fechaVentaTerreno = c.fechaPagoCert
join Terrenos t on t.id_terreno = vt.id_terreno
join Operaciones op on vt.fechaVentaTerreno = op.fechaOperacion
join CompraMateriales cm on cm.fechaCompraMateriales = op.fechaOperacion
join stockMateriales stm on stm.id_stock = cm.id_stock
join Remuneraciones rm on rm.fechaRemuneracion = op.fechaOperacion
join PagosAlquileres pal on pal.fechaPagoAlquiler = rm.fechaRemuneracion
join AlquilerDepartamentos ald on ald.id_alquilerDepto = pal.id_alquilerDepto
join Departamentos dp on dp.id_departamento = ald.id_departamento
WHERE c.fechaPagoCert = '2024-01-01' 
and vt.fechaVentaTerreno = '2024-01-01' 
and op.fechaOperacion = '2024-01-01' 
and cm.fechaCompraMateriales = '2024-01-01' 
and rm.fechaRemuneracion = '2024-01-01' 
and pal.fechaPagoAlquiler = '2024-01-01'; 

-- Trae la suma de los montos de los certificados pagados en el mes indicado(las dos fecha terminan el mes)
select "Ingresos por Ventas de Terrenos" as TIPO, sum(t.precioTerreno) as Monto from Terrenos t 
join VentaTerrenos vt on t.id_terreno = vt.id_terreno
where vt.fechaVentaTerreno >= '2024-05-01' and vt.fechaVentaTerreno <='2024-05-31'
UNION ALL
select "Ingresos por Obras Privadas" as TIPO, sum(montoCert) as Monto from Certificados c
join Obras o on o.id_obra = c.id_obra where fechaPagoCert >= '2024-05-01' and fechaPagoCert <='2024-05-31' 
and sectorObra = 1
UNION ALL
select "Ingresos por Obras Publicas" as TIPO, sum(montoCert) as Monto from Certificados c
join Obras o on o.id_obra = c.id_obra where fechaPagoCert >= '2024-05-01' and fechaPagoCert <='2024-05-31' 
and sectorObra = 0
UNION ALL
select "Ingresos por Alquiler duplex " as TIPO,sum(montoPagoAlquiler) as Monto from PagosAlquileres where fechaPagoAlquiler >= '2024-05-01' 
and fechaPagoAlquiler <='2024-05-31'
UNION ALL
select "OPERACIONES" as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '2024-05-01' 
and fechaOperacion <='2024-05-31'
UNION ALL
select "Compra de Materiales Obra" as TIPO,sum(precioMaterial) as Monto from CompraMateriales where fechaCompraMateriales >= '2024-05-01' and fechaCompraMateriales <='2024-05-31'
UNION ALL
select "Salarios Administrativos" as TIPO,sum(montoRemuneracion) as Monto from Remuneraciones where fechaRemuneracion >= '2024-05-01' 
and fechaRemuneracion <='2024-05-31' and tipoEmpleado = 0 and sectorRemuneracion = 1
UNION ALL
select "Salarios de Obras Privadas" as TIPO,sum(montoRemuneracion) as Monto from Remuneraciones where fechaRemuneracion >= '2024-05-01' 
and fechaRemuneracion <='2024-05-31' and tipoEmpleado = 1 and sectorRemuneracion = 1
UNION ALL
select "Salarios de Obras Publicas" as TIPO,sum(montoRemuneracion) as Monto from Remuneraciones where fechaRemuneracion >= '2024-05-01' 
and fechaRemuneracion <='2024-05-31' and tipoEmpleado = 1 and sectorRemuneracion = 0


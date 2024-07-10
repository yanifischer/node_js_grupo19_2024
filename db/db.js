require('dotenv').config();

const mySql = require('mysql2');
const connection = mySql.createConnection(
    {
        
        /*host : 'localhost',
        user: 'root',
        password: '070817',
        database: 'grupo19_b'*/
        

        host : process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });




    connection.connect((err) =>
    {
        if(err)
        {
            console.error("Error conectando a la base de datos",err);
            return;
        }




        console.log("Conectado a la base de datos");




        connection.query('CREATE DATABASE IF NOT EXISTS grupo19_b', (err,results) =>
        {
            if(err)
            {
                console.log("Error creando la base de datos");
                return;
            }




            console.log("Base de datos asegurada");




            connection.changeUser({database : 'grupo19_b'}, (err)=>
            {
                if(err)
                {
                    console.error("Error al cambiar",err);
                    return;
                }






            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS clientes_2 (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(100) NOT NULL,
                    apellido VARCHAR(100) NOT NULL,
                    mail VARCHAR(100) NOT NULL,
                    cel NUMERIC(10) NOT NULL
                ); 
                
                CREATE TABLE  IF NOT EXISTS desarrolladores_2 (
	                id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre varchar (100) not null,
                    apellido varchar(100) not null
                );

                CREATE TABLE IF NOT EXISTS arreglo_2 (
	                id INT AUTO_INCREMENT PRIMARY KEY,
                    id_desarrollador int not null,
                    descripcion text not null,
                    precio decimal (10,2) not null,
                    dias_aprox numeric(4) not null,
                    FOREIGN KEY(id_desarrollador) REFERENCES desarrolladores_2(id)
                );

                create table if not exists consulta_2 (
                    id int auto_increment primary key,
                    id_cliente int not null,
                    id_arreglo int not null,
                    FOREIGN KEY(id_cliente) REFERENCES clientes_2(id),
                    FOREIGN KEY(id_arreglo) REFERENCES arreglo_2(id)
                );
            `;




            connection.query(createTableQuery,(err,results) =>
            {
                if(err)
                {
                    console.log("Error creando la tabla: " , err);
                    return;
                }




                console.log("Tabla asegurada");
            });
        });




    });




});




module.exports = connection;

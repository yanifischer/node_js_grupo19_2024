const db = require('../db/db');


const ObtenerTodosLosUsuarios = (req,res) => 
{
    const sql = 'SELECT * FROM clientes_2';

    db.query(sql, (err,result) => 
    {
        if(err) throw err;

        res.json(result);
    });
}


const ObtenerUsuarioPorId = (req, res) =>{
    const {id} = req.params;
    const sql = 'SELECT * FROM clientes_2 WHERE id = ?';
    db.query(sql,[id], (err,result) =>
    {
        if(err) throw err;        
        res.json(result);
    });
};


const crearUsuario = (req, res) =>{
    const {nombre,apellido,mail,cel} = req.body;


    const sql = 'INSERT INTO clientes_2 (nombre,apellido,mail,cel) VALUES (?,?,?,?)';


    db.query(sql,[nombre,apellido,mail,cel], (err,result) =>
    {
        if(err) throw err;


        res.json({
            mensaje : 'Cliente Creado',
            idUsuario: result.insertId
            });
    });
};






const ActualizarUsuario = (req, res) =>{
    const {id} = req.params;
    const {nombre,apellido,mail,cel} = req.body;


    const sql = 'UPDATE clientes_2 SET nombre = ?, apellido = ?, mail = ?, cel =? WHERE id = ?';
    db.query(sql,[nombre,apellido,mail,cel,id], (err,result) =>
    {
        if(err) throw err;


        res.json(
            {
                message : 'cliente editado'
            });
    });


};


const BorrarUsuario = (req, res) =>{
    const {id} = req.params;
    const sql  = 'DELETE FROM clientes_2 WHERE id= ?';
    db.query(sql,[id],(err,result) =>
    {
        if(err) throw err;


        res.json(
            {
                message: 'Cliente eliminado'
            });
    });
};


module.exports = 
{
    ObtenerTodosLosUsuarios,
    ObtenerUsuarioPorId,
    crearUsuario,
    ActualizarUsuario,
    BorrarUsuario
}

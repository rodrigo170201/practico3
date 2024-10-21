module.exports = (app) => {
    let router = require("express").Router();
    const tipoController = require("../controllers/tipo.controller");

    // Rutas para las operaciones de Tipo
    router.get('/', tipoController.listTipos); // Obtener todos los Tipos
    router.get('/:id', tipoController.getTipoById); // Obtener un Tipo por ID
    router.post('/', tipoController.createTipo); // Crear un nuevo Tipo
    router.put('/:id', tipoController.updateTipo); // Actualizar un Tipo
    router.delete('/:id', tipoController.deleteTipo); // Eliminar un Tipo por ID

    // Ruta para asignar tipos a un Pokémon
    router.post('/asignar-tipos', tipoController.asignarTiposAPokemon); // Asignar tipos a un Pokémon

    app.use('/tipos', router); // Define que las rutas de Tipo estarán bajo '/tipos'
};

module.exports = (app) => {
    let router = require("express").Router();
    const habilidadController = require("../controllers/habilidad.controller");

    // Rutas para las operaciones de Habilidad
    router.get('/', habilidadController.listHabilidades); // Obtener todas las Habilidades
    router.get('/:id', habilidadController.getHabilidadById); // Obtener una Habilidad por ID
    router.post('/', habilidadController.createHabilidad); // Crear una nueva Habilidad
    router.put('/:id', habilidadController.updateHabilidad); // Actualizar una Habilidad por ID
    router.delete('/:id', habilidadController.deleteHabilidad); // Eliminar una Habilidad por ID

    router.post('/asignar-habilidades', habilidadController.asignarHabilidades);


    app.use('/habilidades', router); // Define que las rutas de Habilidad estarán bajo '/habilidades'
};

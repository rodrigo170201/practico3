const db = require("../models");

// Listar todas las habilidades
exports.listHabilidades = async (req, res) => {
    try {
        const habilidades = await db.habilidad.findAll();
        res.json(habilidades);
    } catch (error) {
        sendError500(error, res);
    }
};

// Obtener una habilidad por ID
exports.getHabilidadById = async (req, res) => {
    const id = req.params.id;
    try {
        const habilidad = await db.habilidad.findByPk(id);
        if (!habilidad) {
            return res.status(404).json({ msg: 'Habilidad no encontrada' });
        }
        res.json(habilidad);
    } catch (error) {
        sendError500(error, res);
    }
};

// Crear una nueva habilidad
exports.createHabilidad = async (req, res) => {
    const { nombre } = req.body;
    if (!nombre ) {
        return res.status(400).json({ msg: 'El nombre y la descripción son requeridos' });
    }

    try {
        const nuevaHabilidad = await db.habilidad.create({ nombre });
        res.status(201).json({ id: nuevaHabilidad.id, nombre:nuevaHabilidad.nombre,msg: 'Habilidad creada correctamente' });
    } catch (error) {
        sendError500(error, res);
    }
};

// Actualizar una habilidad por ID
exports.updateHabilidad = async (req, res) => {
    const id = req.params.id;
    const { nombre} = req.body;

    try {
        const habilidad = await getHabilidadOr404(id, res);
        if (!habilidad) {
            return;
        }

        habilidad.nombre = nombre || habilidad.nombre;
        await habilidad.save();
        res.json({ msg: 'Habilidad actualizada correctamente' });
    } catch (error) {
        sendError500(error, res);
    }
};

// Eliminar una habilidad por ID
exports.deleteHabilidad = async (req, res) => {
    const id = req.params.id;
    try {
        const habilidad = await getHabilidadOr404(id, res);
        if (!habilidad) {
            return;
        }

        await habilidad.destroy();
        res.json({ msg: 'Habilidad eliminada correctamente' });
    } catch (error) {
        sendError500(error, res);
    }
};

// Asignar habilidades a un Pokémon
exports.asignarHabilidades = async (req, res) => {
    const { pokemonId, habilidades } = req.body;

    if (!pokemonId || !habilidades || habilidades.length === 0) {
        return res.status(400).json({ msg: 'El ID del Pokémon y las habilidades son requeridos' });
    }

    try {
        const pokemon = await db.pokemon.findByPk(pokemonId);
        if (!pokemon) {
            return res.status(404).json({ msg: 'Pokémon no encontrado' });
        }

        // Asignar habilidades
        await pokemon.setHabilidades(habilidades); // Utiliza el método generado por Sequelize para establecer la relación
        res.json({ msg: 'Habilidades asignadas correctamente' });
    } catch (error) {
        sendError500(error, res);
    }
};




// Funciones auxiliares
async function getHabilidadOr404(id, res) {
    const habilidad = await db.habilidad.findByPk(id);
    if (!habilidad) {
        res.status(404).json({ msg: 'Habilidad no encontrada' });
        return null;
    }
    return habilidad;
}

function sendError500(error, res) {
    res.status(500).json({ error: error.message });
}

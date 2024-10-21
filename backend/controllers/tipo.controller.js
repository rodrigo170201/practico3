const db = require("../models");
const Pokemon = db.pokemon;
const Tipo = db.tipo;

// Listar todos los tipos
exports.listTipos = async (req, res) => {
    try {
        const tipos = await db.tipo.findAll();
        res.json(tipos);
    } catch (error) {
        sendError500(error, res);
    }
};

// Obtener un tipo por ID
exports.getTipoById = async (req, res) => {
    const id = req.params.id;
    try {
        const tipo = await db.tipo.findByPk(id);
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }
        res.json(tipo);
    } catch (error) {
        sendError500(error, res);
    }
};

// Crear un nuevo tipo
exports.createTipo = async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ msg: 'El nombre del tipo es requerido' });
    }

    try {
        const nuevoTipo = await db.tipo.create({ nombre });
        res.status(201).json({ id: nuevoTipo.id, nombre: nuevoTipo.nombre, msg: 'Tipo creado correctamente' });
    } catch (error) {
        sendError500(error, res);
    }
};

// Actualizar un tipo por ID
exports.updateTipo = async (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;

    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) {
            return;
        }

        tipo.nombre = nombre || tipo.nombre;
        await tipo.save();
        res.json({ msg: 'Tipo actualizado correctamente' });
    } catch (error) {
        sendError500(error, res);
    }
};

// Eliminar un tipo por ID
exports.deleteTipo = async (req, res) => {
    const id = req.params.id;
    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) {
            return;
        }

        await tipo.destroy();
        res.json({ msg: 'Tipo eliminado correctamente' });
    } catch (error) {
        sendError500(error, res);
    }
};

// Asignar tipos a un Pokémon
exports.asignarTiposAPokemon = async (req, res) => {
    const { pokemonId, tipos } = req.body;

    try {
        // Validar que el Pokémon exista
        const pokemon = await Pokemon.findByPk(pokemonId);
        if (!pokemon) {
            return res.status(404).send({
                message: "Pokémon no encontrado."
            });
        }

        // Validar que los tipos sean correctos
        const tiposExistentes = await Tipo.findAll({
            where: { id: tipos }
        });

        if (tiposExistentes.length !== tipos.length) {
            return res.status(400).send({
                message: "Uno o más tipos no existen."
            });
        }

        // Verificar la cantidad de tipos ya asignados al Pokémon
        const tiposActuales = await pokemon.getTipos();
        if (tiposActuales.length + tipos.length > 2) {
            return res.status(400).send({
                message: "No se puede asignar más de 2 tipos a un Pokémon."
            });
        }

        // Asignar los tipos al Pokémon
        await pokemon.addTipos(tiposExistentes);

        res.status(200).send({
            message: "Tipos asignados correctamente al Pokémon."
        });
    } catch (error) {
        console.error("Error al asignar tipos al Pokémon:", error);
        res.status(500).send({
            message: "Ocurrió un error al asignar los tipos."
        });
    }
};

// Funciones auxiliares
async function getTipoOr404(id, res) {
    const tipo = await db.tipo.findByPk(id);
    if (!tipo) {
        res.status(404).json({ msg: 'Tipo no encontrado' });
        return null;
    }
    return tipo;
}

function sendError500(error, res) {
    res.status(500).json({ error: error.message });
}

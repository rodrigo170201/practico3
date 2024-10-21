module.exports = (app) => {
    let router = require("express").Router();
    const pokemonController = require("../controllers/pokemon.controller");

    // Rutas para las operaciones de Pokémon
    router.get('/', pokemonController.listPokemons);
    router.get('/:id', pokemonController.getPokemonById);
    router.get('/:id/detail', pokemonController.getPokemonById); // Obtener un Pokémon por ID
    router.post('/', pokemonController.createPokemon);
    router.put('/:id', pokemonController.updatePokemonPut);
    router.patch('/:id', pokemonController.updatePokemonPatch); // No se utiliza
    router.delete('/:id', pokemonController.deletePokemon); 
    router.post('/:id/foto', pokemonController.uploadPicturePokemons);

    app.use('/pokemons', router);
};

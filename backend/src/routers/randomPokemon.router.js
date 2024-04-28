const express = require('express');
const router = express.Router();
const {RandomPokemon} = require('../schemas/randomPokemon.schema');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRandomPokemonId } = require('../middlewares/randomPokemon.middleware');

const pokemonRouter = express.Router();

pokemonRouter.get('/', verifyToken, checkRandomPokemonId, async (req, res) => {
    try {
        const randomPokemonId = req.randomPokemonId;
        console.log(randomPokemonId);
      res.json({ randomPokemonId: randomPokemonId });
    } catch (error) {
      console.error('Error retrieving random Pokémon ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = {
    pokemonRouter
}

const mongoose = require("mongoose");

const randomPokemonSchema = new mongoose.Schema({
      randomPokemonId: {
        type: Number,
        required: true
      },
      user_id : {type:String, require:true},
      username : {type:String, require:true},
      expirationTime: {
        type: Date,
        required: true
      }
})

const RandomPokemon = mongoose.model("randomPokemon", randomPokemonSchema);

module.exports={
    RandomPokemon
}
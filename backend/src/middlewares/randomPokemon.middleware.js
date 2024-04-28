const { RandomPokemon } = require('../schemas/randomPokemon.schema');

const checkRandomPokemonId = async (req, res, next) => {
    try {
        // Check if user exists
        const existingUser = await RandomPokemon.findOne({ user_id: req.id });

        if (existingUser) {
            // Check if expiration time has passed
            if (existingUser.expirationTime <= Date.now()) {
                // If expired, delete the old record
                await RandomPokemon.deleteOne({ user_id: req.id });

                // Create a new record with a new random ID and expiration time
                const newRandomPokemonId = Math.floor(Math.random() * 898) + 1;
                const newExpirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

                await RandomPokemon.create({
                    user_id: req.id,
                    username: req.username,
                    randomPokemonId: newRandomPokemonId,
                    expirationTime: newExpirationTime
                });

                // Attach the new randomPokemonId to the request object
                req.randomPokemonId = newRandomPokemonId;
            } else {
                // If not expired, use the existing random ID
                req.randomPokemonId = existingUser.randomPokemonId;
            }
        } else {
            // If user doesn't exist, create a new record
            const newRandomPokemonId = Math.floor(Math.random() * 898) + 1;
            const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

            await RandomPokemon.create({
                user_id: req.id,
                username: req.username,
                randomPokemonId: newRandomPokemonId,
                expirationTime
            });

            // Attach the new randomPokemonId to the request object
            req.randomPokemonId = newRandomPokemonId;
        }

        next();
    } catch (error) {
        console.error('Error checking random Pokémon ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { checkRandomPokemonId };

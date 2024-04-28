/* eslint-disable react/prop-types */
import { Box, Heading, Flex, Image, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PokemonCard = ({ pokemon }) => {
  return (
    <>
      <Flex justifyContent="center">
        <Box
          className="random-pokemon-card"
          boxShadow="lg"
          rounded="lg"
          maxW="600px"
          bg="white"
          pb={12}
        >
          <Heading
            p={4}
            bg={"#ecc94b "}
            as="h2"
            size="md"
            textAlign="center"
            mt="6"
          >
            {pokemon.name && pokemon.name.toUpperCase()}
          </Heading>
          <Flex
            mt={4}
            className="pokemon-details"
            justifyContent="space-between"
            p="4"
            gap={4}
          >
            {" "}
            {/* Updated flexDirection to row */}
            <Image
              border={"2px solid #ecc94b"}
              bg="white"
              src={pokemon?.sprites?.front_shiny}
              alt={pokemon.name}
              boxSize={{ base:"150px", md:"200px"}}
              objectFit="contain"
              mb="4"
            />
            <Box ml="4">
              {" "}
              {/* Added margin to separate image and text */}
              <Text color={"black"} fontWeight="bold" textAlign="left">
                Type:
              </Text>
              <Text color={"black"} mb="2" textAlign="left">
                {pokemon.types &&
                  pokemon.types.map((type) => type.type.name).join(", ")}
              </Text>
              <Text color={"black"} fontWeight="bold" textAlign="left">
                Abilities:
              </Text>
              <Text color={"black"} mb="2" textAlign="left">
                {pokemon.abilities &&
                  pokemon.abilities
                    .map((ability) => ability.ability.name)
                    .join(", ")}
              </Text>
              <Text color={"black"} fontWeight="bold" textAlign="left">
                Height:
              </Text>
              <Text color={"black"} mb="2" textAlign="left">
                {pokemon.height}
              </Text>
              <Text color={"black"} fontWeight="bold" textAlign="left">
                Weight:
              </Text>
              <Text color={"black"} mb="2" textAlign="left">
                {pokemon.weight}
              </Text>
            </Box>
          </Flex>
          <Link to={`/pokemon/${pokemon.id}`}>
            <Button bg={"#ecc94b "} ml={4}>
              Explore Stats
            </Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default PokemonCard;

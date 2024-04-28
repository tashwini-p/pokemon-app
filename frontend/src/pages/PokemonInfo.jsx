import { Box, Heading, Image, Text, Flex,  Grid, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Define a color array for different stats
const statColors = ["blue.200", "green.200", "yellow.200", "orange.200", "purple.200", "pink.200"];

export const PokemonInfo = () => {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        async function getPokemon() {
            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = await response.json();
                setPokemon(data);
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        getPokemon();
    }, [id]);

    return (
        <Box textAlign={"center"} fontFamily="Poppins">
            <Heading fontFamily={"fantasy"} mt={12}><span style={{color:"#ecc94b"}}>-------- </span>{pokemon.name && pokemon.name.toUpperCase()}<span style={{color:"#ecc94b"}}> --------</span></Heading>
            <Flex  mt={12} mb={12} justifyContent="center" gap={6}>
                <Image border={"2px solid crimson"} boxShadow={"dark-lg"} width={"250px"} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={pokemon.name} />
                <Box ml="4" border={"2px solid crimson"} boxShadow={"dark-lg"} p={8}>
              {" "}
              {/* Added margin to separate image and text */}
              <Text mt={2} color={"black"} fontWeight="bold" textAlign="left">
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
            
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>Error fetching data</Text>
            ) : (
                <>  
                <Box mb={12}>
                  {/* <Heading mt={4} size='lg' padding={4}>Stats</Heading> */}
                  <Heading fontFamily={"fantasy"} mt={16} mb={12} size={"md"}><span style={{color:"#ecc94b"}}>-------- </span>STATS<span style={{color:"#ecc94b"}}> --------</span></Heading>
                  <Flex justifyContent="center">
                      <Grid
                          width="100%"
                          maxW="800px"
                          templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
                          gap={4}
                          justifyContent="center"
                      >
                      <Box bg={statColors[0]} p={3} borderRadius={"md"} width={"200px"} height={"200px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 -960 960 960" width="45"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                          <HStack mt={4}>
                            <Text color={"black"} fontWeight="bold">HP</Text>
                            <Text color={"black"}  >{pokemon.stats[0].base_stat}</Text>
                          </HStack>
                      </Box> 
                      <Box bg={statColors[1]} p={3} borderRadius={"md"} width={"200px"} height={"200px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 -960 960 960" width="45"><path d="M762-96 645-212l-88 88-28-28q-23-23-23-57t23-57l169-169q23-23 57-23t57 23l28 28-88 88 116 117q12 12 12 28t-12 28l-50 50q-12 12-28 12t-28-12Zm118-628L426-270l5 4q23 23 23 57t-23 57l-28 28-88-88L198-96q-12 12-28 12t-28-12l-50-50q-12-12-12-28t12-28l116-117-88-88 28-28q23-23 57-23t57 23l4 5 454-454h160v160ZM334-583l24-23 23-24-23 24-24 23Zm-56 57L80-724v-160h160l198 198-57 56-174-174h-47v47l174 174-56 57Zm92 199 430-430v-47h-47L323-374l47 47Zm0 0-24-23-23-24 23 24 24 23Z"/></svg>
                          <HStack mt={4}>
                            <Text color={"black"}  fontWeight="bold">Attack</Text>
                            <Text color={"black"}  >{pokemon.stats[1].base_stat}</Text>
                          </HStack>
                      </Box> 
                      <Box bg={statColors[2]} p={3} borderRadius={"md"} width={"200px"} height={"200px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 -960 960 960" width="45"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q97-30 162-118.5T718-480H480v-315l-240 90v207q0 7 2 18h238v316Z"/></svg>
                          <HStack mt={4}>
                            <Text color={"black"}  fontWeight="bold">Defense</Text>
                            <Text color={"black"}  >{pokemon.stats[2].base_stat}</Text>
                          </HStack>
                      </Box> 
                      <Box bg={statColors[3]} p={3} borderRadius={"md"} width={"200px"} height={"200px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 -960 960 960" width="45"><path d="m748-77-96-96-88 88-21-21q-40-40-40-96t40-96l123-123q40-40 96-40t96 40l21 21-88 88 96 96q20 21 20 49t-20 48l-42 42q-20 20-48.5 20T748-77Zm160-635L449-254l-2-1q15 37 7 77.5T416-106l-21 21-88-88-97 97q-20 20-48 20t-49-20l-42-43q-20-20-20-48t20-49l97-96-88-88 21-21q30-31 71-38.5t79 8.5l-1-2 458-459h200v200ZM341-601l10-11 11-10-11 10-10 11Zm-90 89L52-712v-200h200l200 201-90 89-163-164h-21v21l163 164-90 89Zm115 164 416-417v-21h-21L344-370l22 22Zm0 0-10-12-12-10 12 10 10 12Z"/></svg>
                          <HStack mt={4}>
                            <Text color={"black"}  fontWeight="bold">Special Attack</Text>
                            <Text color={"black"}  >{pokemon.stats[3].base_stat}</Text>
                          </HStack>
                      </Box> 
                      <Box bg={statColors[4]} p={3} borderRadius={"md"} width={"200px"} height={"200px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 -960 960 960" width="45"><path d="M480-320q102-92 131-129.5t29-74.5q0-36-26-62t-62-26q-21 0-40.5 8.5T480-580q-12-15-31-23.5t-41-8.5q-36 0-62 26t-26 62q0 19 5 35t22 37.5q17 21.5 48.5 52.5t84.5 79Zm0 240q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>
                          <HStack mt={4}>
                            <Text color={"black"}  fontWeight="bold">Special Defense</Text>
                            <Text color={"black"}  >{pokemon.stats[4].base_stat}</Text>
                          </HStack>
                      </Box> 
                      <Box bg={statColors[5]} p={3} borderRadius={"md"} width={"200px"} height={"200px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 -960 960 960" width="45"><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg>
                          <HStack mt={4}>
                            <Text color={"black"}  fontWeight="bold">Speed</Text>
                            <Text color={"black"}  >{pokemon.stats[5].base_stat}</Text>
                          </HStack>
                      </Box> 
                              {/* <Box
                                  p={3}
                                  borderRadius="md"
                                  mb={2}
                                  width="200px"
                                  height="150px"
                                  display="flex"
                                  flexDirection="column"
                                  justifyContent="center"
                                  alignItems="center"
                              >
                                  <Text fontWeight="bold">{pokemon.stat.name.toUpperCase()}</Text>
                                  <Text>{stat.base_stat}</Text>
                              </Box> */}
                          
                      </Grid>
                </Flex>
                </Box>
                </>
            )}
        </Box>
    );
};

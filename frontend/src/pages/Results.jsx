import { Box, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PokemonCard from "../components/Pokemon";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import Axios

export const Results = () => {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { search } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Simulate 2 seconds delay
                await new Promise(resolve => setTimeout(resolve, 2000));

                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`);
                if (response.status === 200) {
                    setPokemon(response.data);
                }
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
                if (error.response && error.response.status === 404) {
                    setError('notFound');
                } else {
                    setError('other');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [search]);

    return (
        <Box fontFamily={"Poppins"} display="flex" flexDirection="column" alignItems="center">
            <Heading mt={6} textAlign={"center"}>Results for {search}...</Heading>
            {loading ? (
                <Box mt={10}>
                    <Spinner size="xl" />
                </Box>
            ) : error === 'notFound' ? (
                <Box mt={4}>
                    <div>Sorry! The Pokemon you are looking for does not exist.</div>
                    <p>Try checking for spelling errors..</p>
                </Box>
            ) : error === 'other' ? (
                <div>Error fetching data.</div>
            ) : (
                <>
                    {Object.keys(pokemon).length !== 0 ? (
                        <PokemonCard pokemon={pokemon} />
                    ) : (
                        `No results found for "${search}"`
                    )}
                </>
            )}
        </Box>
    );
};

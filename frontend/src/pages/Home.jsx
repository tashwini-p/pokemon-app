import { Heading, Input, Flex, Box, Text, Button } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import PokemonCard from '../components/Pokemon';
import { GlobalContext } from '../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { setTitle } = useContext(GlobalContext);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  console.log(randomPokemon);

  const handleSearch = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // Prompt user to login if token is not present
      alert("Please login to perform this action.");
      navigate('/login');
      return
    }
    setTitle(searchQuery.toLowerCase()); // Set the title to lowercase
    navigate(`/results/${searchQuery.toLowerCase()}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    
    const decoded = jwtDecode(token);
    const userId = decoded.data.id;

    let storedUserRandomPokemonId = localStorage.getItem(`randomPokemonId_${userId}`);
    const getRandomPokemonId = () => {
      return Math.floor(Math.random() * 898) + 1;
    };

    const fetchRandomPokemon = async () => {
      const randomId = storedUserRandomPokemonId || getRandomPokemonId();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (response.ok) {
        const data = await response.json();
        setRandomPokemon(data);
        localStorage.setItem(`randomPokemonId_${userId}`, randomId);
      } else {
        fetchRandomPokemon(); 
      }
    };

    fetchRandomPokemon();

    const interval = setInterval(fetchRandomPokemon, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      fontFamily="Poppins"
    >
      <Box textAlign="center" maxW="70%">
        <Heading pt={8} pb={6} mt={8}>Welcome to the Pokemon App!</Heading>
        <Text textAlign="justify" mb={8} mt={4}>
          Welcome to the ultimate Pokémon hub, your exclusive gateway to explore the vast world of Pokémon like never before! Dive into our comprehensive database containing information about every Pokémon that has ever graced the Pokémon universe. Whether you are a seasoned trainer or a curious newcomer, embark on your journey of discovery by simply searching for your favorite Pokémon. Get ready to uncover fascinating details, learn about their unique abilities, and immerse yourself in the enchanting lore of Pokémon. Are you ready to embark on your adventure? Start exploring now!
        </Text>
        <form>
            <Input mb={12} placeholder="Search Pokemon..." maxWidth="400px" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <Button bg={"#ecc94b "} ml={4} onClick={handleSearch}>Search</Button>
        </form>
        <br />
      </Box>
      <Box bg="crimson" py={4} px={8} mb={0} textAlign="center" width="100%">
        <Heading mt={10} mb={12} color="white">Your Pokemon of the Day!</Heading>
        <Text color="white" margin={"auto"} pb={12} textAlign="justify" width={"80%"}>Every day, embark on a thrilling journey with an exclusive Pokémon handpicked just for you. Experience the excitement of discovering a new companion daily as we present you with a specially selected Pokémon to accompany you on your adventures. Unravel the mysteries, unleash the powers, and forge unforgettable bonds with these unique creatures. Join us each day for a new encounter and let the magic of Pokémon unfold in your life.</Text>
        {token && randomPokemon && <PokemonCard pokemon={randomPokemon}/>}
        {!token && <Button bg={"#ecc94b "} onClick={()=>navigate("/login")}>Login to Access!</Button>}
      </Box>
    </Flex>
  );
};

import { useState, useEffect, createContext } from "react";

const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
function GlobalContextProvider({ children }) {
    const [pokemon, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("")

    async function fetchPokemon(url) {
        try {
            const response = await fetch(url, {
                method:"GET"
            });
            const data = await response.json();
            setPokemons(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    }

    // useEffect(() => {
    //     fetchProducts("https://fakestoreapi.com/products");
    // }, []); 

    return (
        <GlobalContext.Provider value={{ pokemon, loading, fetchPokemon, title, setTitle }}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalContextProvider };
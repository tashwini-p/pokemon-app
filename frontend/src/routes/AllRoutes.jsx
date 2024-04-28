
import { Route, Routes } from "react-router-dom";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Results } from "../pages/Results";
import { PokemonInfo } from "../pages/PokemonInfo";


const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/results/:search" element={<Results/>}/>
        <Route path="/pokemon/:id" element={<PokemonInfo/>}/>
      </Routes>
    </div>
  )
};

export default AllRoutes;

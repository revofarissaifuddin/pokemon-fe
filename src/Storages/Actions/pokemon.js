import axios from "axios";

export const getPokemon = () => async (dispatch)=>{
    try {
        dispatch({ type: "GET_MENU_PENDING" });
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon`);

    } catch (error) {
        
    }
}
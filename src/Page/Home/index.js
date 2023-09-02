import { useState, useEffect } from "react";
import axios from "axios";
import "../../Components/style.css";
import LogoApp from "../../Image/logo-pokemon.png";
import CardPokemon from "../../Components/card";
import DescPokemon from "../../Components/descPokemon";
function Home() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(`${process.env.REACT_APP_BASE_URL}`);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokemonDex, setPokeDex] = useState();
  // search pokemon
  const [pokemonName, setPokemonName] = useState("ditto");
  const [chosen, setChosen] = useState(false);
  const [pokemonData, setPokemonData] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const pokemonFun = async () => {
    setLoading(true);
    const response = await axios.get(url);
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
    getPokemon(response.data.results);
    setLoading(false);
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  const searchPokemon = () => {
    const response = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setPokemonData({
          name: pokemonName,
          species: response.species.name,
          img: response.sprites.front_default,
          hp: response.stats[0].base_stat,
          attack: response.stats[1].base_stat,
          defense: response.stats[3].base_stat,
          type: response.types[0].type.name,
        });
        setChosen(true);
      });
    console.log(response);
  };

  useEffect(() => {
    pokemonFun();
  }, [url]);

  return (
    <>
      <div className="bg-custom">
        <div className="container-fluid">
          <div className="section p-2">
            <div className="row d-flex align-items-center">
              <div className="col" />
              <div className="col">
                <img
                  className="img-fluid text-center"
                  src={LogoApp}
                  alt="logo"
                />
              </div>
              <div className="col" />
            </div>
          </div>

          <div className="container section p-5">
            <div className="row row-cols-xs-1 row-cols-sm-1 row-cols-md-2">
              <div className="col-4">
                <div className="text-center p-4 mb-4">
                  <div className="row row-cols-1 row-cols-ms-1 row-cols-md-1 row-cols-lg-2">
                    <div className="col-8 text-start">
                      <input
                        className="p-1 w-100"
                        type="text"
                        placeholder="Name pokemon"
                        onChange={(e) => {
                          setPokemonName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-4 text-start">
                      <button
                        className="btn btn-primary btn-md"
                        onClick={searchPokemon}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  <div>
                    {!chosen ? (
                      <h3> </h3>
                    ) : (
                      <>
                        <img
                          className="img-fluid text-center w-55"
                          src={pokemonData.img}
                          alt={pokemonData.name}
                        />
                        <h2>{pokemonData.species}</h2>
                        <h5>type:{pokemonData.type}</h5>
                        <h5>hp:{pokemonData.hp}</h5>
                        <h5>attack:{pokemonData.attack}</h5>
                        <h5>defense:{pokemonData.defense}</h5>
                      </>
                    )}
                  </div>
                </div>
                <DescPokemon data={pokemonDex} />
              </div>
              <div className="col-8">
                <div className="row d-flex row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                  <CardPokemon
                    pokemon={pokeData}
                    loading={loading}
                    descPokemon={(pokemon) => setPokeDex(pokemon)}
                  />
                </div>
                <div className="text-center">
                  {prevUrl && (
                    <button
                      className="btn btn-primary btn-md me-4 mt-2 mb-2"
                      onClick={() => {
                        setPokeData([]);
                        setUrl(prevUrl);
                      }}
                    >
                      Previous
                    </button>
                  )}

                  {nextUrl && (
                    <button
                      className="btn btn-primary btn-md mt-2 mb-2"
                      onClick={() => {
                        setPokeData([]);
                        setUrl(nextUrl);
                      }}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

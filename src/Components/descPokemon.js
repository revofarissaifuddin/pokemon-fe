import React from "react";
import Pokeball from "../Image/pokeball.png";

function DescPokemon({ data }) {
  return (
    <>
      {!data ? (
        <div className="row d-flex align-items-center">
          <div className="col text-center">
            <img
              className="img-fluid text-center w-75"
              src={Pokeball}
              alt="logo"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="row d-flex align-items-center">
            <div className="col text-center">
              <img
                className="img-fluid text-center w-40"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
                alt="logo"
              />
              <h2 className="fw-bold">{data.name}</h2>
              <div className="abilities">
                {data.abilities.map(pokemon=>{
                  return(<>
                    <div className="">
                      <h4 className="">{pokemon.ability.name}</h4>
                    </div>
                  </>)
                })}
              </div>
              <div className="">
                {
                  data.stats.map(pokemon=>{
                    return(<>
                    <h5 className="text-start">{pokemon.stat.name}:{pokemon.base_stat}</h5>
                    </>)
                  })
                }
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DescPokemon;

import React from "react";
import "../Components/style.css";

const Card = ({ pokemon, loading, descPokemon }) => {
  return (
    <>
      {loading ? (
        <h1>Loading.......</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <>
              <div
                className="col"
                key={item.id}
                onClick={() => descPokemon(item)}
              >
                <div className="card border border-0 rounded-2 shadow p-3 mb-4 bg-body rounded">
                  <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1 d-flex align-items-center">
                    <div className="col-2 fs-6">#{item.id}</div>
                    <div className="col-2 fw-bold">{item.name}</div>
                    <div className="col-4">
                      <img
                        className="img-fluid text-center w-75"
                        src={item.sprites.front_default}
                        alt=""
                      />
                    </div>
                    <div className="col-4 text-end">
                      base experience {item.base_experience}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}
    </>
  );
};

export default Card;

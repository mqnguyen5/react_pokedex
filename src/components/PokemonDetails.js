import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PokemonDetails() {
  const [pokemon, setPokemon] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchApi() {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemon(data);
    }
    fetchApi();
  }, [id]);

  const convertPokemonNumber = num => (num / 10).toFixed(1);

  const getPokemonStats = () =>
    pokemon.stats.map(statData => {
      let statName = "";
      switch (statData.stat.name) {
        case "special-attack":
          statName = "sp.attack";
          break;
        case "special-defense":
          statName = "sp.defense";
          break;
        default:
          statName = statData.stat.name;
          break;
      }

      return (
        <p key={statData.stat.url}>
          {statName}: {statData.base_stat}
        </p>
      );
    });

  if (!pokemon) return <p>Loading Pokemon's Data...</p>;

  return (
    <div>
      <h1>{pokemon.name.toUpperCase()}</h1>

      <p>ID: {pokemon.id}</p>
      <p>Height: {convertPokemonNumber(pokemon.height)}m</p>
      <p>Weight: {convertPokemonNumber(pokemon.weight)}kg</p>
      <p>
        Abilities:{" "}
        {pokemon.abilities.map(abilityData => (
          <span key={abilityData.ability.url}>
            {abilityData.ability.name.toUpperCase()}{" "}
          </span>
        ))}
      </p>
      <p>
        Type:{" "}
        {pokemon.types.map(typeData => (
          <span key={typeData.type.url}>{typeData.type.name} </span>
        ))}
      </p>

      <img src={pokemon.sprites.front_default} alt={pokemon.name + " image"} />

      <h3>Base Stats</h3>
      {getPokemonStats()}
    </div>
  );
}

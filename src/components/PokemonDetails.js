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

  if (!pokemon) return <p>Loading Pokemon's Data...</p>;

  return (
    <div>
      <p>ID: {pokemon.id}</p>
      <p>Name: {pokemon.name}</p>
      <p>
        Type:{" "}
        {pokemon.types.map(typeData => (
          <span key={typeData.type.url}>{typeData.type.name} </span>
        ))}
      </p>
      <img src={pokemon.sprites.front_default} alt={pokemon.name + " image"} />
    </div>
  );
}

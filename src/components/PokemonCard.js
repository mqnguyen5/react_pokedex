import { useEffect, useState } from "react";
import axios from "axios";

export default function PokemonCard({ url }) {
  const [pokemonDetails, setPokemonDetails] = useState();

  useEffect(() => {
    axios.get(url).then(res => {
      setPokemonDetails(res.data);
    });
  }, [url]);

  if (!pokemonDetails) return <p>Loading Pokemon...</p>;

  return (
    <>
      <p>{pokemonDetails.name}</p>
      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name + " image"}
      />
    </>
  );
}

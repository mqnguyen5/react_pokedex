import { useEffect, useState } from "react";
import axios from "axios";

const DEFAULT_POKEMON_DATA = {
  name: "",
  sprites: {
    front_default: "",
  },
};

export default function PokemonCard({ url }) {
  const [pokemonDetails, setPokemonDetails] = useState(DEFAULT_POKEMON_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(url).then(res => {
      setLoading(false);
      setPokemonDetails(res.data);
    });
  }, [url]);

  if (loading) return <p>Loading Pokemon...</p>;

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

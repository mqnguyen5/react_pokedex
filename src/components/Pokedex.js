import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    async function fetchApi() {
      const {
        data: { results, previous, next },
      } = await axios.get(currentPageUrl);

      setPrevPageUrl(previous);
      setNextPageUrl(next);

      const pokemonUrls = results.map(result => result.url);
      const pokemonBasicDetails = await Promise.all(
        pokemonUrls.map(async url => {
          const {
            data: {
              id,
              name,
              sprites: { front_default: img },
            },
          } = await axios.get(url);
          return { id, name, img };
        })
      );
      setPokemons(pokemonBasicDetails);
    }
    fetchApi();
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (pokemons.length === 0) return <p>Loading Pokedex...</p>;

  const cards = pokemons.map(pokemon => (
    <PokemonCard
      key={pokemon.id}
      pokemonName={pokemon.name}
      imgUrl={pokemon.img}
    />
  ));

  return (
    <>
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
      {cards}
    </>
  );
}

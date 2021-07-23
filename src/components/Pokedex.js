import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    axios.get(currentPageUrl).then(res => {
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemonList(res.data.results);
    });
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  const pokemonCards = pokemonList.map(pokemon => (
    <PokemonCard key={pokemon.name} url={pokemon.url} />
  ));

  if (pokemonList.length === 0) return <p>Loading Pokedex...</p>;

  return (
    <>
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
      {pokemonCards}
    </>
  );
}

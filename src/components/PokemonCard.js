export default function PokemonCard({ pokemonName, imgUrl }) {
  if (!pokemonName || !imgUrl) return <p>Loading Pokemon...</p>;

  return (
    <>
      <p>{pokemonName}</p>
      <img src={imgUrl} alt={pokemonName + " image"} />
    </>
  );
}

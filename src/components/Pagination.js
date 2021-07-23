export default function Pagination({ goToNextPage, goToPrevPage }) {
  return (
    <>
      {goToPrevPage && <button onClick={goToPrevPage}>Previous</button>}
      {goToNextPage && <button onClick={goToNextPage}>Next</button>}
    </>
  );
}

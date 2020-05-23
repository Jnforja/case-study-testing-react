import React, { useEffect } from "react";

function RickAndMortyCharactersPage({ fetchCharacters }) {
  useEffect(
    function fetchCharactersOnStart() {
      fetchCharacters();
    },
    [fetchCharacters]
  );
  return (
    <div>
      <p>There aren't characters to show</p>
    </div>
  );
}

export { RickAndMortyCharactersPage };

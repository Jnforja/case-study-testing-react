import React, { useEffect, useState } from "react";

const LOADING_STATUS = "LOADING";
const SHOWING_CHARACTERS_STATUS = "SHOWING_CHARACTERS";

function RickAndMortyCharactersPage({ fetchCharacters }) {
  const [status, setStatus] = useState(LOADING_STATUS);

  useEffect(
    function fetchCharactersOnStart() {
      fetchCharacters().then(function updateStateToShowCharacters() {
        setStatus(SHOWING_CHARACTERS_STATUS);
      });
    },
    [fetchCharacters]
  );
  return (
    <div>
      {status === LOADING_STATUS && <p>Loading...</p>}
      {status === SHOWING_CHARACTERS_STATUS && (
        <p>There aren't characters to show</p>
      )}
    </div>
  );
}

export { RickAndMortyCharactersPage };

import React, { useEffect, useState } from "react";

async function fetchCharactersFromServer() {
  const res = await fetch("https://rickandmortyapi.com/api/character/");
  return res.ok ? (await res.json()).results : Promise.reject();
}

const LOADING_STATUS = "LOADING";
const ERROR_STATUS = "ERROR";
const SHOWING_CHARACTERS_STATUS = "SHOWING_CHARACTERS";

function RickAndMortyCharactersPage({
  fetchCharacters = fetchCharactersFromServer,
}) {
  const [{ status, characters }, setState] = useState({
    status: LOADING_STATUS,
    characters: undefined,
  });

  useEffect(
    function fetchCharactersOnStart() {
      fetchCharacters().then(
        function updateStateToShowCharacters(chars) {
          setState({ status: SHOWING_CHARACTERS_STATUS, characters: chars });
        },
        function updateStateToError() {
          setState({ status: ERROR_STATUS });
        }
      );
    },
    [fetchCharacters]
  );
  return (
    <div className="stack">
      <header>
        <h1>Where's my Pickle Rick!?</h1>
      </header>
      <main>
        {status === LOADING_STATUS && renderLoadingMessage()}
        {status === ERROR_STATUS && renderErrorMessage()}
        {status === SHOWING_CHARACTERS_STATUS && renderCharacters()}
      </main>
    </div>
  );

  function renderLoadingMessage() {
    return <p className="text-align:center">Loading...</p>;
  }

  function renderErrorMessage() {
    return (
      <p className="text-align:center">
        There was an error. Please reload page.
      </p>
    );
  }

  function renderCharacters() {
    return characters.length === 0 ? (
      <p className="text-align:center">There aren't characters to show</p>
    ) : (
      <article className="table-wrapper">
        <table>
          <caption>Rick and Morty characters</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Species</th>
              <th>gender</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {characters.map(function toTableRow(character) {
              return (
                <tr key={character.id}>
                  <td>
                    <div className="name-cell">
                      <img
                        src={character.image}
                        alt={`${character.name} avatar`}
                      ></img>
                      <p>{character.name}</p>
                    </div>
                  </td>
                  <td>{character.species}</td>
                  <td>{character.gender}</td>
                  <td>
                    <span className="status">{character.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
    );
  }
}

export { RickAndMortyCharactersPage, fetchCharactersFromServer };

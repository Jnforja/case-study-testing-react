import React, { useEffect, useState } from "react";

const LOADING_STATUS = "LOADING";
const ERROR_STATUS = "ERROR";
const SHOWING_CHARACTERS_STATUS = "SHOWING_CHARACTERS";

function RickAndMortyCharactersPage({ fetchCharacters }) {
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
    <div>
      {status === LOADING_STATUS && <p>Loading...</p>}
      {status === ERROR_STATUS && (
        <p>There was an error. Please reload page.</p>
      )}
      {status === SHOWING_CHARACTERS_STATUS && characters.length === 0 && (
        <p>There aren't characters to show</p>
      )}
      {status === SHOWING_CHARACTERS_STATUS && characters.length > 0 && (
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
                    <div>
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
                    <span>{character.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export { RickAndMortyCharactersPage };

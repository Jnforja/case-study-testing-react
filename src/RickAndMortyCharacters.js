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
            <tr>
              <td>
                <div>
                  <img
                    src={characters[0].image}
                    alt={`${characters[0].name} avatar`}
                  ></img>
                  <p>{characters[0].name}</p>
                </div>
              </td>
              <td>{characters[0].species}</td>
              <td>{characters[0].gender}</td>
              <td>
                <span>{characters[0].status}</span>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export { RickAndMortyCharactersPage };

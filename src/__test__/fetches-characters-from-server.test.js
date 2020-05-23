import { Server, Response } from "miragejs";
import charactersApiResponse from "./characters-api-response.json";
import { fetchCharactersFromServer } from "../RickAndMortyCharacters";

test("On error fetching characters, rejects promise", async function test() {
  const server = new Server({
    environment: "test",
    routes() {
      this.urlPrefix = "https://rickandmortyapi.com";
      this.get("/api/character/", () => {
        return new Response(500);
      });
    },
  });

  await expect(fetchCharactersFromServer()).rejects.toEqual(undefined);

  server.shutdown();
});

test("On success fetching characters, returns them", async function test() {
  const server = new Server({
    environment: "test",
    routes() {
      this.urlPrefix = "https://rickandmortyapi.com";
      this.get("/api/character/", () => {
        return charactersApiResponse;
      });
    },
  });

  const characters = await fetchCharactersFromServer();

  expect(characters).toMatchObject([
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      gender: "Male",
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      gender: "Male",
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    },
    {
      id: 3,
      name: "Summer Smith",
      status: "Alive",
      species: "Human",
      gender: "Female",
      image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    },
  ]);
  server.shutdown();
});

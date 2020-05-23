import { Server, Response } from "miragejs";
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

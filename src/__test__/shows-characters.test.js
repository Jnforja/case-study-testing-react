import React from "react";
import { render, screen } from "@testing-library/react";
import { RickAndMortyCharactersPage } from "../RickAndMortyCharacters";

test("Shows empty message when there aren't characters", async function test() {
  const fetchCharacters = jest.fn().mockResolvedValueOnce([]);
  render(<RickAndMortyCharactersPage fetchCharacters={fetchCharacters} />);
  expect(
    await screen.findByText("There aren't characters to show")
  ).toBeVisible();
  expect(fetchCharacters).toHaveBeenCalledWith();
});

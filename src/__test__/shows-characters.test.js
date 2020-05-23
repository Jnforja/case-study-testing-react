import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { RickAndMortyCharactersPage } from "../RickAndMortyCharacters";

test("Shows empty message when there aren't characters", async function test() {
  const fetchCharacters = jest.fn().mockResolvedValueOnce([]);
  render(<RickAndMortyCharactersPage fetchCharacters={fetchCharacters} />);
  expect(
    await screen.findByText("There aren't characters to show")
  ).toBeVisible();
  expect(fetchCharacters).toHaveBeenCalledWith();
});

test("Shows loading message while waiting for characters", async function test() {
  const fetchCharacters = jest.fn().mockResolvedValueOnce([]);
  render(<RickAndMortyCharactersPage fetchCharacters={fetchCharacters} />);
  expect(screen.getByText("Loading...")).toBeVisible();
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
  expect(fetchCharacters).toHaveBeenCalledWith();
});

test("shows error message when there's an error fetching characters", async function test() {
  const fetchCharacters = jest.fn().mockRejectedValueOnce(new Error());
  render(<RickAndMortyCharactersPage fetchCharacters={fetchCharacters} />);
  expect(
    await screen.findByText("There was an error. Please reload page.")
  ).toBeVisible();
  expect(fetchCharacters).toHaveBeenCalledWith();
});

test("Shows 1 character", async function test() {
  const fetchCharacters = jest.fn().mockResolvedValueOnce([
    {
      id: 25,
      name: "Armorthy",
      status: "Dead",
      species: "unknown",
      gender: "male",
      image: "/mockArmorthyImageUrl",
    },
  ]);
  render(<RickAndMortyCharactersPage fetchCharacters={fetchCharacters} />);

  await (async function assertArmorthyIsVisible() {
    expect(await screen.findByText("Armorthy")).toBeVisible();
    expect(await screen.findByText("Dead")).toBeVisible();
    expect(await screen.findByText("unknown")).toBeVisible();
    expect(await screen.findByText("male")).toBeVisible();
    const armorthyAvatar = await screen.findByAltText("Armorthy avatar");
    expect(armorthyAvatar).toBeVisible();
    expect(armorthyAvatar.src).toEqual(
      expect.stringContaining("/mockArmorthyImageUrl")
    );
  })();
  expect(fetchCharacters).toHaveBeenCalledWith();
});

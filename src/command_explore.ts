import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  const area = args[0];
  if (!area) {
    console.log("Please provide a location name to explore.");
    return;
  }

  try {
    console.log(`Exploring ${area}...`);
    const location = await state.pokeAPI.fetchLocation(area);

    console.log("Found Pokemon:");
    for (const enc of location.pokemon_encounters) {
      console.log(" - " + enc.pokemon.name);
    }
  } catch (e) {
    console.log((e as Error).message);
  }
}

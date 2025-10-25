import type { State } from "./state.js";

export async function commandMapB(state: State): Promise<void> {
  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }

  try {
    const data = await state.pokeapi.fetchLocations(state.prevLocationsURL);

    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;

    for (const location of data.results) {
      console.log(location.name);
    }
  } catch (error) {
    console.log(`Error fetching locations: ${error}`);
  }
}

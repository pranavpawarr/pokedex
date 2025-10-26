import type { State } from "./state.js";

export function commandExit(state: State): void {
  console.log("Closing the Pokedex... Goodbye!");
  state.readline.close();
  state.pokeAPI.closeCache();
  process.exit(0);
}

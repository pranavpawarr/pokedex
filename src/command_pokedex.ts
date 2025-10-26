import { Pokemon } from "./pokeapi";
import { State } from "./state.js";

export function commandPokedex(state: State) {
  console.log(`Your Pokedex:`);
  for (const pokemon of Object.values(state.caughtPokemon)) {
    console.log(` - ${pokemon.name}`);
  }
}

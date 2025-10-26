import { State } from "./state.js";
import { commandExplore } from "./command_explore";

export async function commandCatch(state: State, ...args: string[]) {
  const name = args[0]?.toLowerCase()?.trim();
  console.log(`Throwing a Pokeball at ${name}...`);
  const p = await state.pokeAPI.fetchPokemon(name);
  const difficulty = Math.min(0.9, p.base_experience / 400);
  const roll = Math.random();

  if (roll < difficulty) {
    state.caughtPokemon[name] = p;
    console.log(`${name} was caught!`);
  } else {
    console.log(`${name} escaped!`);
  }
}

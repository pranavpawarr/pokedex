import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(state: State): void {
  state.rl.prompt();

  state.rl.on("line", async (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    const cmd = state.commands[commandName];

    if (!cmd) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`
      );
      state.rl.prompt();
      return;
    }

    try {
      cmd.callback(state);
    } catch (e) {
      console.log(e);
    }

    console.log();
    state.rl.prompt();
  });
}

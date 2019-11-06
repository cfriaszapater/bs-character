import { Character } from "../character/types";

export interface CombatViewState {
  combat: Combat;
  loading: boolean;
  error: Error | null;
}

export interface Combat {
  // TODO
  turn: Turn | null;
  participants: Character[];
  rounds: Round[];
}

export interface Turn {
  attacker: Character;
  defender: Character;
}

export interface Round {}

import { Character } from "../character/types";

export interface CombatViewState {
  combat: Combat;
  loading: boolean;
  error: Error | null;
}

export interface Combat {
  // TODO
  participants: Character[];
  rounds: Round[];
}

export interface Round {}

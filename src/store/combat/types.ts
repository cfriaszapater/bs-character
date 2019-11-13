import { Character } from "../character/types";

export interface CombatViewState {
  combat: Combat;
  loading: boolean;
  error: Error | null;
}

export interface Combat {
  turn?: Turn;
  participants: Character[];
  rounds: Round[];
}

export interface Turn {
  step: Step;
  attacker: Character;
  defender: Character;
  attackerStamina?: AttackStamina;
  defenderStamina?: DefendStamina;
}

export type Step =
  | "SelectOpponent"
  | "DecideStaminaLowerIni"
  | "DecideStaminaHigherIni"
  | "AttackResolved"
  | "TurnEnd";

export interface AttackStamina {
  Impact: number;
  Damage: number;
}
export interface DefendStamina {
  Dodge: number;
  Block: number;
}

export interface Round {}

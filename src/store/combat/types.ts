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
  defender?: Character;
  attacks: Attack[];
  currentDecision?: "attacker" | "defender";
}

export interface Attack {
  attackerStamina?: AttackStamina;
  defenderStamina?: DefendStamina;
  attackResult?: AttackResult;
}

export type Step =
  | "SelectOpponent"
  | "DecideStaminaLowerIni"
  | "DecideStaminaHigherIni"
  | "AttackResolved"
  | "TurnEnd";

export interface AttackStamina {
  impact: number;
  damage: number;
}
export interface DefendStamina {
  dodge: number;
  block: number;
}

export interface AttackResult {
  isHit: boolean;
  damage: number;
  coverageDamage: number;
  stunned: number;
}

export interface Round {}

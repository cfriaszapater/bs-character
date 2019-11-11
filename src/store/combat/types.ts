import { Character } from "../character/types";

export interface CombatViewState {
  combat: Combat;
  loading: boolean;
  error: Error | null;
}

export interface Combat {
  // TODO
  turn?: Turn;
  participants: Character[];
  rounds: Round[];
}

export interface Turn {
  attacker: Character;
  defender: Character;
  attackerStamina?: [AttackStaminaOption];
  defenderStamina?: [DefendStaminaOption];
}

export type AttackStaminaOption = "Impact" | "Damage";
export type DefendStaminaOption = "Dodge" | "Block";

export interface Round {}

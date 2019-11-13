import { Character } from "../../store/character/types";
import { AttackStamina, DefendStamina, Turn } from "../../store/combat/types";

/**
 * Turn from the character's point of view.
 */
export function decodeTurn(
  character: Character,
  turn?: Turn
): {
  opponent: Character | undefined;
  attacking: boolean | undefined;
  defenderStamina?: DefendStamina;
  defending: boolean | undefined;
  attackerStamina?: AttackStamina;
} {
  let attacking;
  let defending;
  let opponent: Character | undefined;
  let defenderStamina;
  let attackerStamina;
  if (turn) {
    attacking = turn.attacker && turn.attacker.name === character.name;
    defending = turn.defender && turn.defender.name === character.name;
    if (attacking) {
      opponent = turn.defender;
      defenderStamina = turn.defenderStamina;
    } else if (defending) {
      opponent = turn.attacker;
      attackerStamina = turn.attackerStamina;
    }
  }
  return { opponent, attacking, defenderStamina, defending, attackerStamina };
}

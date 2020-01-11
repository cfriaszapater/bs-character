import { Character } from "../../store/character/types";
import { AttackStamina, DefendStamina, Turn } from "../../store/combat/types";

/**
 * Turn from the character's point of view.
 */
export function decodeTurn(
  character: Character,
  turn?: Turn
): {
  opponent?: Character;
  attacking?: boolean;
  defenderStamina?: DefendStamina;
  defending?: boolean;
  attackerStamina?: AttackStamina;
  myCurrentDecision?: boolean;
} {
  if (turn) {
    let opponent: Character | undefined;
    let defenderStamina: DefendStamina | undefined;
    let attackerStamina: AttackStamina | undefined;
    let myCurrentDecision: boolean | undefined;
    const attack =
      turn.attacks.length > 0
        ? turn.attacks[turn.attacks.length - 1]
        : undefined;
    const attacking = turn.attacker && turn.attacker.name === character.name;
    const defending = turn.defender && turn.defender.name === character.name;
    if (attacking) {
      opponent = turn.defender;
      defenderStamina = attack ? attack.defenderStamina : undefined;
      myCurrentDecision = turn.currentDecision === "attacker";
    } else if (defending) {
      opponent = turn.attacker;
      attackerStamina = attack ? attack.attackerStamina : undefined;
      myCurrentDecision = turn.currentDecision === "defender";
    }
    return {
      opponent,
      attacking,
      defenderStamina,
      defending,
      attackerStamina,
      myCurrentDecision
    };
  } else {
    return {};
  }
}

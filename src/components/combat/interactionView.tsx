import React, { useEffect, useState } from "react";
import { Character } from "../../store/character/types";
import { AttackStamina, DefendStamina, Turn } from "../../store/combat/types";
import { decodeTurn } from "./decodeTurn";

interface InteractionViewProps {
  character: Character;
  turn: Turn;
  className?: string;
  resolveAttack: (stamina: AttackStamina | DefendStamina) => any;
  // TODO fetchCombatNoLoading?
  fetchCombat: (...args: any) => any;
}

export function InteractionView(props: InteractionViewProps) {
  const { turn, character } = props;
  const { attacking, defending } = decodeTurn(character, turn);

  if (attacking) {
    return AttackInteraction(props);
  } else if (defending) {
    return DefenseInteraction(props);
  } else {
    return WaitingInteraction(props);
  }
}

function AttackInteraction(props: InteractionViewProps) {
  const { turn, character, className, resolveAttack, fetchCombat } = props;
  const attack = turn.attacks[turn.attacks.length - 1];
  const { myCurrentDecision } = decodeTurn(character, turn);
  return (
    <div className={className + " px-0"}>
      <EmptyDiv />
      <div className="grouped-container">
        {myCurrentDecision ? (
          <AttackActForm
            defenderStamina={attack.defenderStamina}
            resolveAttack={resolveAttack}
            turn={turn}
          />
        ) : (
          <AttackWait fetchCombat={fetchCombat} turn={turn} />
        )}
        {attack.attackResult && <div>{explainAttackResult(turn)}</div>}
      </div>
    </div>
  );
}

function AttackWait(props: { turn: Turn; fetchCombat: (...args: any) => any }) {
  useEffect(() => {
    const timeout = setInterval(props.fetchCombat, 1000);
    return () => {
      clearInterval(timeout);
    };
  });

  return <span>Attack. Waiting for opponent decision.</span>;
}

function AttackActForm(props: {
  defenderStamina?: DefendStamina;
  resolveAttack: (stamina: AttackStamina | DefendStamina) => any;
  turn: Turn;
}) {
  const { defenderStamina, resolveAttack, turn } = props;

  const [impactStamina, setImpactStamina] = useState(0);
  const [damageStamina, setDamageStamina] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resolveAttack({ impact: impactStamina, damage: damageStamina });
  };

  const handleImpactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setImpactStamina(1);
    } else {
      setImpactStamina(0);
    }
  };

  const handleDamageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setDamageStamina(1);
    } else {
      setDamageStamina(0);
    }
  };

  const { impactRunes, dodgeRunes, damageRunes, blockRunes } = calcRunes(
    turn,
    impactStamina,
    defenderStamina,
    damageStamina
  );
  return (
    <div>
      <div>Attack. Invest stamina?</div>
      <EmptyDiv />
      <form name="invest-stamina" onSubmit={handleSubmit}>
        <table className="table-sm w-100 table-bordered">
          <thead>
            <tr>
              <th scope="col">stamina</th>
              <th scope="col" colSpan={2}>
                runes
              </th>
              <th scope="col">stamina</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Checkbox
                  name="Impact"
                  handleChange={handleImpactChange}
                  checked={impactStamina > 0}
                  leftLabel
                />
              </td>
              <td>{impactRunes}</td>
              <td>{dodgeRunes}</td>
              <td>
                <Checkbox
                  name="Dodge"
                  checked={defenderStamina && defenderStamina.dodge > 0}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td>
                <Checkbox
                  name="Damage"
                  handleChange={handleDamageChange}
                  checked={damageStamina > 0}
                  leftLabel
                />
              </td>
              <td>{damageRunes}</td>
              <td>{blockRunes}</td>
              <td>
                <Checkbox
                  name="Block"
                  checked={defenderStamina && defenderStamina.block > 0}
                  disabled
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>Attack</button>
      </form>
    </div>
  );
}

function calcRunes(
  turn: Turn,
  impactStamina: number,
  defenderStamina: DefendStamina | undefined,
  damageStamina: number
) {
  const { attacker, defender } = turn;
  if (defender === undefined) {
    throw Error("defender should be defined");
  }
  const impactRunes = attacker.attributes.agility * (impactStamina > 0 ? 2 : 1);
  const dodgeRunes =
    defender.attributes.agility *
    (defenderStamina && defenderStamina.dodge > 0 ? 2 : 1);
  const damageRunes =
    attacker.attributes.strength * (damageStamina > 0 ? 2 : 1);
  const blockRunes =
    defender.attributes.strength *
    (defenderStamina && defenderStamina.block > 0 ? 2 : 1);
  return { impactRunes, dodgeRunes, damageRunes, blockRunes };
}

function EmptyDiv() {
  return <div>&nbsp;</div>;
}

function Checkbox(props: {
  name: string;
  disabled?: boolean;
  checked?: boolean;
  className?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftLabel?: boolean;
}) {
  const { name, disabled, checked, className, handleChange, leftLabel } = props;
  return (
    <div className={className}>
      {leftLabel && <label htmlFor={name}>{name}</label>}
      <input
        type="checkbox"
        id={name}
        name={name}
        disabled={disabled}
        onChange={handleChange}
        checked={checked}
      />
      {!leftLabel && <label htmlFor={name}>{name}</label>}
    </div>
  );
}

function DefenseInteraction(props: InteractionViewProps) {
  const { turn, character, className } = props;
  return (
    <div className={className}>
      <div>Defense. TODO...</div>
    </div>
  );
}

function WaitingInteraction(props: InteractionViewProps) {
  const { turn, className } = props;
  return (
    <div className={className}>
      <div>{explainWait(turn)}</div>
    </div>
  );
}

function explainWait(turn: Turn) {
  switch (turn.step) {
    case "SelectOpponent":
      return turn.attacker + " turn starts...";
    case "DecideStaminaLowerIni":
    case "DecideStaminaHigherIni":
      return turn.attacker + " is attacking " + turn.defender + "...";
    case "AttackResolved":
      return explainAttackResult(turn);
    default:
      return "Waiting...";
  }
}

function explainAttackResult(turn: Turn) {
  const { attacks, attacker, defender } = turn;
  const attackResult = attacks[attacks.length - 1].attackResult;
  if (attackResult === undefined) {
    throw Error("No attackResult to explain");
  }
  if (defender === undefined) {
    throw Error("No defender to explain attackResult");
  }
  if (attackResult.isHit) {
    return (
      attacker.name +
      " hit " +
      defender.name +
      " causing " +
      attackResult.damage +
      " damage" +
      (attackResult.stunned === 1 ? ", 1 turn stun" : "") +
      (attackResult.stunned === 2 ? ", 2 turns stun" : "") +
      (attackResult.coverageDamage > 0
        ? ", " + attackResult.coverageDamage + " coverage damage"
        : "") +
      "."
    );
  } else {
    return attacker + " did not hit " + defender;
  }
}

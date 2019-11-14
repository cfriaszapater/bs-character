import React, { useState } from "react";
import { Character } from "../../store/character/types";
import {
  AttackStamina,
  DefendStamina,
  Step,
  Turn
} from "../../store/combat/types";
import { EmptyRow } from "../character/emptyRow";
import { decodeTurn } from "./decodeTurn";

interface InteractionViewProps {
  character: Character;
  turn: Turn;
  className?: string;
  resolveAttack: (stamina: AttackStamina | DefendStamina) => any;
}

export function InteractionView(props: InteractionViewProps) {
  const { turn, character } = props;
  const {
    opponent,
    attacking,
    defenderStamina,
    defending,
    attackerStamina
  } = decodeTurn(character, turn);

  if (attacking) {
    return AttackInteraction(props);
  } else if (defending) {
    return DefenseInteraction(props);
  } else {
    throw Error(
      "Should be attacking or defending, it is neither: " + JSON.stringify(turn)
    );
  }
}

function AttackInteraction(props: InteractionViewProps) {
  const { turn, character, className, resolveAttack } = props;

  return (
    <div className={className + " px-0"}>
      <EmptyDiv />
      <div className="grouped-container">
        <div>Attack. {decision(turn.step)}</div>
        <EmptyDiv />
        <EmptyDiv />
        <AttackInvestStaminaForm
          defenderStamina={turn.defenderStamina}
          resolveAttack={resolveAttack}
        />
        {turn.attackResult && <div>{JSON.stringify(turn.attackResult)}</div>}
      </div>
    </div>
  );
}

function AttackInvestStaminaForm(props: {
  defenderStamina?: DefendStamina;
  resolveAttack: (stamina: AttackStamina | DefendStamina) => any;
}) {
  const { defenderStamina, resolveAttack } = props;

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

  return (
    <form name="invest-stamina" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between">
        <Checkbox
          name="Impact"
          handleChange={handleImpactChange}
          checked={impactStamina > 0}
          leftLabel
        />
        <Checkbox
          name="Dodge"
          checked={defenderStamina && defenderStamina.dodge > 0}
          disabled
        />
      </div>
      <div className="d-flex justify-content-between">
        <Checkbox
          name="Damage"
          handleChange={handleDamageChange}
          checked={damageStamina > 0}
          leftLabel
        />
        <Checkbox
          name="Block"
          checked={defenderStamina && defenderStamina.block > 0}
          disabled
        />
      </div>
      <button>Attack</button>
    </form>
  );
}

function EmptyDiv() {
  return <div>&nbsp;</div>;
}

function decision(step: Step) {
  switch (step) {
    case "DecideStaminaHigherIni":
      return "Invest stamina?";

    default:
      return "Waiting for combat to evolve.";
  }
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
      <div>Defense. {decision(turn.step)}</div>
    </div>
  );
}

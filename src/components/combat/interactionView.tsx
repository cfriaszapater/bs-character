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
  const { turn, character, className } = props;

  return (
    <div className={className + " px-0"}>
      <EmptyDiv />
      <div className="grouped-container">
        <div>Attack. {decision(turn.step)}</div>
        <EmptyDiv />
        <EmptyDiv />
        <AttackInvestStaminaForm defenderStamina={turn.defenderStamina} />
      </div>
    </div>
  );
}

function AttackInvestStaminaForm(props: { defenderStamina?: DefendStamina }) {
  const { defenderStamina } = props;

  const [impactStamina, setImpactStamina] = useState(0);
  const [damageStamina, setDamageStamina] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      "handleSubmit with impactStamina, damageStamina",
      impactStamina,
      damageStamina
    );
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
        />
        <Checkbox
          name="Dodge"
          checked={defenderStamina && defenderStamina.Dodge > 0}
          disabled
        />
      </div>
      <div className="d-flex justify-content-between">
        <Checkbox
          name="Damage"
          handleChange={handleDamageChange}
          checked={damageStamina > 0}
        />
        <Checkbox
          name="Block"
          checked={defenderStamina && defenderStamina.Block > 0}
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
}) {
  const { name, disabled, checked, className, handleChange } = props;
  return (
    <div className={className}>
      <label>
        <input
          type="checkbox"
          id={name}
          name={name}
          disabled={disabled}
          onChange={handleChange}
          checked={checked}
        />
        {name}
      </label>
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

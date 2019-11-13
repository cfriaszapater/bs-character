import React from "react";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
  };

  return (
    <form name="invest-stamina" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between">
        <Checkbox name="Impact" />
        <Checkbox
          name="Dodge"
          checked={defenderStamina && defenderStamina.Dodge > 0}
          disabled
        />
      </div>
      <div className="d-flex justify-content-between">
        <Checkbox name="Damage" />
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
}) {
  const { name, disabled, checked, className } = props;
  return (
    <div className={className}>
      <label>
        <input
          type="checkbox"
          id={name}
          name={name}
          defaultChecked={checked}
          disabled={disabled}
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

import React from "react";
import { Character } from "../../store/character/types";
import {
  AttackStaminaOption,
  DefendStaminaOption,
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
  const { turn, character, className } = props;
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
    <div className={className}>
      <div>Attack. {decision(turn.step)}</div>
      <EmptyRow />
      <EmptyRow />
      <EmptyRow />
      <div className="row justify-content-between">
        <Checkbox name="Impact" />
        {/* TODO check if defender invested Sta */}
        <Checkbox name="Dodge" checked={true} />
      </div>
      <div className="row justify-content-between">
        <Checkbox name="Damage" />
        {/* TODO check if defender invested Sta */}
        <Checkbox name="Block" checked={true} />
      </div>
    </div>
  );
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
  checked?: boolean;
  className?: string;
}) {
  const { name, checked, className } = props;
  return (
    <div className={className}>
      <label>
        <input type="checkbox" id={name} name={name} defaultChecked={checked} />
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

import React from "react";
import { Character } from "../../store/character/types";
import {
  AttackStaminaOption,
  DefendStaminaOption,
  Turn
} from "../../store/combat/types";
import { decodeTurn } from "./decodeTurn";

export function InteractionView(props: {
  character: Character;
  turn: Turn;
  className?: string;
}) {
  const { turn, character, className } = props;
  const {
    opponent,
    attacking,
    defenderStamina,
    defending,
    attackerStamina
  } = decodeTurn(character, turn);
  return <div className={className}>interaction view</div>;
}

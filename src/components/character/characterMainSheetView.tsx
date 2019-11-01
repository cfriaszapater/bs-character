import React from "react";
import { Character } from "../../store/character/types";
import AttackView from "./attackView";
import { AttributesView } from "./attributesView";
import DefenseView from "./defenseView";

export function CharacterMainSheetView(props: { character: Character }) {
  const { character } = props;
  return (
    <div id="main-sheet" className="col">
      {/* Combat sheet */}
      <div id="personal-info" className="row">
        <div>Name: {character.name}</div>
      </div>
      <div id="main" className="row">
        <AttributesView
          attributes={character.attributes}
          className="col-3 grouped-container"
        />
        <AttackView
          characteristics={character.characteristics}
          className="col-3 grouped-container"
        />
        <DefenseView
          characteristics={character.characteristics}
          className="col-6 grouped-container"
        />
      </div>
    </div>
  );
}

import React from "react";
import { Character } from "../../store/character/types";
import AttackView from "./attackView";
import { AttributesView } from "./attributesView";
import DefenseView from "./defenseView";

export function CharacterMainSheetView(props: {
  character: Character;
  updateCharacteristics?: (...c: any) => any;
  updateEquipment?: (...c: any) => any;
}) {
  const { character, updateCharacteristics, updateEquipment } = props;
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
          updateCharacteristics={updateCharacteristics}
          equipment={character.equipment}
          updateEquipment={updateEquipment}
        />
        <DefenseView
          characteristics={character.characteristics}
          className="col-6 grouped-container"
          updateCharacteristics={updateCharacteristics}
          equipment={character.equipment}
          updateEquipment={updateEquipment}
        />
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Character } from "../../store/character/types";
import AttackView from "./attackView";
import { AttributesView } from "./attributesView";
import DefenseView from "./defenseView";

export function CharacterMainSheetView(props: {
  character: Character;
  updateCharacteristics?: (...c: any) => any;
  updateEquipment?: (...c: any) => any;
  updateAttributes?: (...c: any) => any;
  className?: string;
}) {
  const {
    character,
    updateCharacteristics,
    updateEquipment,
    updateAttributes,
    className
  } = props;

  const [editing, setEditing] = useState(false);
  function handleClickEdit(e: React.SyntheticEvent) {
    e.preventDefault();
    setEditing(true);
  }

  return (
    <div id="main-sheet" className={className}>
      {/* Combat sheet */}
      <div id="personal-info" className="row justify-content-between">
        <div>Name: {character.name}</div>
        <a href="?edit" onClick={handleClickEdit}>
          <i style={{ fontSize: 12 }} className="fas">
            &#xf303;
          </i>
        </a>
      </div>
      <div id="main" className="row">
        <AttributesView
          attributes={character.attributes}
          className="col-3 grouped-container"
          editing={editing}
          updateAttributes={updateAttributes}
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

import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";
import * as characterActions from "../../store/character/characterActions";
import {
  Equipment,
  EquipPositions,
  Item,
  ItemTypes,
  Weapon
} from "../../store/character/types";

type MainHandViewProps = {
  className?: string;
  updateEquipment: typeof characterActions.updateEquipment;
} & PropsFromState;

function MainHandView(props: MainHandViewProps) {
  return ItemEquippedView(props, EquipPositions.MainHand);
}

function ItemEquippedView(props: MainHandViewProps, position: EquipPositions) {
  const { className, equipment, updateEquipment } = props;
  const { carried, equipped } = equipment;

  function carriedItemById(id: string) {
    return carried.filter(item => item.id === id)[0];
  }

  function handleChange(e: SyntheticEvent<HTMLSelectElement>) {
    updateEquipment({
      ...equipment,
      equipped: {
        ...equipment.equipped,
        [position]: carriedItemById(e.currentTarget.value) as Weapon
      }
    });
  }

  const otherPositions = Object.keys(equipment.equipped).filter(
    pKey => pKey !== position
  );
  const notWornElsewhere = (item: Item) =>
    otherPositions.every(
      otherPosition =>
        !itemIn(item, equipped[otherPosition as EquipPositions] as Item)
    );
  const itemInPosition = equipped[position];
  return (
    <div className={className} id="main-hand">
      <select
        name="main-hand-weapon"
        className="w-100"
        onChange={handleChange}
        defaultValue={itemInPosition ? itemInPosition.id : undefined}
      >
        {carried
          .filter(notWornElsewhere)
          .filter(item => item.type === ItemTypes.Weapon)
          .map(item => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
}

function itemIn(item: Item, position: Item) {
  return position !== null && item.id === position.id;
}

interface PropsFromState {
  equipment: Equipment;
}

const mapStateToProps = (state: AppState): PropsFromState => ({
  equipment: state.character.character.equipment
});

export default connect(
  mapStateToProps,
  { updateEquipment: characterActions.updateEquipment }
)(MainHandView);

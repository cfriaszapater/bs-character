import React, { SyntheticEvent } from "react";
import * as characterActions from "../../../store/character/characterActions";
import {
  Equipment,
  EquipPositions,
  Item,
  ItemTypes
} from "../../../store/character/types";

export interface ItemEquippedViewProps {
  className?: string;
  updateEquipment: typeof characterActions.updateEquipment;
  equipment: Equipment;
  id: string;
}

export function ItemEquippedView(
  props: ItemEquippedViewProps,
  position: EquipPositions,
  allowedItemTypesInPosition: ItemTypes[],
  placeholderOptionText: string
) {
  const { className, equipment, updateEquipment, id } = props;
  const { carried, equipped } = equipment;

  function carriedItemById(itemId: string) {
    return carried.filter(item => item.id === itemId)[0];
  }

  function handleChange(e: SyntheticEvent<HTMLSelectElement>) {
    const itemId = e.currentTarget.value;
    updateEquipment({
      ...equipment,
      equipped: {
        ...equipment.equipped,
        [position]:
          itemId === null || itemId === "" ? null : carriedItemById(itemId)
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
    <div className={className} id={id}>
      <select
        name={id}
        className="w-100"
        onChange={handleChange}
        defaultValue={itemInPosition ? itemInPosition.id : undefined}
      >
        {[
          <option value="" key="placeholder-option">
            {placeholderOptionText}
          </option>
        ].concat(
          carried
            .filter(notWornElsewhere)
            .filter(item =>
              allowedItemTypesInPosition.some(
                itemType => item.type === itemType
              )
            )
            .map(item => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))
        )}
      </select>
    </div>
  );
}

function itemIn(item: Item, position: Item) {
  return position !== null && item.id === position.id;
}

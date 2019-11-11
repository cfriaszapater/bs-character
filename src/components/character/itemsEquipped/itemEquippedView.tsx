import React, { SyntheticEvent } from "react";
import {
  Armor,
  Equipment,
  EquipPositions,
  Item,
  ItemTypes,
  Shield,
  Weapon
} from "../../../store/character/types";

export interface ItemEquippedViewProps {
  className?: string;
  updateEquipment?: (...c: any) => any;
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

  const otherPositions = Object.keys(equipment.equipped).filter(
    pKey => pKey !== position
  );
  const notWornElsewhere = (item: Item) =>
    otherPositions.every(
      otherPosition =>
        !itemIn(item, equipped[otherPosition as EquipPositions] as Item)
    );
  const itemInPosition = equipped[position];

  if (typeof updateEquipment === "function") {
    const handleChange = (e: SyntheticEvent<HTMLSelectElement>) => {
      const itemId = e.currentTarget.value;
      updateEquipment({
        ...equipment,
        equipped: {
          ...equipment.equipped,
          [position]:
            itemId === null || itemId === "" ? null : carriedItemById(itemId)
        }
      });
    };
    return VariableItemEquipped(
      className,
      id,
      handleChange,
      itemInPosition,
      placeholderOptionText,
      carried,
      notWornElsewhere,
      allowedItemTypesInPosition
    );
  } else {
    return (
      <div className={className} id={id}>
        {itemInPosition ? itemInPosition.name : placeholderOptionText}
      </div>
    );
  }
}

function VariableItemEquipped(
  className: string | undefined,
  id: string,
  handleChange: (e: React.SyntheticEvent<HTMLSelectElement, Event>) => void,
  itemInPosition: Weapon | Shield | Armor | null,
  placeholderOptionText: string,
  carried: Item[],
  notWornElsewhere: (item: Item) => boolean,
  allowedItemTypesInPosition: ItemTypes[]
) {
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

import { EquipPositions, ItemTypes } from "../../../store/character/types";
import { ItemEquippedView, ItemEquippedViewProps } from "./itemEquippedView";

export default function SecondaryHandView(props: ItemEquippedViewProps) {
  return ItemEquippedView(
    props,
    EquipPositions.SecondaryHand,
    [ItemTypes.Weapon, ItemTypes.Shield],
    "-shield or secondary weapon-"
  );
}

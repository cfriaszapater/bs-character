import { EquipPositions, ItemTypes } from "../../../store/character/types";
import { ItemEquippedView, ItemEquippedViewProps } from "./itemEquippedView";

export default function BodyView(props: ItemEquippedViewProps) {
  return ItemEquippedView(
    props,
    EquipPositions.Body,
    [ItemTypes.Armor],
    "-armor-"
  );
}

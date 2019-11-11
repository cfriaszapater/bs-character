import { EquipPositions, ItemTypes } from "../../../store/character/types";
import { ItemEquippedView, ItemEquippedViewProps } from "./itemEquippedView";

export default function MainHandView(props: ItemEquippedViewProps) {
  return ItemEquippedView(
    props,
    EquipPositions.MainHand,
    [ItemTypes.Weapon],
    "-main weapon-"
  );
}

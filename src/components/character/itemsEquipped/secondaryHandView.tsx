import { connect } from "react-redux";
import { AppState } from "../../../store/rootReducer";
import * as characterActions from "../../../store/character/characterActions";
import {
  Equipment,
  EquipPositions,
  ItemTypes
} from "../../../store/character/types";
import { ItemEquippedView, ItemEquippedViewProps } from "./itemEquippedView";

function SecondaryHandView(props: ItemEquippedViewProps) {
  return ItemEquippedView(
    props,
    EquipPositions.SecondaryHand,
    [ItemTypes.Weapon, ItemTypes.Shield],
    "-shield or secondary weapon-"
  );
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
)(SecondaryHandView);

import { connect } from "react-redux";
import { AppState } from "../../../store/rootReducer";
import * as characterActions from "../../../store/character/characterActions";
import {
  Equipment,
  EquipPositions,
  ItemTypes
} from "../../../store/character/types";
import { ItemEquippedView, ItemEquippedViewProps } from "./itemEquippedView";

function MainHandView(props: ItemEquippedViewProps) {
  return ItemEquippedView(
    props,
    EquipPositions.MainHand,
    [ItemTypes.Weapon],
    "-main weapon-"
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
)(MainHandView);

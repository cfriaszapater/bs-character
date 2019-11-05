import { connect } from "react-redux";
import { AppState } from "../../../store/rootReducer";
import * as characterActions from "../../../store/character/characterActions";
import {
  Equipment,
  EquipPositions,
  ItemTypes
} from "../../../store/character/types";
import { ItemEquippedView, ItemEquippedViewProps } from "./itemEquippedView";

function BodyView(props: ItemEquippedViewProps) {
  return ItemEquippedView(
    props,
    EquipPositions.Body,
    [ItemTypes.Armor],
    "-armor-"
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
)(BodyView);

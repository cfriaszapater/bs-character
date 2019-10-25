import React from "react";
import { DefenseCharacteristics } from "../../store/character/types";
import { agilityColor, strengthColor } from "./colors";
import { fractionForCharacteristic } from "./fractionForCharacteristic";
import HorizontalPercentageBar from "./horizontalPercentageBar";

export function DefenseCharacteristicsView(props: {
  defense: DefenseCharacteristics;
}) {
  const { defense } = props;
  return (
    <div id="defenseCharacteristics" className="col grouped-container">
      <div className="row">
        <Dodge value={defense.dodge} />
        <Coverage value={defense.coverage} />
        <Placeholder />
      </div>
      <div className="row">
        <Blunt value={defense.blunt} />
        <Cut value={defense.cut} />
        <Penetrating value={defense.penetrating} />
      </div>
    </div>
  );
}

function Dodge(props: { value: number }) {
  return DefenseCharacteristic(
    "Dod",
    props.value,
    fractionForCharacteristic(props.value, 0, 3),
    agilityColor
  );
}

function Coverage(props: { value: number }) {
  return DefenseCharacteristic(
    "Cov",
    props.value,
    fractionForCharacteristic(props.value, 3, 9),
    agilityColor
  );
}

function Blunt(props: { value: number }) {
  return DefenseCharacteristic(
    "Blu",
    props.value,
    fractionForCharacteristic(props.value, 0, 6),
    strengthColor
  );
}

function Cut(props: { value: number }) {
  return DefenseCharacteristic(
    "Cut",
    props.value,
    fractionForCharacteristic(props.value, 0, 6),
    strengthColor
  );
}

function Penetrating(props: { value: number }) {
  return DefenseCharacteristic(
    "Pen",
    props.value,
    fractionForCharacteristic(props.value, 0, 6),
    strengthColor
  );
}

function DefenseCharacteristic(
  name: string,
  value: number,
  fractionValue: number,
  color: string
) {
  return (
    <div className="col innergrid-with-bottom">
      <div className="row">
        <div className="col-2">{name} </div>
        <div className="col-2 num">{value}</div>
        <HorizontalPercentageBar
          widthFraction={fractionValue}
          backgroundColor={color}
        />
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="col innergrid-with-bottom">{/*intentionally empty*/}</div>
  );
}

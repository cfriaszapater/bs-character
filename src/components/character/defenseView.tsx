import React, { useState } from "react";
import * as characterActions from "../../store/character/characterActions";
import { Characteristics } from "../../store/character/types";
import { agilityColor, strengthColor, willColor } from "./colors";
import { EditableInput } from "./editableInput";
import { EmptyCol } from "./emptyCol";
import { EmptyRow } from "./emptyRow";
import { fractionForCharacteristic } from "./fractionForCharacteristic";
import HorizontalPercentageBar from "./horizontalPercentageBar";
import BodyView from "./itemsEquipped/bodyView";
import SecondaryHandView from "./itemsEquipped/secondaryHandView";
import { cellNumStyle, cellStyle } from "./styles";

interface CharacteristicsViewProps {
  characteristics: Characteristics;
  updateCharacteristics?: typeof characterActions.updateCharacteristics;
  className?: string;
}

export default function DefenseView(props: CharacteristicsViewProps) {
  const { characteristics, updateCharacteristics, className } = props;
  return (
    <div id="defense" className={className}>
      <BodyView className="row innergrid-with-bottom" id="equipped-in-body" />
      <SecondaryHandView
        className="row innergrid-with-bottom"
        id="equipped-in-secondary-hand"
      />
      <EmptyRow />
      <div className="row">
        <Dodge value={characteristics.dodge} />
        <Coverage
          currentValue={characteristics.coverage.current}
          value={characteristics.coverage.max}
          characteristics={characteristics}
          updateCharacteristics={updateCharacteristics}
        />
      </div>
      <div className="row">
        <Blunt value={characteristics.blunt} />
        <EmptyCol />
      </div>
      <div className="row">
        <Cut value={characteristics.cut} />
        <HealthView
          currentValue={characteristics.health.current}
          value={characteristics.health.max}
          characteristics={characteristics}
          updateCharacteristics={updateCharacteristics}
        />
      </div>
      <div className="row">
        <Penetrating value={characteristics.penetrating} />
        <EmptyCol />
      </div>
    </div>
  );
}

function Dodge(props: { value: number }) {
  return StaticDefenseCharacteristic(
    "Dod",
    props.value,
    fractionForCharacteristic(props.value, 0, 3),
    agilityColor
  );
}

function Coverage(props: {
  currentValue: number;
  value: number;
  characteristics: Characteristics;
  updateCharacteristics?: typeof characterActions.updateCharacteristics;
}) {
  const name = "Cov";
  const min = 3;
  const max = 9;
  const color = agilityColor;
  const { updateCharacteristics, value, currentValue, characteristics } = props;

  const handleChange =
    typeof updateCharacteristics === "function"
      ? (e: React.SyntheticEvent<HTMLInputElement>) => {
          const updatedCharacteristics = {
            ...props.characteristics,
            coverage: {
              ...props.characteristics.coverage,
              current: Number(e.currentTarget.value)
            }
          };
          updateCharacteristics(updatedCharacteristics);
        }
      : undefined;

  return DefenseCharacteristicView(
    handleChange,
    name,
    currentValue,
    min,
    max,
    value,
    color,
    characteristics.dodge
  );
}

function Blunt(props: { value: number }) {
  return StaticDefenseCharacteristic(
    "Blu",
    props.value,
    fractionForCharacteristic(props.value, 0, 6),
    strengthColor
  );
}

function Cut(props: { value: number }) {
  return StaticDefenseCharacteristic(
    "Cut",
    props.value,
    fractionForCharacteristic(props.value, 0, 6),
    strengthColor
  );
}

function Penetrating(props: { value: number }) {
  return StaticDefenseCharacteristic(
    "Pen",
    props.value,
    fractionForCharacteristic(props.value, 0, 6),
    strengthColor
  );
}

function HealthView(props: {
  currentValue: number;
  value: number;
  characteristics: Characteristics;
  updateCharacteristics?: typeof characterActions.updateCharacteristics;
}) {
  const name = "HP";
  const min = 0;
  const max = 20;
  const color = willColor;
  const { updateCharacteristics, value, currentValue, characteristics } = props;

  const handleChange =
    typeof updateCharacteristics === "function"
      ? (e: React.SyntheticEvent<HTMLInputElement>) => {
          const updatedCharacteristics = {
            ...props.characteristics,
            health: {
              ...props.characteristics.health,
              current: Number(e.currentTarget.value)
            }
          };
          updateCharacteristics(updatedCharacteristics);
        }
      : undefined;

  return DefenseCharacteristicView(
    handleChange,
    name,
    currentValue,
    min,
    max,
    value,
    color,
    characteristics.dodge
  );
}

function DefenseCharacteristicView(
  handleChange:
    | ((e: React.SyntheticEvent<HTMLInputElement, Event>) => void)
    | undefined,
  name: string,
  currentValue: number,
  min: number,
  max: number,
  value: number,
  color: string,
  minValue?: number
) {
  let resul;
  if (typeof handleChange === "function") {
    resul = VariableDefenseCharacteristic(
      name,
      currentValue,
      fractionForCharacteristic(currentValue, min, max),
      value,
      color,
      handleChange,
      minValue
    );
  } else {
    resul = StaticDefenseCharacteristic(
      name,
      value,
      fractionForCharacteristic(value, min, max),
      color
    );
  }
  return resul;
}

function StaticDefenseCharacteristic(
  name: string,
  value: number,
  fractionValue: number,
  color: string
) {
  return (
    <div className="col innergrid-with-bottom right-border-not-last">
      <div className="row">
        <div className={cellStyle()}>{name} </div>
        <div className={cellNumStyle()}>{value}</div>
        <HorizontalPercentageBar
          widthFraction={fractionValue}
          backgroundColor={color}
        />
      </div>
    </div>
  );
}

function VariableDefenseCharacteristic(
  name: string,
  currentValue: number,
  fractionValue: number,
  value: number,
  color: string,
  handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => void,
  minValue?: number
) {
  const [editing, setEditing] = useState(false);

  function handleClick() {
    setEditing(true);
  }

  function handleBlur() {
    setEditing(false);
  }

  return (
    <div className="col innergrid-with-bottom right-border-not-last">
      <div className="row">
        <div className={cellStyle()}>{name} </div>
        <div
          className={cellNumStyle()}
          onClick={handleClick}
          onBlur={handleBlur}
        >
          {editing
            ? EditableInput(name, currentValue, value, handleChange, minValue)
            : currentValue + "/" + value}
        </div>
        <HorizontalPercentageBar
          widthFraction={fractionValue}
          backgroundColor={color}
        />
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Characteristics } from "../../store/character/types";
import {
  agilityColor,
  defaultColor,
  staminaColor,
  strengthColor
} from "./colors";
import { EditableInput } from "./editableInput";
import { fractionForCharacteristic } from "./fractionForCharacteristic";
import HorizontalPercentageBar from "./horizontalPercentageBar";
import MainHandView from "./itemsEquipped/mainHandView";
import { cellNumStyle, cellStyle } from "./styles";

interface CharacteristicsViewProps {
  characteristics: Characteristics;
  updateCharacteristics?: (...c: any) => any;
  className?: string;
}

export default function AttackView(props: CharacteristicsViewProps) {
  const { characteristics, updateCharacteristics, className } = props;
  return (
    <div id="attack" className={className}>
      <MainHandView
        className="row innergrid-with-bottom"
        id="equipped-in-main-hand"
      />
      <InitiativeView
        currentValue={characteristics.initiative.current}
        value={characteristics.initiative.max}
        characteristics={characteristics}
        updateCharacteristics={updateCharacteristics}
      />
      <StaminaView
        currentValue={characteristics.stamina.current}
        value={characteristics.stamina.max}
        characteristics={characteristics}
        updateCharacteristics={updateCharacteristics}
      />
      <ImpactView value={characteristics.impact} />
      <DamageView value={characteristics.damage} />
    </div>
  );
}

/**
 * A variable view if updateCharacteristics function is passed, static view otherwise.
 */
function InitiativeView(props: {
  currentValue: number;
  value: number;
  characteristics: Characteristics;
  updateCharacteristics?: (...c: any) => any;
}) {
  const name = "Ini";
  const min = 3;
  const max = 11;
  const color = defaultColor;
  const { updateCharacteristics } = props;
  if (typeof updateCharacteristics === "function") {
    const handleInitiativeChange = (
      e: React.SyntheticEvent<HTMLInputElement>
    ) => {
      const updatedCharacteristics = {
        ...props.characteristics,
        initiative: {
          ...props.characteristics.initiative,
          current: Number(e.currentTarget.value)
        }
      };
      updateCharacteristics(updatedCharacteristics);
    };
    return VariableCharacteristicView(
      name,
      props.currentValue,
      fractionForCharacteristic(props.currentValue, min, max),
      props.value,
      color,
      handleInitiativeChange
    );
  } else {
    return StaticCharacteristicView(
      name,
      props.value,
      fractionForCharacteristic(props.value, min, max),
      color
    );
  }
}

function StaminaView(props: {
  currentValue: number;
  value: number;
  characteristics: Characteristics;
  updateCharacteristics?: (...c: any) => any;
}) {
  const name = "Sta";
  const min = 0;
  const max = 20;
  const color = staminaColor;
  const { updateCharacteristics } = props;
  if (typeof updateCharacteristics === "function") {
    const handleStaminaChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
      const updatedCharacteristics = {
        ...props.characteristics,
        stamina: {
          ...props.characteristics.stamina,
          current: Number(e.currentTarget.value)
        }
      };
      updateCharacteristics(updatedCharacteristics);
    };
    return VariableCharacteristicView(
      name,
      props.currentValue,
      fractionForCharacteristic(props.currentValue, min, max),
      props.value,
      color,
      handleStaminaChange
    );
  } else {
    return StaticCharacteristicView(
      name,
      props.value,
      fractionForCharacteristic(props.value, min, max),
      color
    );
  }
}

function ImpactView(props: { value: number }) {
  return StaticCharacteristicView(
    "Imp",
    props.value,
    fractionForCharacteristic(props.value, 2, 5),
    agilityColor
  );
}

function DamageView(props: { value: number }) {
  return StaticCharacteristicView(
    "Da",
    props.value,
    fractionForCharacteristic(props.value, 2, 8),
    strengthColor
  );
}

function StaticCharacteristicView(
  name: string,
  value: number,
  fractionValue: number,
  color: string
) {
  return (
    <div className="row innergrid-with-bottom">
      <div className={cellStyle()}>{name} </div>
      <div className={cellNumStyle()}>{value}</div>
      <HorizontalPercentageBar
        widthFraction={fractionValue}
        backgroundColor={color}
      />
    </div>
  );
}

function VariableCharacteristicView(
  name: string,
  currentValue: number,
  fractionValue: number,
  value: number,
  color: string,
  handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
) {
  const [editing, setEditing] = useState(false);

  function handleClick() {
    setEditing(true);
  }

  function handleBlur() {
    setEditing(false);
  }

  return (
    <div className="row innergrid-with-bottom" id={name}>
      <div className={cellStyle()}>{name} </div>
      <div className={cellNumStyle()} onClick={handleClick} onBlur={handleBlur}>
        {editing
          ? EditableInput(name, currentValue, value, handleChange)
          : currentValue + "/" + value}
      </div>
      <HorizontalPercentageBar
        widthFraction={fractionValue}
        backgroundColor={color}
      />
    </div>
  );
}

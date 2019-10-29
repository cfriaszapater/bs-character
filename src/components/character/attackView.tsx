import React, { useState } from "react";
import { connect } from "react-redux";
import * as characterActions from "../../store/character/characterActions";
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
import MainHandView from "./mainHandView";
import { cellNumStyle, cellStyle } from "./styles";

interface CharacteristicsViewProps {
  characteristics: Characteristics;
  updateCharacteristics: typeof characterActions.updateCharacteristics;
  className?: string;
}

function AttackView(props: CharacteristicsViewProps) {
  const { characteristics, updateCharacteristics, className } = props;
  return (
    <div id="attack" className={className}>
      <MainHandView className="row innergrid-with-bottom" />
      <InitiativeView
        currentValue={characteristics.initiative.current}
        value={characteristics.initiative.max}
        characteristics={characteristics}
        updateCharacteristics={updateCharacteristics}
      />
      <StaminaView
        currrentValue={characteristics.stamina.current}
        value={characteristics.stamina.max}
        characteristics={characteristics}
        updateCharacteristics={updateCharacteristics}
      />
      <ImpactView value={characteristics.impact} />
      <DamageView value={characteristics.damage} />
    </div>
  );
}

function InitiativeView(props: {
  currentValue: number;
  value: number;
  characteristics: Characteristics;
  updateCharacteristics: typeof characterActions.updateCharacteristics;
}) {
  function handleInitiativeChange(e: React.SyntheticEvent<HTMLInputElement>) {
    const updatedCharacteristics = {
      ...props.characteristics,
      initiative: {
        ...props.characteristics.initiative,
        current: Number(e.currentTarget.value)
      }
    };
    props.updateCharacteristics(updatedCharacteristics);
  }

  return VariableCharacteristic(
    "Ini",
    props.currentValue,
    fractionForCharacteristic(props.currentValue, 3, 11),
    props.value,
    defaultColor,
    handleInitiativeChange
  );
}

function StaminaView(props: {
  currrentValue: number;
  value: number;
  characteristics: Characteristics;
  updateCharacteristics: typeof characterActions.updateCharacteristics;
}) {
  function handleStaminaChange(e: React.SyntheticEvent<HTMLInputElement>) {
    const updatedCharacteristics = {
      ...props.characteristics,
      stamina: {
        ...props.characteristics.stamina,
        current: Number(e.currentTarget.value)
      }
    };
    props.updateCharacteristics(updatedCharacteristics);
  }

  return VariableCharacteristic(
    "Sta",
    props.currrentValue,
    fractionForCharacteristic(props.currrentValue, 0, 20),
    props.value,
    staminaColor,
    handleStaminaChange
  );
}

function ImpactView(props: { value: number }) {
  return Characteristic(
    "Imp",
    props.value,
    fractionForCharacteristic(props.value, 2, 5),
    agilityColor
  );
}

function DamageView(props: { value: number }) {
  return Characteristic(
    "Da",
    props.value,
    fractionForCharacteristic(props.value, 2, 8),
    strengthColor
  );
}

function Characteristic(
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

function VariableCharacteristic(
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

export default connect(
  null,
  { updateCharacteristics: characterActions.updateCharacteristics }
)(AttackView);

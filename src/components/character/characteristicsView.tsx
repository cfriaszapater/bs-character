import React, { useState } from "react";
import { connect } from "react-redux";
import { updateCharacteristics } from "../../store/character/characterActions";
import { Characteristics } from "../../store/character/types";
import {
  agilityColor,
  defaultColor,
  staminaColor,
  strengthColor,
  willColor
} from "./colors";
import { fractionForCharacteristic } from "./fractionForCharacteristic";
import HorizontalPercentageBar from "./horizontalPercentageBar";
import { cellNumStyle, cellStyle } from "./styles";

interface CharacteristicsViewProps {
  characteristics: Characteristics;
  updateCharacteristics: typeof updateCharacteristics;
}

function CharacteristicsView(props: CharacteristicsViewProps) {
  const { characteristics } = props;
  return (
    <div id="characteristics" className="col-3 grouped-container">
      <InitiativeView
        currentValue={characteristics.initiative.current}
        value={characteristics.initiative.max}
        characteristics={characteristics}
      />
      <StaminaView
        currrentValue={characteristics.stamina.current}
        value={characteristics.stamina.max}
        characteristics={characteristics}
      />
      <ImpactView value={characteristics.impact} />
      <DamageView value={characteristics.damage} />
      <HealthView
        currentValue={characteristics.health.current}
        value={characteristics.health.max}
        characteristics={characteristics}
      />
    </div>
  );
}

function InitiativeView(props: {
  currentValue: number;
  value: number;
  characteristics: Characteristics;
}) {
  function handleInitiativeChange() {
    console.log("handleInitiativeChange");
    // TODO
    const updatedCharacteristics = {
      ...props.characteristics
      // TODO initiative: { ...props.characteristics.initiative, current: e.TODO_value }
    };
    updateCharacteristics(updatedCharacteristics);
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
}) {
  function handleStaminaChange() {
    console.log("handleStaminaChange");
    // TODO
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

function HealthView(props: {
  currentValue: number;
  value: number;
  characteristics: Characteristics;
}) {
  function handleHealthChange() {
    console.log("handleHealthChange");
    // TODO
  }

  return VariableCharacteristic(
    "HP",
    props.currentValue,
    fractionForCharacteristic(props.currentValue, 0, 20),
    props.value,
    willColor,
    handleHealthChange
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
  handleChange: () => void
) {
  const [editing, setEditing] = useState(false);

  function handleClick() {
    setEditing(true);
  }

  function handleBlur() {
    setEditing(false);
  }

  return (
    <div className="row innergrid-with-bottom">
      <div className={cellStyle()}>{name} </div>
      {/* TODO switch to editable on click (change "5/6" to "<input type number>") */}
      <div className={cellNumStyle()} onClick={handleClick} onBlur={handleBlur}>
        {editing
          ? editableCurrentValue(name, currentValue, value, handleChange)
          : currentValue + "/" + value}
      </div>
      <HorizontalPercentageBar
        widthFraction={fractionValue}
        backgroundColor={color}
      />
    </div>
  );
}

function editableCurrentValue(
  name: string,
  currentValue: number,
  maxValue: number,
  handleChange: () => void
) {
  return (
    <input
      type="number"
      id={name + "-currentvalue"}
      name={name + "-currentvalue"}
      min="0"
      max={maxValue}
      value={currentValue}
      className="editablenum"
      onChange={handleChange}
    />
  );
}

export default connect(
  null,
  { updateCharacteristics }
)(CharacteristicsView);

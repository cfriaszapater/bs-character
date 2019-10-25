import React from "react";
import { Attributes } from "../../store/character/types";
import { agilityColor, defaultColor, strengthColor, willColor } from "./colors";
import HorizontalPercentageBar from "./horizontalPercentageBar";

export function AttributesView(props: { attributes: Attributes }) {
  const { attributes } = props;
  return (
    <div id="attributes" className="col-2 grouped-container">
      <Endurance value={attributes.endurance} />
      <Agility value={attributes.agility} />
      <Strength value={attributes.strength} />
      <Will value={attributes.will} />
      <Intelligence value={attributes.intelligence} />
      <Leadership value={attributes.leadership} />
      <Power value={attributes.power} />
      <Defense value={attributes.defense} />
      <Extension value={attributes.extension} />
    </div>
  );
}

function Endurance(props: { value: number }) {
  return Attribute("E", props.value, defaultColor);
}

function Agility(props: { value: number }) {
  return Attribute("A", props.value, agilityColor);
}

function Strength(props: { value: number }) {
  return Attribute("S", props.value, strengthColor);
}

function Will(props: { value: number }) {
  return Attribute("W", props.value, willColor);
}

function Intelligence(props: { value: number }) {
  return Attribute("I", props.value, defaultColor);
}

function Leadership(props: { value: number }) {
  return Attribute("L", props.value, defaultColor);
}

function Power(props: { value: number }) {
  return Attribute("P", props.value, defaultColor);
}

function Defense(props: { value: number }) {
  return Attribute("D", props.value, defaultColor);
}

function Extension(props: { value: number }) {
  return Attribute("E", props.value, defaultColor);
}

function Attribute(name: string, value: number, color: string) {
  return (
    <div className="row innergrid">
      <div className="col-1">{name} </div>
      <div className="col-1 num">{value}</div>
      <HorizontalPercentageBar
        width={percentageForAttribute(value)}
        backgroundColor={color}
      />
    </div>
  );
}

const maxAttributeValue = 5;

function percentageForAttribute(value: number): number {
  return value / maxAttributeValue;
}

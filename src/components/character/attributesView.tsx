import React from "react";
import { Attributes } from "../../store/character/types";
import { agilityColor, defaultColor, strengthColor, willColor } from "./colors";
import { EmptyRow } from "./emptyRow";
import HorizontalPercentageBar from "./horizontalPercentageBar";
import { cellNumStyle, cellStyle } from "./styles";

export function AttributesView(props: {
  attributes: Attributes;
  className?: string;
}) {
  const { attributes, className } = props;
  return (
    <div id="attributes" className={className}>
      <EmptyRow />
      <EmptyRow />
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
  return Attribute("End", props.value, defaultColor);
}

function Agility(props: { value: number }) {
  return Attribute("Agi", props.value, agilityColor);
}

function Strength(props: { value: number }) {
  return Attribute("Str", props.value, strengthColor);
}

function Will(props: { value: number }) {
  return Attribute("Wil", props.value, willColor);
}

function Intelligence(props: { value: number }) {
  return Attribute("Int", props.value, defaultColor);
}

function Leadership(props: { value: number }) {
  return Attribute("Lea", props.value, defaultColor);
}

function Power(props: { value: number }) {
  return Attribute("Pow", props.value, defaultColor);
}

function Defense(props: { value: number }) {
  return Attribute("Def", props.value, defaultColor);
}

function Extension(props: { value: number }) {
  return Attribute("Ext", props.value, defaultColor);
}

function Attribute(name: string, value: number, color: string) {
  return (
    <div id={name} className="row innergrid">
      <div className={cellStyle()}>{name} </div>
      <div className={cellNumStyle()}>{value}</div>
      <HorizontalPercentageBar
        widthFraction={percentageForAttribute(value)}
        backgroundColor={color}
      />
    </div>
  );
}

const maxAttributeValue = 5;

function percentageForAttribute(value: number): number {
  return value / maxAttributeValue;
}

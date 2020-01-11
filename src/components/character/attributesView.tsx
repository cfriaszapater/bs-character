import React from "react";
import { Attributes } from "../../store/character/types";
import { agilityColor, defaultColor, strengthColor, willColor } from "./colors";
import { EditableInput } from "./editableInput";
import { EmptyRow } from "./emptyRow";
import HorizontalPercentageBar from "./horizontalPercentageBar";
import { cellNumStyle, cellStyle } from "./styles";
import { updateAttributes } from "../../store/character/characterActions";

export function AttributesView(props: {
  attributes: Attributes;
  className?: string;
  editing: boolean;
}) {
  const { attributes, className, editing } = props;
  return (
    <div id="attributes" className={className}>
      <EmptyRow />
      <EmptyRow />
      <Endurance
        value={attributes.endurance}
        attributes={attributes}
        editing={editing}
      />
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

function Endurance(props: {
  value: number;
  attributes: Attributes;
  editing: boolean;
}) {
  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const updatedAttributes: Attributes = {
      ...props.attributes,
      endurance: Number(e.currentTarget.value)
    };
    updateAttributes(updatedAttributes);
  };
  return props.editing
    ? EditableAttribute("End", props.value, defaultColor, handleChange)
    : Attribute("End", props.value, defaultColor);
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

function EditableAttribute(
  name: string,
  value: number,
  color: string,
  handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
) {
  return (
    <div id={name} className="row innergrid">
      <div className={cellStyle()}>{name} </div>
      <div className={cellNumStyle()}>
        {EditableInput(name, value, 5, handleChange)}
      </div>
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

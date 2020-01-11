import React from "react";
import { Attributes } from "../../store/character/types";
import { agilityColor, defaultColor, strengthColor, willColor } from "./colors";
import { EditableInput } from "./editableInput";
import { EmptyRow } from "./emptyRow";
import HorizontalPercentageBar from "./horizontalPercentageBar";
import { cellNumStyle, cellStyle } from "./styles";

export function AttributesView(props: {
  attributes: Attributes;
  className?: string;
  editing: boolean;
  updateAttributes?: (...c: any) => any;
}) {
  const { attributes, className, editing, updateAttributes } = props;
  return (
    <div id="attributes" className={className}>
      <EmptyRow />
      <EmptyRow />
      <Endurance
        value={attributes.endurance}
        attributes={attributes}
        editing={editing}
        updateAttributes={updateAttributes}
      />
      <Agility
        value={attributes.agility}
        attributes={attributes}
        editing={editing}
        updateAttributes={updateAttributes}
      />
      <Strength
        value={attributes.strength}
        attributes={attributes}
        editing={editing}
        updateAttributes={updateAttributes}
      />
      <Will
        value={attributes.will}
        attributes={attributes}
        editing={editing}
        updateAttributes={updateAttributes}
      />
      <Intelligence
        value={attributes.intelligence}
        attributes={attributes}
        editing={editing}
        updateAttributes={updateAttributes}
      />
      <Leadership
        value={attributes.leadership}
        attributes={attributes}
        editing={editing}
        updateAttributes={updateAttributes}
      />
      <Power
        value={attributes.power}
        attributes={attributes}
        editing={editing}
        updateAttributes={updateAttributes}
      />
      <Defense
        value={attributes.defense}
        attributes={attributes}
        editing={editing}
        updateAttributes={updateAttributes}
      />
      <Extension
        value={attributes.extension}
        attributes={attributes}
        editing={editing}
        updateAttributes={updateAttributes}
      />
    </div>
  );
}

function Endurance(props: {
  value: number;
  attributes: Attributes;
  editing: boolean;
  updateAttributes?: (...c: any) => any;
}) {
  return Attribute(props, "endurance", "End", defaultColor);
}

interface AttributeProps {
  value: number;
  attributes: Attributes;
  editing: boolean;
  updateAttributes?: (...c: any) => any;
}

function Attribute(
  props: AttributeProps,
  attributeProperty: string,
  attributeName: string,
  color: string
) {
  const { value, attributes, editing, updateAttributes } = props;
  if (editing && typeof updateAttributes === "function") {
    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
      const updatedAttributes: Attributes = {
        ...attributes,
        [attributeProperty]: Number(e.currentTarget.value)
      };
      updateAttributes(updatedAttributes);
    };
    return EditableAttribute(attributeName, value, color, handleChange);
  } else {
    return StaticAttribute(attributeName, value, color);
  }
}

function Agility(props: AttributeProps) {
  return Attribute(props, "agility", "Agi", agilityColor);
}

function Strength(props: AttributeProps) {
  return Attribute(props, "strength", "Str", strengthColor);
}

function Will(props: AttributeProps) {
  return Attribute(props, "will", "Wil", willColor);
}

function Intelligence(props: AttributeProps) {
  return Attribute(props, "intelligence", "Int", defaultColor);
}

function Leadership(props: AttributeProps) {
  return Attribute(props, "leadership", "Lea", defaultColor);
}

function Power(props: AttributeProps) {
  return Attribute(props, "power", "Pow", defaultColor);
}

function Defense(props: AttributeProps) {
  return Attribute(props, "defense", "Def", defaultColor);
}

function Extension(props: AttributeProps) {
  return Attribute(props, "extension", "Ext", defaultColor);
}

function StaticAttribute(name: string, value: number, color: string) {
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

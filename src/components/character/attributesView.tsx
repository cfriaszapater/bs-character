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
        // attributes={attributes}
        // editing={editing}
      />
      <Strength
        value={attributes.strength}
        // attributes={attributes}
        // editing={editing}
      />
      <Will
        value={attributes.will}
        // attributes={attributes} editing={editing}
      />
      <Intelligence
        value={attributes.intelligence}
        // attributes={attributes}
        // editing={editing}
      />
      <Leadership
        value={attributes.leadership}
        // attributes={attributes}
        // editing={editing}
      />
      <Power
        value={attributes.power}
        // attributes={attributes}
        // editing={editing}
      />
      <Defense
        value={attributes.defense}
        // attributes={attributes}
        // editing={editing}
      />
      <Extension
        value={attributes.extension}
        // attributes={attributes}
        // editing={editing}
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
  const { editing, updateAttributes } = props;
  if (editing && typeof updateAttributes === "function") {
    const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
      const updatedAttributes: Attributes = {
        ...props.attributes,
        endurance: Number(e.currentTarget.value)
      };
      updateAttributes(updatedAttributes);
    };
    return EditableAttribute("End", props.value, defaultColor, handleChange);
  } else {
    return Attribute("End", props.value, defaultColor);
  }
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

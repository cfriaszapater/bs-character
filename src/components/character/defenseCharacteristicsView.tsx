import React from "react";
import { DefenseCharacteristics } from "../../store/character/types";

export function DefenseCharacteristicsView(props: {
  defense: DefenseCharacteristics;
}) {
  const { defense } = props;
  return (
    <div id="defenseCharacteristics" className="col grouped-container">
      <div className="row">
        <Dodge value={defense.dodge} />
        <div className="col">Cov: {defense.coverage}</div>
        <div className="col">{/*intentionally empty*/}</div>
      </div>
      <div className="row">
        <div className="col">Blu: {defense.blunt}</div>
        <div className="col">Cut: {defense.cut}</div>
        <div className="col">Pen: {defense.penetrating}</div>
      </div>
    </div>
  );
}

function Dodge(props: { value: number }) {
  return <div className="col">Dod: {props.value}</div>;
}

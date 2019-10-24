import React from "react";

export default function HorizontalPercentageBar(props: {
  width: number;
  backgroundColor: string;
}) {
  return (
    <div className="col justify-content-start">
      <div
        style={{
          backgroundColor: props.backgroundColor,
          width: props.width + "%"
        }}
      >
        &nbsp;
      </div>
    </div>
  );
}

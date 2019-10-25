import React from "react";

export default function HorizontalPercentageBar(props: {
  widthFraction: number;
  backgroundColor: string;
}) {
  return (
    <div className="col" style={{ padding: 0 }}>
      <div
        style={{
          backgroundColor: props.backgroundColor,
          width: props.widthFraction * 100 + "%"
        }}
      >
        &nbsp;
      </div>
    </div>
  );
}

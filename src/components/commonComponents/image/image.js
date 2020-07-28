import React from "react";
import "./image.css";

const Image = (props) => {
  let containerStyles = {
    borderRadius: props.borderRadius,
    minHeignt: props.minHeignt,
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
    height: props.height ? props.height : "",
    width: props.width ? props.width : "",
    border: props.border,
    overflow: "hidden",
  };
  return (
    <div className={props.containerClasses} style={containerStyles}>
      <img
        src={props.src}
        className={[props.classes, "img_component"].join(" ")}
        alt={props.alt}
      />
    </div>
  );
};

export default Image;

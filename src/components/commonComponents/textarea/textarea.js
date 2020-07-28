import React from "react";

import "./textarea.css";

const Textarea = (props) => {
  return (
    <div className="form-group">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <textarea
        className={[
          `${props.classes}`,
          `form-control`,
          props.valid ? "valid" : "invalid",
          props.touched ? "touched" : "untouched",
        ].join(" ")}
        onChange={props.onChange}
        onClick={props.onClick}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        value={props.value}
        rows={props.rows}
        name={props.name}
        id={props.id}
      ></textarea>
    </div>
  );
};

//   !(props.type === "select") ? (

//   ) :  : (<div>someting else</div>);

export default Textarea;

import React from "react";

import "./input.css";

const Input = (props) => {
  if (props.type === "select") {
    return (
      <div className="form-group">
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <select
          className={
            props.valid
              ? [`${props.classes}`, `form-control`].join(" ")
              : [`${props.classes}`, "form-control", "input-error"].join(" ")
          }
          onChange={props.onChange}
          name={props.name}
          id={props.id}
          onClick={props.onClick}
          onBlur={props.onBlur}
        >
          {props.options.map((genre) => (
            <option key={genre._id} id={props.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    return (
      <div className="form-group">
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <input
          type={props.type}
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
          name={props.name}
          minLength={props.min}
          maxLength={props.max}
          id={props.id}
        />
      </div>
    );
  }
};

//   !(props.type === "select") ? (

//   ) :  : (<div>someting else</div>);

export default Input;

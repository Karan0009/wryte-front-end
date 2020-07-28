import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const button = (props) =>
  !props.link ? (
    <button
      className={[
        `button--${props.design}`,
        `button--${props.mode}`,
        `${props.classes}`,
        props.loading ? "button_loading" : "",
      ].join(" ")}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      type={props.type}
    >
      {props.loading ? "Loading..." : props.children}
    </button>
  ) : (
    <Link className={props.classes} to={props.link}>
      {props.children}
    </Link>
  );

export default button;

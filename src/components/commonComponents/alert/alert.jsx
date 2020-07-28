import React, { Fragment } from "react";

const alert = (props) => {
  let classes = "alert alert-dismissible fade show alert-warning";
  if (props.error) classes = "alert alert-dismissible fade show alert-danger";
  return (
    <Fragment>
      <div
        className={classes}
        role="alert"
        style={{
          width: "50%",
          left: "25%",
          top: "20%",
          position: "absolute",
          zIndex: "999",
        }}
      >
        <strong>{props.alertMessage}</strong>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={props.alertMessageHandler}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </Fragment>
  );
};

export default alert;

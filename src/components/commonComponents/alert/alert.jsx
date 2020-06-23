import React, { Fragment, useEffect } from "react";

const alert = (props) => {
  return (
    <Fragment>
      <div
        className="alert alert-warning alert-dismissible fade show"
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

import React from "react";
import styles from "./index.module.scss";
import {Link} from "react-router-dom";

const Button = (props) => {
  let addStyle = [];

  let buttonStyles = [
    props.disabled && styles.disabled,
    styles.button,
    props.type === "primary"
      ? styles.primary
      : props.type === "secondary"
      ? styles.secondary
      : "",
  ].join(" ");

  if (props.onClick !== undefined) {
    return (
      <div className={styles.buttonWrapper}>
        <button
          type={props.formButton === true ? "submit" : "button"}
          onClick={props.onClick}
          className={buttonStyles}
          style={addStyle}
        >
          <p>{props.text}</p>
        </button>
      </div>
    );
  }

  if (props.destination !== undefined) {
    return (
      <div className={styles.buttonWrapper}>
        <Link
          type={props.formButton === true ? "submit" : "button"}
          to={props.destination}
          className={buttonStyles}
          style={addStyle}
        >
          <p>{props.text}</p>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.buttonWrapper}>
      <button className={buttonStyles} styles={addStyle}>
        <p>{props.text}</p>
      </button>
    </div>
  );
};

export default Button;
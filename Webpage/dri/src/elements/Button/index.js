import React from "react";
import * as styles from "./button.module.scss";

const Button = (props) => {
  let addStyle = [];

  let buttonStyles = [
    props.disabled && styles.disabled,
    styles.button,
    props.type === "primary"
      ? styles.primary
      : props.type === "secondary"
      ? styles.secondary
      : props.type === "tertiary"
      ? styles.tertiary
      : "",
      hasImage || styles.centered
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
          {hasImage && <img src={props.image} alt="" />}
          <p>{props.text}</p>
        </button>
      </div>
    );
  }

  if (props.destination !== undefined && props.destination.startsWith("/")) {
    return (
      <div className={styles.buttonWrapper}>
        <Link
          type={props.formButton === true ? "submit" : "button"}
          to={props.destination}
          className={buttonStyles}
          style={addStyle}
        >
          {hasImage && <img src={props.image} alt="" />}
          <p>{props.text}</p>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.buttonWrapper}>
      <button className={buttonStyles} styles={addStyle}>
        {hasImage && <img src={props.image} alt="" />}
        <p>{props.text}</p>
      </button>
    </div>
  );
};

export default Button;
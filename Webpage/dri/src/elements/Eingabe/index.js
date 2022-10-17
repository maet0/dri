import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";



const Eingabe = (props) => {

  // Wenn label Prop nicht mitgegeben wird, wird stattdessen Error Nachricht angezeigt
  let label = props.label || 'Label prop missing';

  // Label in Kleinbuchstaben für id (damit man Label und Input gruppieren kann)
  let label_id = label.toLowerCase();

  // State zum checken, ob Input fokussiert / ausgefüllt ist
  const [hideLabel, setHideLabel] = useState(false);

  // UseState vom Parent Element soll als value und onChange mitgegeben werden
  let valueState = props.value;
  let valueChange = props.onChange;

  const handleFocus = () => {
    setHideLabel(true)
    props.onFocus()
  }

  const handleBlur = () => {
    setHideLabel(valueState.length > 0)
  }

  useEffect(() => {
    setHideLabel(valueState.length > 0)
  }, [])

  return (
    <div style={props.style} className={`${styles.wrapper} ${hideLabel ? styles.focus : undefined} ${props.inline ? styles.inline : undefined}`} onFocus={() => handleFocus()} onBlur={() => handleBlur()}>
      <label htmlFor={label_id}>
        {label}
      </label>
      <input key="password" type='text' id={label_id} value={valueState} onChange={e => valueChange(e.target.value)} />
    </div>
  );
};

export default Eingabe;
import React, { useState } from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import Button from "../Button";
import Eingabe from "../Eingabe";



const DRI = (props) => {

  const [enteredName, setEnteredName] = useState("");
  const [screen, setScreen] = useState(1);

  return (
    <div className={styles.wrapper}>
      {screen === 1 ?
        <div>
          {Eingabe({ label: 'Firmenname', value: enteredName, onChange: setEnteredName })}
          <div style={{ marginTop: 60, marginBottom: 40 }}>
            <Button onClick={() => setScreen(2)} text="Weiter" type="primary" />
          </div>
          <p style={{ color: 'grey' }}>Wenn sie auf <span style={{ color: '#444444' }}>WEITER</span> klicken, akzeptieren sie die <a href="/agb" style={{ color: '#2BAFE5' }}>AGB</a></p>
        </div>
        :
        screen === 2 ?
          <div>
            <p>Screen Two</p>
          </div>
          : ''}
    </div>
  );
};

export default DRI;
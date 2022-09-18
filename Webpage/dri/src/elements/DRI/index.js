import React, { useState } from "react";
import styles from "./index.module.scss";
import {Link} from "react-router-dom";
import Button from "../Button";



const DRI = (props) => {


  const [screen, setScreen] = useState(1);

  const ScreenOne = () => {
    return <div>
      <p>Screen One</p>
      <Button onClick={() => setScreen(2)} text="Weiter" type="primary" />
    </div>
  }

  const ScreenTwo = () => {
    return <div>
      <p>Screen Two</p>
    </div>
  }

  return (
    <div className={styles.wrapper}>
      {screen === 1 ? <ScreenOne /> : screen === 2 ? <ScreenTwo /> : ''}
    </div>
  );
};

export default DRI;
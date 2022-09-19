import React, { useState } from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import Button from "../Button";
import Eingabe from "../Eingabe";
import Logo from '../../assets/images/placeholder.png'
import { Puff } from 'react-loader-spinner'
import ReactSpeedometer, { CustomSegmentLabelPosition } from "react-d3-speedometer"




const DRI = (props) => {

  // Values for the speedometer
  const outcomes = [
    {
      'text': 'Nicht gut',
      'fontSize': 16,
      'color': '#1c1c1c',
      'position': CustomSegmentLabelPosition.Outside
    },
    {
      'text': 'Durchschnittlich',
      'fontSize': 16,
      'color': '#1c1c1c',
      'position': CustomSegmentLabelPosition.Outside
    },
    {
      'text': 'Gut',
      'fontSize': 16,
      'color': '#1c1c1c',
      'position': CustomSegmentLabelPosition.Outside
    }
  ];

  const [enteredName, setEnteredName] = useState("");
  const [screen, setScreen] = useState(1);
  const [remainingSuggestions, setRemainingSuggestions] = useState(0);
  const [previousSuggestions, setPreviousSuggestions] = useState(0);
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [score, setScore] = useState(0);


  const prepareSecondScreen = () => {
    setScreen(2);
    setRemainingSuggestions(9);
  }

  const loadMore = () => {
    setRemainingSuggestions(old => old - 3);
    setPreviousSuggestions(old => old + 3);
  }

  const loadPrevious = () => {
    setRemainingSuggestions(old => old + 3);
    setPreviousSuggestions(old => old - 3);
  }

  const setSelection = (index) => {
    setScreen(3);
  }

  const sendData = () => {
    // Send data to server
    getResults()
  }

  const getResults = () => {
    setScreen(5);
    setScore(50);
  }

  return (
    <div className={styles.wrapper}>
      {screen === 1 ?
        <div>
          <Eingabe label="Firmenname" value={enteredName} onChange={setEnteredName} />
          <div style={{ marginTop: 60, marginBottom: 40 }}>
            <Button onClick={prepareSecondScreen} text="Weiter" type="primary" />
          </div>
          <p style={{ color: 'grey' }}>Wenn sie auf <span style={{ color: '#444444' }}>WEITER</span> klicken, akzeptieren sie die <a href="/agb" style={{ color: '#2BAFE5' }}>AGB</a></p>
        </div>
        :
        screen === 2 ?
          <div>
            <Eingabe label="Firmenname" onFocus={() => setScreen(1)} value={enteredName} onChange={setEnteredName} />
            <div className={styles.suggestion} style={{ marginTop: 60 }} onClick={() => setSelection(1)}>
              <img src={Logo} alt="Logo _____" />
              <p>spectory OG<br />4020 Linz, AT</p>
            </div>
            <div className={styles.suggestion} onClick={() => setSelection(2)}>
              <img src={Logo} alt="Logo _____" />
              <p>Spectory<br />4250407 Netanya, ISR</p>
            </div>
            <div className={styles.suggestion} onClick={() => setSelection(3)}>
              <img src={Logo} alt="Logo _____" />
              <p>Specter Labs OÜ<br />5028 London, GB</p>
            </div>
            <div className={styles.buttonbar}>
              {previousSuggestions > 0 && <Button text='Vorherige laden' onClick={loadPrevious} type="tertiary" />}
              {remainingSuggestions > 0 && <Button text={`Mehr laden (${remainingSuggestions})`} onClick={loadMore} type="tertiary" />}
            </div>
          </div>
          : screen === 3 ?
            <div>
              <div className={styles.topbar}>
                <h1>Fast fertig!</h1>
                <div className={styles.selectionDisplay}>
                  <img src={Logo} alt="Logo _____" />
                  <p>spectory OG</p>
                </div>
              </div>
              <p>Wir würden uns freuen, wenn Sie uns Ihre Kontaktdaten hinterlassen.
                Falls Sie nicht wünschen, im Rahmen eines möglichen Beratungsgespräches kontaktiert zu werden, drücken Sie auf <span style={{ fontFamily: 'Avenir Black' }}>Überspringen</span>.</p>
              <div style={{ width: '80%', marginRight: 'auto', marginTop: '50px' }}>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                  <Eingabe inline label="Vorname" value={surname} onChange={setSurname} />
                  <Eingabe inline label="Nachname" value={name} onChange={setName} />
                </div>
                <Eingabe label="E-Mail" value={email} onChange={setEmail} />
                <Eingabe label="Telefonnummer" value={phone} onChange={setPhone} />
              </div>
              <div className={styles.buttonbar}>
                <Button onClick={sendData} text="Kontaktdaten senden und DRI berechnen" type="primary" />
                <Button onClick={getResults} text="Überspringen" type="secondary" />
              </div>
            </div>
            : screen === 4 ?
              <div>
                <h1 style={{ marginBottom: 10 }}>Ihr DRI wird gerade berechnet!</h1>
                <p style={{ marginBottom: 30 }}>Dieser Vorgang kann ein paar Minuten dauern.</p>
                <Puff
                  height="80"
                  width="80"
                  radisu={1}
                  color="#2bafe5"
                  ariaLabel="puff-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
              : screen === 5 ?
                <div>
                  <ReactSpeedometer
                    maxValue={100}
                    customSegmentLabels={outcomes}
                    customSegmentStops={[0, 33, 66, 100]}
                    segmentColors={['#dfe8ec', '#8cc3d9', '#2bafe5']}
                    valueTextFontSize={32}
                    value={score}
                    height={230}
                  />
                  <h2 style={{ marginRight: 'auto' }}>Ihr Ergebnis:</h2>
                  <p><b>{score} %</b><br />Sie wissen, wie Digital Recruiting geht, manche Aspekte sind allerdings noch ausbaufähig!
                    Wenn Sie Interesse am Ausbau dieser Bereiche haben, laden wir Sie gerne auf ein Beratungsgespräch ein.<br /><br />
                    Wir haben eine PDF mit genaueren Ergebnissen für Sie erstellt. Wenn Sie diese sehen möchten, drücken Sie auf den untenstehenden Button.</p>
                  <div className={styles.buttonbar}>
                    <Button text="Ergebnis PDF herunterladen" type="primary" onClick={() => alert('code download here')} />
                    <Button text="Gespräch vereinbaren" type="secondary" destination="#calendly"/>
                    <Button text="spectory Homepage" type="secondary" destination="https://www.spectory.at" />
                  </div>
                </div>
                : ""
      }
    </div>
  );
};

export default DRI;
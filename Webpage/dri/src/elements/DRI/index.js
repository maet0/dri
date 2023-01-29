import React, { useState } from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import Button from "../Button";
import Eingabe from "../Eingabe";
import Logo from '../../assets/images/placeholder.png'
import { Puff } from 'react-loader-spinner'
import ReactSpeedometer, { CustomSegmentLabelPosition } from "react-d3-speedometer"
import useWindowDimensions, { mobile_breakpoint } from "../../helpers/WindowService"
import axios from "axios"

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

  const getCompanies = () => {
    axios.get(`http://localhost:8000/results?text=${enteredName}`)
      .then(response => {
        setCompanies(response.data);
        setRemainingSuggestions(response.data.length - 3);
      }).finally(() => {
        setLoading(false)
        setScreen(2);

      });
  }

  const [enteredName, setEnteredName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [screen, setScreen] = useState(1);
  const [remainingSuggestions, setRemainingSuggestions] = useState(0);
  const [previousSuggestions, setPreviousSuggestions] = useState(0);
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [score, setScore] = useState(0);
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [companiesIndex, setCompaniesIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [validNameInput, setValidNameInput] = useState(true);



  const prepareSecondScreen = () => {
    if (enteredName.length < 3) {
      setValidNameInput(false);
    } else {
      setValidNameInput(true);
      setLoading(true);
      getCompanies()
      setRemainingSuggestions(9);

    }
  }

  const loadMore = () => {
    setCompaniesIndex(old => old + 3);
    setRemainingSuggestions(old => remainingSuggestions < 3 ? 0 : old - 3);
    setPreviousSuggestions(old => old + 3);
  }

  const loadPrevious = () => {
    if (previousSuggestions === companies.length - 1 && companies.length % 3 !== 0) {
      setRemainingSuggestions(old => old + companies.length % 3);
    } else {
      setRemainingSuggestions(old => old + 3);
    }
    setPreviousSuggestions(old => old - 3);
    setCompaniesIndex(old => old - 3);


  }

  const setSelection = (index) => {

    setScreen(3);
    setSelectedIndex(index);
  }

  const sendData = () => {
    let user = JSON.stringify({
      surname: surname,
      last_name: name,
      email: email,
      phone: phone
    });

    setScreen(4);
    axios.get(`http://localhost:8000/getDRI?user=${user}&company=${JSON.stringify(companies[selectedIndex])}`)
      .then(response => {
        getResults(response)
      }).finally(() => {
        console.log('furz1')

      });
  }

  const sendDataWithoutUser = () =>  {
    setScreen(4);
    axios.get(`http://localhost:8000/getDRI?&company=${JSON.stringify(companies[selectedIndex])}`)
      .then(response => {
        getResults(response)
            }).finally(() => {
              console.log('furz2')
      });
  }

  const getResults = (res) => {
    setScreen(5);
    console.log(res);
    setScore(Math.round(res.data.score));
    console.log(res.data.file);
  }

  const backToFirstScreen = () => {
    setScreen(1)
    setPreviousSuggestions(0);
    setRemainingSuggestions(0);
    setCompanies([]);
  }

  return (
    <div className={styles.wrapper} id="anwendung">
      {loading ?
        <div>
          <h2 style={{ marginBottom: 20 }}>Einen kurzen Moment bitte...</h2>
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
        </div> :
        screen === 1 ?
          <div className={validNameInput ? undefined : styles.invalid}>
            {validNameInput ? undefined : <p style={{ color: 'red' }}>Bitte geben Sie 3 oder mehr Zeichen ein.</p>}
            <Eingabe label="Firmenname" value={enteredName} onFocus={() => setValidNameInput(true)} onChange={setEnteredName} />
            <div style={{ marginTop: 60, marginBottom: 40 }}>
              <Button onClick={prepareSecondScreen} text="Weiter" type="primary" />
            </div>
            <p style={{ color: 'grey' }}>Wenn sie auf <span style={{ color: '#444444' }}>WEITER</span> klicken, akzeptieren sie die <a href="/agb" style={{ color: '#2BAFE5' }}>AGB</a></p>
          </div>
          :
          screen === 2 ?
            <div>
              <Eingabe label="Firmenname" style={{ marginBottom: 60 }} onFocus={() => backToFirstScreen()} value={enteredName} onChange={setEnteredName} />
              {companies[companiesIndex] ? <div className={styles.suggestion} onClick={() => setSelection(companiesIndex)}>
                <img src={Logo} alt={`Logo ${companies[companiesIndex].title}`} />
                <p>{companies[companiesIndex].title}<br />{`${companies[companiesIndex].zip} ${companies[companiesIndex].city}`}</p>
              </div>
              : <p><b>Leider konnten wir keine Firma mit dem gesuchten Namen finden.</b><br/>Versuchen Sie den vollen Namen Ihres Unternehmens einzugeben.<br />Bitte beachten Sie, dass die Anwendung nur Unternehmen mit Sitz in Österreich anzeigen kann.</p>}
              {companies[companiesIndex + 1] ?
                <div className={styles.suggestion} onClick={() => setSelection(companiesIndex + 1)}>
                  <img src={Logo} alt={`Logo ${companies[companiesIndex + 1].title}`} />
                  <p>{companies[companiesIndex + 1].title}<br />{`${companies[companiesIndex + 1].zip} ${companies[companiesIndex + 1].city}`}</p>
                </div>
                :
                <div className={styles.suggestionspace}></div>
              }
              {companies[companiesIndex + 2] ?
                <div className={styles.suggestion} onClick={() => setSelection(companiesIndex + 2)}>
                  <img src={Logo} alt={`Logo ${companies[companiesIndex + 2].title}`} />
                  <p>{companies[companiesIndex + 2].title}<br />{`${companies[companiesIndex + 2].zip} ${companies[companiesIndex + 2].city}`}</p>
                </div>
                :
                <div className={styles.suggestionspace}></div>
              }
              {remainingSuggestions <= 0 && companies[companiesIndex] ? <p><b>Ist Ihr Unternehmen nicht dabei?</b><br />Versuchen Sie den vollen Namen Ihres Unternehmens einzugeben.<br />Bitte beachten Sie, dass die Anwendung nur Unternehmen mit Sitz in Österreich anzeigen kann.</p> : undefined}
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
                    <p>{companies[selectedIndex].title}</p>
                  </div>
                </div>
                <p>Wir würden uns freuen, wenn Sie uns Ihre Kontaktdaten hinterlassen.
                  Falls Sie nicht wünschen, im Rahmen eines möglichen Beratungsgespräches kontaktiert zu werden, drücken Sie auf <span style={{ fontFamily: 'Avenir Black' }}>Überspringen</span>.</p>
                <div style={{ width: '80%', marginRight: 'auto', marginTop: width > mobile_breakpoint ? 50 : 10 }}>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <Eingabe inline label="Vorname" value={surname} onChange={setSurname} />
                    <Eingabe inline label="Nachname" value={name} onChange={setName} />
                  </div>
                  <Eingabe label="E-Mail" value={email} onChange={setEmail} />
                  <Eingabe label="Telefonnummer" value={phone} onChange={setPhone} />
                </div>
                <div className={styles.buttonbar}>
                  <Button style={{ marginBottom: width < mobile_breakpoint ? 15 : 0 }} onClick={sendData} text="Kontaktdaten senden" type="primary" />
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
                  <div style={{ paddingTop: width < mobile_breakpoint ? 30 : 0 }}>
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
                      <Button style={{ marginBottom: width < mobile_breakpoint ? 15 : 0 }} text="Ergebnis PDF herunterladen" type="primary" destinationabs="C:\Users\hymer\OneDrive\Desktop\DRI\dri\Webscraper\pdfgenerator\pdf_archive\spectory-og-spectory.pdf" />
                      <Button style={{ marginBottom: width < mobile_breakpoint ? 15 : 0 }} text="Gespräch vereinbaren" type="secondary" destination="#calendly" />
                      <Button style={{ marginBottom: width < mobile_breakpoint ? 25 : 0 }} text="spectory Homepage" type="secondary" destination="https://www.spectory.at" />
                    </div>
                  </div>
                  : ""
      }
    </div>
  );
};

export default DRI;
import React from 'react';
import Button from '../elements/Button';
import Layout from './layout';
import FirstImage from '../assets/images/Laptop.png'
import DRI from '../elements/DRI';
import IconList from '../elements/IconList';
import Calendly from '../elements/Calendly';
import useWindowDimensions, { mobile_breakpoint } from "../helpers/WindowService"


const Home = () => {
  const { width } = useWindowDimensions()

  return (
    <Layout path="/">
      <div className='container' style={{ marginBottom: 100 }}>
        <div className='col2'></div>
        <div className='col8' style={{ textAlign: 'center' }}>
          <h1 className='black' style={{ marginBottom: 10 }}>Das Verhalten der Menschen hat sich verändert.<br />Alles was wir tun müssen, ist, richtig darauf zu reagieren.</h1>

          <p>Die Zeiten haben sich geändert. Potenzielle Bewerber:innen kommen immer seltener auf Unternehmen zu - heute gilt es, als Arbeitgeber:in selbst aktiv auf die Zielgruppe zuzugehen und ihre Aufmerksamkeit im digitalen Umfeld zu erlangen.</p>

        </div>
        <div className='col2'></div>
      </div>

      <div className='container' style={{ marginBottom: 50 }}>
        <div className='col12' style={{ textAlign: 'center' }}>
          <h1>Jetzt einfach und kostenlos Ihren DRI berechnen!</h1>
        </div>
      </div>

      <div className='container' style={{ marginBottom: 150 }}>
        <div className='col2'></div>
        <div className='col8' id='anwendung'>
          <DRI />
        </div>
        <div className='col2'></div>
      </div>

      <div className='container reverse-mobile' style={{ marginBottom: width  < mobile_breakpoint ? 90 : 180 }}>
        <div className='col5' style={{ marginTop: width  < mobile_breakpoint ? 30 : 0 }}>
          <h2 style={{ marginBottom: 30 }}>Was ist der Digital Recruiting Index?</h2>
          <p style={{ marginBottom: 35 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate massa vitae tortor ullamcorper, at porttitor arcu pellentesque. Nulla sit amet enim tellus. Suspendisse commodo ultrices nulla, vel luctus libero gravida non. Vivamus vulputate enim et neque consequat, sed malesuada tortor ullamcorper. Proin dapibus odio sed lacinia ornare. Vestibulum non consequat purus. Integer consequat hendrerit pulvinar. Ut efficitur quis sem vel tincidunt.<br /><br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate massa vitae tortor ullamcorper, at porttitor arcu pellentesque. Nulla sit amet enim tellus. Suspendisse commodo ultrices nulla, vel luctus libero gravida non.</p>
          <h2 style={{ marginBottom: 30 }}>Wie der DRI Ihr Unternehmen bereichert:</h2>
          <p style={{ marginBottom: 30 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate massa vitae tortor ullamcorper, at porttitor arcu pellentesque. Nulla sit amet enim tellus. Suspendisse commodo ultrices nulla, vel luctus libero gravida non. Vivamus vulputate enim et neque consequat, sed malesuada tortor ullamcorper. Proin dapibus odio sed lacinia ornare. Vestibulum non consequat purus. Integer consequat hendrerit pulvinar. Ut efficitur quis sem vel tincidunt.</p>
          <Button destination='#anwendung' text="Jetzt messen" type="primary" />
        </div>

        <div className='col1'></div>
        <div className="col6">
          <img src={FirstImage} alt="Laptop, der Statistiken anzeigt" />
        </div>
      </div>

      <div className='container' style={{ marginBottom: 90 }}>
        <div className='col12' style={{ textAlign: 'center' }}>
          <h1>Das macht ein Unternehmen mit einem guten Digital Recruiting aus:</h1>
        </div>
      </div>
      <div className='container'>
        <div className='col10' style={{ margin: '0 auto' }}>
          <IconList />
        </div>
      </div>

      <div className='container' id='calendly'>
        <div className='col12'>
          <Calendly />
        </div>
      </div>
    </Layout>);
}

export default Home;

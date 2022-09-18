import React from 'react';
import Layout from './layout';

const Home = () => (
  <Layout path="/">
    <div className='container' style={{marginBottom:100}}>
      <div className='col2'></div>
      <div className='col8' style={{ textAlign: 'center' }}>  
        <h1 className='black' style={{ marginBottom:10}}>Das Verhalten der Menschen hat sich verändert.<br />Alles was wir tun müssen, ist, richtig darauf zu reagieren.</h1>

        <p>Die Zeiten haben sich geändert. Potenzielle Bewerber:innen kommen immer seltener auf Unternehmen zu - heute gilt es, als Arbeitgeber:in selbst aktiv auf die Zielgruppe zuzugehen und ihre Aufmerksamkeit im digitalen Umfeld zu erlangen.</p>

      </div>
      <div className='col2'></div>
    </div>
    <div className='container'>
    <div className='col5'>
      <h2 style={{marginBottom: 30}}>Was ist der Digital Recruiting Index?</h2>
      <p style={{marginBottom: 35}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate massa vitae tortor ullamcorper, at porttitor arcu pellentesque. Nulla sit amet enim tellus. Suspendisse commodo ultrices nulla, vel luctus libero gravida non. Vivamus vulputate enim et neque consequat, sed malesuada tortor ullamcorper. Proin dapibus odio sed lacinia ornare. Vestibulum non consequat purus. Integer consequat hendrerit pulvinar. Ut efficitur quis sem vel tincidunt.<br/><br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate massa vitae tortor ullamcorper, at porttitor arcu pellentesque. Nulla sit amet enim tellus. Suspendisse commodo ultrices nulla, vel luctus libero gravida non.</p>
      <h2 style={{marginBottom: 30}}>Wie der DRI Ihr Unternehmen bereichert:</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate massa vitae tortor ullamcorper, at porttitor arcu pellentesque. Nulla sit amet enim tellus. Suspendisse commodo ultrices nulla, vel luctus libero gravida non. Vivamus vulputate enim et neque consequat, sed malesuada tortor ullamcorper. Proin dapibus odio sed lacinia ornare. Vestibulum non consequat purus. Integer consequat hendrerit pulvinar. Ut efficitur quis sem vel tincidunt.</p>
    </div>

    <div className='col1'></div>
    <div className="col6"></div>
    </div>

  </Layout>
)

export default Home;

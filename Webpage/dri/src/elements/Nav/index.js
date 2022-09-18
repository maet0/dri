import React from "react";
import styles from './index.module.scss'
import SpectoryLogoAnimated from '../SpectoryLogoAnimated';

const Nav = (props) => {

    return (
        <div className={styles.wrapper}>
            	<h1 className='white'>DIGITAL RECRUITING INDEX</h1>
                <SpectoryLogoAnimated />
        </div>
    );

}

export default Nav

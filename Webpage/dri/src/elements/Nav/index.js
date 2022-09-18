import React from "react";
import { Link } from "react-router-dom";
import styles from './index.module.scss'
import SpectoryLogoAnimated from '../SpectoryLogoAnimated';

const Nav = (props) => {

    let path = props.path;

    return (
        <div className={styles.wrapper}>
            	<h1 className='white'>DIGITAL RECRUITING INDEX</h1>
                <SpectoryLogoAnimated />
        </div>
    );

}

export default Nav

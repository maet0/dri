import React from "react";
import styles from './index.module.scss'
import SpectoryLogoAnimated from '../SpectoryLogoAnimated';
import { Link } from "react-router-dom";

const Nav = (props) => {

    return (
        <div className={styles.wrapper}>
            <Link className={`${props.path === "/" ? styles.active : undefined} ${styles.onlyDesktop}`} to="/"><h1 className='white'>DIGITAL RECRUITING INDEX</h1></Link>
            <Link className={`${props.path === "/" ? styles.active : undefined} ${styles.onlyMobile}`} to="/"><h1 className='white'>DRI</h1></Link>

            <SpectoryLogoAnimated />
        </div>
    );

}

export default Nav

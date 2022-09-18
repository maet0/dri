import React, { useState } from "react"
import styles from './styles.module.scss';

const SpectoryLogoAnimated = props => {

    const [hovered, setHovered] = useState(false);

    const newHovered = () => {
        if (!hovered) {
            setHovered(true);
        }
    }

    return (
        <a lassName={styles.wrapper}onMouseEnter={newHovered} target="_blank" rel="noreferrer" href="https://www.spectory.at">
            <div className={`${styles.logo} ${hovered && styles.activated}`}></div>
        </a>
    )


}


export default SpectoryLogoAnimated;

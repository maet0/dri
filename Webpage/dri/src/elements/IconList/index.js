import React from "react";
import styles from "./index.module.scss";
import Icon1 from '../../assets/images/Icon1.png'
import Icon2 from '../../assets/images/Icon2.png'
import Icon3 from '../../assets/images/Icon3.png'
import Icon4 from '../../assets/images/Icon4.png'


const IconList = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={[styles.item, styles.left].join(' ')}>
                <img alt="" src={Icon1} />
                <div>
                    <h2>Platzhalter Überschrift</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate massa vitae tortor ullamcorper, at porttitor arcu pellentesque.</p>
                </div>
            </div>
            <div className={[styles.item, styles.right].join(' ')}>
                <img alt="" src={Icon2} />
                <div>
                    <h2>Platzhalter Überschrift</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate massa vitae tortor ullamcorper, at porttitor arcu pellentesque.</p>
                </div>
            </div>
            <div className={[styles.item, styles.left].join(' ')}>
                <img alt="" src={Icon3} />
                <div>
                    <h2>Platzhalter Überschrift</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate massa vitae tortor ullamcorper, at porttitor arcu pellentesque.</p>
                </div>
            </div>
            <div className={[styles.item, styles.right].join(' ')}>
                <img alt="" src={Icon4} />
                <div>
                    <h2>Platzhalter Überschrift</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate massa vitae tortor ullamcorper, at porttitor arcu pellentesque.</p>
                </div>
            </div>
        </div>
    );
};

export default IconList;
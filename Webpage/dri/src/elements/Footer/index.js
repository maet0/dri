import React from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <div className={styles.footer}>
      <p className={styles.onlyDesktop}>© 2022 spectory. All Rights Reserved.</p>
      <p className={styles.onlyDesktop}><Link className={props.path === '/datenschutz' ? styles.bold : undefined} to="/datenschutz">Datenschutz</Link>—<Link className={props.path === '/agb' ? styles.bold : undefined} to="/agb">AGB</Link>—<Link className={props.path === '/impressum' ? styles.bold : undefined} to="/impressum">Impressum</Link></p>
      <p className={styles.onlyMobile}><Link className={props.path === '/datenschutz' ? styles.bold : undefined} to="/datenschutz">Datenschutz</Link><br/><Link className={props.path === '/agb' ? styles.bold : undefined} to="/impressum">Impressum</Link><br/><Link className={props.path === '/impressum' ? styles.bold : undefined} to="/agb">AGB</Link></p>
      <p style={{fontSize: 10, marginTop: 20}} className={styles.onlyMobile}>© 2022 spectory. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
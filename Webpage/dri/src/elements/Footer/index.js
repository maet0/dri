import React from "react";
import styles from "./index.module.scss";
import {Link} from "react-router-dom";

const Footer = (props) => {
  return (
    <div className={styles.footer}>
      <p>© 2022 spectory. All Rights Reserved.</p>
      <p><Link className={props.path === '/datenschutz' ? styles.bold : undefined} to="/datenschutz">Datenschutz</Link>—<Link className={props.path === '/agb' ? styles.bold : undefined} to="/agb">AGB</Link>—<Link className={props.path === '/impressum' ? styles.bold : undefined} to="/impressum">Impressum</Link></p>
    </div>
  );
};

export default Footer;
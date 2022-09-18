import React from "react";
import styles from "./index.module.scss";
import {Link} from "react-router-dom";

const Footer = (props) => {
  return (
    <div className={styles.footer}>
      <p>© 2022 spectory. All Rights Reserved.</p>
      <p><Link to="/datenschutz">Datenschutz</Link>—<Link to="/agb">AGB</Link>—<Link to="/impressum">Impressum</Link></p>
    </div>
  );
};

export default Footer;
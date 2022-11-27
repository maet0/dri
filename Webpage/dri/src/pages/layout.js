import React from "react";
import Nav from "../elements/Nav";
import Footer from "../elements/Footer"
import '../style/main.scss';
import { Helmet } from 'react-helmet'

const Layout = (props) => {

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{props.title}</title>
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#28b4e4" />
                <meta name="msapplication-TileColor" content="#28b4e4" />
                <meta name="theme-color" content="#ffffff" />
            </Helmet>
            <Nav path={props.path} />
            <div className="content">
                {props.children}
            </div>
            <Footer path={props.path} />
        </>
    )

}

export default Layout   
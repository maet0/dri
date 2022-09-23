import React from "react";
import Nav from "../elements/Nav";
import Footer from "../elements/Footer"
import '../style/main.scss';

const Layout = (props) => {

    return (
        <>
            <Nav path={props.path} />
            <div className="content">
                {props.children}
            </div>
            <Footer path={props.path} />
        </>
    )

}

export default Layout   
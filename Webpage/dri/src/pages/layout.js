import React from "react";
import Nav from "../elements/Nav";
import '../style/main.scss';

const Layout = (props) => {

    return (
        <>
            <Nav path={props.path} />
            <div className="content">
                {props.children}
            </div>
        </>
    )

}

export default Layout   
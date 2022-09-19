import React from 'react'
import { InlineWidget } from "react-calendly";



export default class Calendly extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isMobile: false
        }

    }

    componentDidMount() {
        window.addEventListener("resize", this.listenerResizeEvent);
        this.listenerResizeEvent();
    }

    listenerResizeEvent = () => {
        this.setState({
            isMobile: document.documentElement.clientWidth <= 992
        })
    }

    get_id = () => {
        return 'calendly'
    }

    render() {

        return <InlineWidget
            styles={{
                height: this.state.isMobile ? 1100 : 650,
                minWidth: 320
            }}
            url="https://calendly.com/spectory/kickoff?hide_gdpr_banner=1&primary_color=2dade4"
        />

    }

}

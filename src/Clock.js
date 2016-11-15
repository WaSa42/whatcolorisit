import React, { Component } from 'react';
import moment from 'moment';
import { pad } from 'underscore.string';
import './Clock.css';

class Clock extends Component {
    constructor() {
        super();
        moment.locale( window.navigator.userLanguage || window.navigator.language);
        this.state = Clock.getData();
    }
    componentDidMount() {
        const intervalId = setInterval(this.update.bind(this), 1000);
        this.setState({intervalId: intervalId});
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
    static getData() {
        return {
            date: moment().format('LL'),
            time: moment().format('LTS'),
            hexCode: '#' + pad(moment().hours(), 2, '0') + pad(moment().minutes(), 2, '0') + pad(moment().seconds(), 2, '0')
        };
    }
    update() {
        const data = Clock.getData();
        this.setState(data);
        document.querySelector('title').text = `${data.time} - Color clock`
    }
    render() {
        return (
            <div className="clock" style={{'backgroundColor': this.state.hexCode}}>
                <p className="time">{this.state.time}</p>
                <p className="date">{this.state.date}</p>
                <p className="hex-code">{this.state.hexCode}</p>
            </div>
        );
    }
}

export default Clock;

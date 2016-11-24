import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import moment from 'moment';
import { pad } from 'underscore.string';

import './Clock.css';

// Helpers
const getData = () => {
    return {
        date: moment().format('LL'),
        time: moment().format('LTS'),
        hexCode: '#' + pad(moment().hours(), 2, '0') + pad(moment().minutes(), 2, '0') + pad(moment().seconds(), 2, '0')
    };
};

// Actions
const updateClock = () => {
    const data = getData();
    return dispatch => {
        document.querySelector('title').text = `${data.time} - Color clock`;

        dispatch ({
            type: 'UPDATE_CLOCK',
            data: data
        })
    };
};
const startClock = () => {
    return dispatch => {
        const interval = setInterval(() => {
            dispatch(updateClock());
        }, 1000);

        dispatch({
            type: 'START_CLOCK',
            interval
        });
    }
};
const stopClock = (interval) => {
    return {
        type: 'STOP_CLOCK',
        interval: clearInterval(interval)
    }
};

// Reducer
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'START_CLOCK':
            return {
                ...state,
                isOn: true,
                interval: action.interval
            };
        case 'STOP_CLOCK':
            return {
                ...state,
                isOn: false,
                interval: null
            };
        case 'UPDATE_CLOCK':
            return {
                ...state,
                hexCode: action.data.hexCode,
                time: action.data.time,
                date: action.data.date
            };
        default:
            return state
    }
};

// Component
class Clock extends Component {
    componentDidMount() {
        this.props.startClock();
    }
    componentWillUnmount() {
        this.props.stopClock(this.props.interval);
    }
    render() {
        return (
            <div className="clock" style={{'backgroundColor': this.props.hexCode}}>
                <time className="time">{this.props.time}</time>
                <p className="date">{this.props.date}</p>
                <p className="hex-code">{this.props.hexCode}</p>
            </div>
        );
    }
}

function mapStateToProps() {
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    const data = getData();
    return {
        hexCode: data.hexCode,
        time: data.time,
        date: data.date
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startClock: () => {
            dispatch(startClock())
        },
        stopClock: () => {
            dispatch(stopClock())
        }
    }
};

Clock = connect(mapStateToProps, mapDispatchToProps)(Clock);

Clock.propTypes = {
    hexCode: PropTypes.string,
    time: PropTypes.string,
    date: PropTypes.string,
};

export default Clock;

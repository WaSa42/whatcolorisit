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
    return {
        type: 'UPDATE_CLOCK',
        data: getData()
    }
};

// Reducer
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_CLOCK':
            return {
                ...state,
                hexCode: action.data.hexCode,
                time: action.data.time,
                date: action.data.date
            }
        default:
            return state
    }
};

// Component
class Clock extends Component {
    componentDidMount() {
        this.interval = setInterval(this.props.update.bind(this), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    componentDidUpdate() {
        document.querySelector('title').text = `${this.props.time} - Color clock`;
    }
    render() {
        return (
            <div className="clock" style={{'backgroundColor': this.props.hexCode}}>
                <p className="time">{this.props.time}</p>
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
        update: () => {
            dispatch(updateClock())
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

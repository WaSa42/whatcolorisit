import React, { Component } from 'react';

import Clock from './Clock';
import Footer from './Footer';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Clock />
                <Footer />
            </div>
        );
    }
}

export default App;

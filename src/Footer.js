import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer>
                Whatcolorisit? By <a href="http://nrouviere.fr" target="_blank">Nicolas Rouvière</a> with
                <a href="https://facebook.github.io/react/" target="_blank"> React</a>.
                See sources on <a href="https://github.com/WaSa42/whatcolorisit" target="_blank">GitHub</a>.
            </footer>
        );
    }
}

export default Footer;

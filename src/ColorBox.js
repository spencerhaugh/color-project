import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from 'chroma-js';
import './ColorBox.css'

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
        this.changeCopyState = this.changeCopyState.bind(this);
    };
    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500)
        })
    };
    render() {
        const { name, background, moreUrl, showLink, classes } = this.props;
        const { copied } = this.state;
        // Determine the color luminance to apply styles light/dark against 
        const isDarkColor = chroma(background).luminance() <= .2; // chroma math to determine a Dark Color
        const isLightColor = chroma(background).luminance() >= .44; // chroma math to determine a Light color

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className='ColorBox' style={{ background }}>
                    <div className={`copy-overlay ${copied && "show"}`} style={{ background }} />
                    <div className={`copy-msg ${copied && "show"} ${isLightColor && "dark-text"}`}>
                        <h1>Copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span className={`${isDarkColor && "light-text"}`}>{name}</span>
                        </div>
                        <button className={`copy-button ${isLightColor && "dark-text"}`}>Copy</button>
                    </div>
                    {showLink && (<Link to={moreUrl} onClick={e => e.stopPropagation()}>
                        <span className={`shades ${isLightColor && "dark-text"}`}>Shades</span>
                    </Link>)}

                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;

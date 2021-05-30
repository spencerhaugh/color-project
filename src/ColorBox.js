import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from '@material-ui/styles';
import chroma from 'chroma-js';
import './ColorBox.css'

const styles = {
    colorBox: {
        width: '20%',
        height: props => props.showFullPalette ? '25%' : '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.5px',
        "&:hover button": {
            opacity: '1'
        },
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= .44 ? "#333" : "#fff"
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= .2 ? "#fff" : "#333"
    },
    shades: {
        color: props => chroma(props.background).luminance() >= .44 ? "#333" : "#fff",
        background: 'rgba(255, 255, 255, 0.3)',
        position: 'absolute',
        border: 'none',
        right: "0",
        bottom: "0",
        width: "60px",
        height: "30px",
        textAlign: 'center',
        lineHeight: "30px",
        textTransform: 'uppercase',
        fontSize: '0.8rem',
    },
    copyButton: {
        color: props => chroma(props.background).luminance() >= .44 ? "#333" : "#fff",
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginTop: '-15px',
        marginLeft: '-50px',
        textAlign: 'center',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        textTransform: 'uppercase',
        textDecoration: 'none',
        border: 'none',
        transition: '0.5s',
        zIndex: '1',
        opacity: "0"
    }
}

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
        const { name, background, moreUrl, showFullPalette, classes } = this.props;
        const { copied } = this.state;
        // Determine the color luminance to apply styles light/dark against 
        // const isDarkColor = chroma(background).luminance() <= .2; // chroma math to determine a Dark Color
        // const isLightColor = chroma(background).luminance() >= .44; // chroma math to determine a Light color

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className={classes.colorBox} style={{ background }}>
                    <div className={`copy-overlay ${copied && "show"}`} style={{ background }} />
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showFullPalette && (<Link to={moreUrl} onClick={e => e.stopPropagation()}>
                        <span className={classes.shades}>Shades</span>
                    </Link>)}

                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);

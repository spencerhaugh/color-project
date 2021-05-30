import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorBoxStyles';

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
                    <div className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} style={{ background }} />
                    <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>

                    <div className={classes.boxContent}>
                        <span className={classes.colorName}>{name}</span>
                    </div>
                    <button className={classes.copyButton}>Copy</button>

                    {showFullPalette && (<Link to={moreUrl} onClick={e => e.stopPropagation()}>
                        <span className={classes.shades}>Shades</span>
                    </Link>)}

                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);

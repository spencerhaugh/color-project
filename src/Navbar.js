import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import './Navbar.css';
import 'rc-slider/assets/index.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: "hex",
            open: false
        }
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    };
    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true })
        this.props.handleChange(e.target.value)
    }
    closeSnackBar() {
        this.setState({ open: false })
    }
    render() {
        const { level, changeLevel } = this.props;
        const { format } = this.state;
        return (
            <nav className="Navbar">
                <div className="logo">
                    <Link exact to='/'>Palette Builder</Link>
                </div>
                <div className='slider-container'>
                    <span>Level: {level}</span>
                    <div className='slider'>
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={changeLevel}
                            trackStyle={{ backgroundColor: 'transparent' }}
                            railStyle={{ height: '8px' }}
                            handleStyle={{
                                backgroundColor: 'green',
                                borderColor: 'green',
                                width: '13px',
                                height: '13px',
                                marginTop: '-3px'
                            }}
                            activeDotStyle={{
                                borderColor: 'green',
                                boxShadow: 'none',
                                outline: 'transparent 4px solid'
                            }}
                        />
                    </div>
                </div>
                <div className='select-container'>
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgb(255, 255, 255, 1)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={this.state.open}
                    autoHideDuration={2000}
                    message={<span id="message-id">Format changed to {format.toUpperCase()}!</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackBar}
                    action={[
                        <IconButton
                            onClick={this.closeSnackBar}
                            color='inherit'
                            key="close"
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </nav >
        )
    }
}

import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider';
import './Navbar.css';
import 'rc-slider/assets/index.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: "hex" }
        this.handleChange = this.handleChange.bind(this);
    };
    handleChange(e) {
        this.setState({ format: e.target.value })
        this.props.handleChange(e.target.value)
    }
    render() {
        const { level, changeLevel } = this.props;
        return (
            <nav className="Navbar">
                <div className="logo">
                    <a href='/'>Color APP</a>
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
                    <Select value='hex' onChange={this.handleChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgb(255, 255, 255, 1)</MenuItem>
                    </Select>
                </div>
            </nav>
        )
    }
}

import React, { Component } from 'react';
import Slider from 'rc-slider';
import './Navbar.css';
import 'rc-slider/assets/index.css';

export default class Navbar extends Component {
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
            </nav>
        )
    }
}

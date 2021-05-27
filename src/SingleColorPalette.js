import React, { Component } from 'react';
import ColorBox from './ColorBox';

export default class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    }
    gatherShades(palette, colorToFilterBy) {
        // return all shades of color
        let shades = []
        let allColors = palette.colors;

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return shades.slice(1);
    }


    render() {
        const colorBoxes = this._shades.map(color => (
            <ColorBox
                background={color.hex}
                name={color.name}
                key={color.name}
                showLink={false}
            />
        ));
        return (
            <div className='SingleColorPalette Palette'>
                <h1>Single Color Shades</h1>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

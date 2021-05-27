import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

export default class PaletteList extends Component {
    render() {
        const { palettes } = this.props;
        return (
            <div>
                <MiniPalette />
                <p>Palette Colors</p>
                {palettes.map(palette => (
                    <Link exact to={`palette/${palette.id}`}>{palette.paletteName}</Link>
                ))
                }
            </div>
        )
    }
}

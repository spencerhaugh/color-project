import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

class MiniPalette extends PureComponent {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
    };
    handleClick() {
        this.props.goToPalette(this.props.id)
    };
    handleDelete(e) {
        e.stopPropagation();
        this.props.openDialog(this.props.id);
    };

    render() {
        const { classes, paletteName, emoji, colors } = this.props;
        const miniColorBoxes = colors.map(color => (
            <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.color}></div>
        ))
        return (
            <div className={classes.root} onClick={this.handleClick}>
                <DeleteIcon className={classes.deleteIcon} onClick={this.handleDelete} />
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName}
                    <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        )
    }
};

export default withStyles(styles)(MiniPalette);

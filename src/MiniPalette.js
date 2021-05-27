import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    main: {
        backgroundColor: "purple",
        border: "3px solid teal"
    },
    secondary: {
        backgroundColor: "pink",
        "& h1": {
            color: "white",
            "& span": {
                backgroundColor: "yellow"
            }
        }
    }
};

function MiniPalette(props) {
    const { classes } = props;
    return (
        <div className={classes.main}>
            <h1>Mini Palette</h1>
            <section className={classes.secondary}>
                <h1>Second <span>Palette</span></h1>
            </section>
            <span>Get it?</span>
        </div>
    )
};

export default withStyles(styles)(MiniPalette);

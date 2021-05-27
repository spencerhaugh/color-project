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

// CSS in JS: aka JSS

// import { withStyles } from materialUI
// define variable styles
// define class: {}
// add css styles. Must be camelCase and values need to be "strings"
// Use "& element" to nest styles and include for example h1's within the secondary class
// export file as a higher order function as shown here: withStyles(yourStylesVariable)(yourComponent)


function JSSExample(props) {
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

export default withStyles(styles)(JSSExample);
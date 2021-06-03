import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newPaletteName: '',
            formShowing: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    };
    showForm() {
        this.setState({ formShowing: true })
    };
    hideForm() {
        this.setState({ formShowing: false })
    };
    render() {
        const { classes, open, handleSubmit, palettes } = this.props;
        const { newPaletteName, formShowing } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color='default'
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create A Palette
                    </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to='/'>
                            <Button
                                variant='outlined'
                                color='secondary'
                                className={classes.button}
                            >
                                Go Back
                        </Button>
                        </Link>
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            onClick={this.showForm}>
                            Save
                        </Button>
                    </div>
                </AppBar>
                {formShowing && <PaletteMetaForm handleSubmit={handleSubmit} palettes={palettes} hideForm={this.hideForm} />}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
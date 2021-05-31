import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import DraggableColorList from './DragableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

// JSS Styles
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: `calc(100vh - 64px)`,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

// React Functional Component
export default function NewPaletteForm(props) {

    // State Management
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState('purple');
    const [colors, setColors] = useState(props.palettes[0].colors);
    const [newName, setNewName] = useState({
        newColorName: '',
        newPaletteName: ''
    });

    // Component Methods
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const updateCurrentColor = (newColor) => {
        setCurrentColor(newColor.hex)
    };
    const addNewColor = () => {
        const newColor = { color: currentColor, name: newName.newColorName }
        setColors([...colors, newColor])
        setNewName({ ...newName, newColorName: '' });
    };
    const clearColors = () => {
        setColors([])
    };
    const handleChange = (evt) => {
        setNewName({ ...newName, [evt.target.name]: evt.target.value })
    };
    const handleSubmit = () => {
        let submitName = newName.newPaletteName
        const newPalette = {
            paletteName: submitName,
            id: submitName.toLowerCase().replace(/ /g, '-'),
            colors: colors
        }
        props.savePalette(newPalette);
        props.history.push('/');
    };
    const removeColor = (colorName) => {
        setColors(colors.filter(color => color.name !== colorName));
    }
    const onSortEnd = ({ oldIndex, newIndex }) => {
        setColors(arrayMove(colors, oldIndex, newIndex))
    }

    // Use Effect
    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", value => {
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule("isColorUnique", value => {
            return colors.every(
                ({ color }) => color !== currentColor
            );
        });
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });

    // Component Return
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
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create A Palette
                    </Typography>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <TextValidator
                            label="Palette name"
                            value={newName.newPaletteName}
                            name='newPaletteName'
                            onChange={handleChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette Name", "Palette name taken"]}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Save Palette
                        </Button>
                    </ValidatorForm>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Typography variant="h4">Design Your Palette</Typography>
                <div>
                    <Button variant="contained" color="secondary" onClick={clearColors}>Clear Palette</Button>
                    <Button variant="contained" color="primary">Random Color</Button>
                </div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={updateCurrentColor}
                />
                <ValidatorForm onSubmit={addNewColor} >
                    <Button
                        variant='contained'
                        type='submit'
                        color='primary'
                        style={{ backgroundColor: currentColor }}
                    >
                        Add Color
                </Button>
                    <TextValidator
                        value={newName.newColorName}
                        name='newColorName'
                        onChange={handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter a color name', 'Name must be unique', 'Color already in palette']}
                    />
                </ValidatorForm>

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList
                    colors={colors}
                    removeColor={removeColor}
                    axis='xy'
                    onSortEnd={onSortEnd}
                />
            </main>
        </div >
    );
}
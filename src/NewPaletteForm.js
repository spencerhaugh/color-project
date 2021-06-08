import React, { useState, useEffect } from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DragableColorList';
import { arrayMove } from 'react-sortable-hoc';
import useStyles from './styles/NewPaletteFormStyles';


// React Functional Component
export default function NewPaletteForm(props) {

    // State Management
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [colors, setColors] = useState(props.palettes[0].colors);
    const [newName, setNewName] = useState({
        newColorName: '',
        newPaletteName: ''
    });

    // Default props
    const maxColors = 20;
    const paletteIsFull = colors.length >= maxColors

    // Component Methods

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const addNewColor = (newColor) => {
        setColors([...colors, newColor])
        setNewName({ ...newName, newColorName: '' });
    };
    const addRandomColor = () => {
        let randPalette = Math.floor(Math.random() * props.palettes.length);
        let randColorBox = Math.floor(Math.random() * props.palettes[randPalette].colors.length);
        let randColor = props.palettes[randPalette].colors[randColorBox];
        setColors([...colors, randColor]);
    }
    const clearColors = () => {
        setColors([])
    };
    const handleSubmit = (submitPalette) => {
        submitPalette.id = submitPalette.paletteName.toLowerCase().replace(/ /g, '-');
        submitPalette.colors = colors;
        props.savePalette(submitPalette);
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

    });

    // Component Return
    return (
        <div className={classes.root}>
            <PaletteFormNav
                open={open}
                // classes={classes}
                palettes={props.palettes}
                handleSubmit={handleSubmit}
                handleDrawerOpen={handleDrawerOpen} />
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
                <div className={classes.container}>
                    <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={clearColors}
                        >
                            Clear Palette
                    </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={addRandomColor}
                            disabled={paletteIsFull}
                        >
                            Random Color
                    </Button>
                    </div>
                    <ColorPickerForm
                        paletteIsFull={paletteIsFull}
                        addNewColor={addNewColor}
                        colors={colors}
                    />
                </div>
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
                    distance={20}
                />
            </main>
        </div >
    );
}
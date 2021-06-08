import React, { useState } from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import arrayMove from 'array-move';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DragableColorList';
import useStyles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';


export default function NewPaletteForm(props) {
    // State Management
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [colors, setColors] = useState(seedColors[0].colors);
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
        let randPalette;
        let randColorBox;
        let randColor;
        // Prevent duplicate random color selection
        let isDuplicate = true;
        while (isDuplicate) {
            randPalette = Math.floor(Math.random() * props.palettes.length);
            randColorBox = Math.floor(Math.random() * props.palettes[randPalette].colors.length);
            randColor = props.palettes[randPalette].colors[randColorBox];
            console.log(randColor)
            isDuplicate = checkDuplicate(randColor.name);
        }
        setColors([...colors, randColor]);
    };
    const checkDuplicate = (colorName) => {
        return colors.some(color => color.name === colorName);
    };
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
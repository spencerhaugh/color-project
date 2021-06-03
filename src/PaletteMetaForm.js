import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';



export default function PaletteMetaForm(props) {
    const [stage, setStage] = useState('form');
    const [paletteName, setPaletteName] = useState('')

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };
    const handleChange = (evt) => {
        setPaletteName(evt.target.value)
    };
    const showEmojiPicker = () => {
        setStage('emoji')
    };
    const savePalette = (emoji) => {
        const submitPalette = {
            paletteName: paletteName,
            emoji: emoji.native
        }
        props.handleSubmit(submitPalette)
    }
    useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    })

    return (
        <div>
            <Dialog open={stage === 'emoji'} onClose={props.hideForm} >
                <DialogTitle id="emoji-dialog-title">Choose A Palette Emoji</DialogTitle>
                <Picker emoji='heart_eyes_cat' title="Pick a vibe" onSelect={savePalette} />
            </Dialog>
            <Dialog open={stage === 'form'} onClose={props.hideForm} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Choose A Palette</DialogTitle>
                <ValidatorForm onSubmit={showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new beautiful palette!
                            Make sure it's unique!
                    </DialogContentText>

                        <TextValidator
                            label="Palette Name"
                            value={paletteName}
                            name='newPaletteName'
                            onChange={handleChange}
                            fullWidth
                            variant='filled'
                            margin="normal"
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette Name", "Palette name taken"]}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.hideForm} color="primary">
                            Cancel
                    </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Save Palette
                    </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}

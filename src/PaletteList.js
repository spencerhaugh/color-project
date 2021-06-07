import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';
class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteDialog: false,
            deleteId: ''
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    };

    openDialog(id) {
        this.setState({ openDeleteDialog: true, deleteId: id });
    };
    closeDialog() {
        this.setState({ openDeleteDialog: false, deleteId: '' });
    };
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    };
    handleDelete() {
        this.props.deletePalette(this.state.deleteId);
        this.closeDialog();
    }

    render() {
        const { palettes, classes, deletePalette } = this.props;
        const { openDeleteDialog, deleteId } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>Palette Maker</h1>
                        <Link to='/palette/new'>Create New Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition key={palette.id} classNames='fade' timeout={500}  >
                                <MiniPalette
                                    {...palette}
                                    handleClick={() => this.goToPalette(palette.id)}
                                    key={palette.id}
                                    id={palette.id}
                                    openDialog={this.openDialog}
                                />
                            </CSSTransition>
                        ))
                        }
                    </TransitionGroup>
                </div>
                <Dialog open={openDeleteDialog} aria-labrlledby='delete-dialog-title' onClose={this.closeDialog}>
                    <DialogTitle id='delete-dialog-title'>Delete This Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={"Trash it"} />
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={"Keep it"} />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);

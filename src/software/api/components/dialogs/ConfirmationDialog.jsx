import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";

const ConfirmationDialog = ({ open, onClose, title, content }) => {
    const handleClose = ok => debounce((e) => onClose(ok));
    // const backdropClicked
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose(false)}>Cancel</Button>
                <Button onClick={handleClose(true)} autoFocus>OK</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;

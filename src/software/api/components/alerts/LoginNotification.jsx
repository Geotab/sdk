import React, {useEffect} from 'react';
import {Alert, Slide, Snackbar} from "@mui/material";

function SlideTransition(props) {
    return <Slide {...props} direction="up"/>;
}
const LoginNotification = ({appState}) => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (appState.userLabel) {
            setOpen(true);
        }
        else {
            setOpen(false);
        }
    }, [appState.userLabel])
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            TransitionComponent={SlideTransition}
        >
            <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: '100%' }}
            >
                Logged in!
            </Alert>
        </Snackbar>
    );
};

export default LoginNotification;

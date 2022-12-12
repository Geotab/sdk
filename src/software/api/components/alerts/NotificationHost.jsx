import React, { useEffect, useState } from 'react';
import {Alert, Slide, Snackbar} from "@mui/material";

function SlideTransition(props) {
    return <Slide {...props} direction="up"/>;
}

export const Notification = (message, severity = 'success', duration = 2000) => ({ message, severity, duration });

const NotificationHost = ({appState}) => {
    const [open, setOpen] = useState(false);
    const [ notificationInfo, setNotificationInfo ] = useState({});
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        appState.setShowNotification(false)
    };

    useEffect(() => {
        if (appState.showNotification && appState.currentNotificationRef()) {
            const notification = appState.currentNotificationRef();
            setNotificationInfo(notification);
            appState.setShowNotification(false)
            setOpen(true);
        }
        appState.currentNotificationRef(null);
    }, [appState.showNotification])
    return (
        <Snackbar
            open={open}
            autoHideDuration={notificationInfo.duration || 2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            TransitionComponent={SlideTransition}
            // sx={[{
            //     "& .css-iepnp-MuiSnackbar-root": {
            //     // "& .MuiSnackbar-root": {
            //     bottom: 10,
            // }}]}
            // sx={{ 
            //     bottom: 10,
            //     transform: 'translateX(-50%) translateY(10px)',
            //     "& .MuiSnackbarContent-root": {bottom: 10},
            //     "& .MuiSnackbar-root": {bottom: 10},
            //    
            // }}
        >
            <Alert
                onClose={handleClose}
                severity={notificationInfo.severity || "success"}
                sx={{ width: '100%' }}
            >
                {notificationInfo.message}
            </Alert>
        </Snackbar>
    );
};

export default NotificationHost;
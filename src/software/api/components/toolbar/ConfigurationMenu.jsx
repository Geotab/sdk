import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { actions } from './SaveControls';
import { ListItemIcon, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ConfigurationMenu({ anchorEl, onClose }) {
    const open = Boolean(anchorEl);
    const handleClick = (action) => {
        return debounce(e => {
            e.preventDefault();
            onClose(action);
        });
    };
    const handleClose = () => {
        return debounce(e => {
            onClose();
        });
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
                pointerEvents: 'none',
                '& .MuiPopover-paper': { pointerEvents: 'auto' }
            }}
            slotProps={{ backdrop: { pointerEvents: 'none' } }}
            hideBackdrop={true}
        >
            <MenuItem
                onClick={handleClick(actions.RENAME)}>
                <ListItemIcon>
                    <EditIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Rename</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClick(actions.DELETE)}>
                <ListItemIcon>
                    <DeleteIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
        </Menu>
    );
}

import { useState } from 'react';
//import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const MyComponent: React.FC = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      
      const handleClose = () => {
        setOpen(false);
      };
      return (
        <div>
          <Button onClick={handleClickOpen}>Open Alert</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Alert</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This is an alert form.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }      

export default MyComponent;
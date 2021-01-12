import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SendIcon from '@material-ui/icons/Send';

import { handleSend } from './App';

export default function FormDialog(mom,itemId) { 
  const [open, setOpen, vals] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = (event) => {
    //this.setState({ entered: true , 
    //address: event.target.value
    //});
    //vals="ss";
    setOpen(false);
    //mom.mom.state.sendingAddress = '';
    mom.mom.state.itemIdToSend = mom.itemId;
    console.log(mom.mom.state)
    mom.mom.send();
  }

  const onChange = (e) => {
    mom.mom.state.sendingAddress = e.target.value;
  }

  return (
    <div>
      <Button align="right" variant="contained"  size="small" color="secondary" onClick={handleClickOpen}><SendIcon></SendIcon>Send</Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Send NFT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the correct address where the token needs to be transferred
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="emailAddress"
            label="Address"
            fullWidth
            value={mom.mom.state.sendingAddress}
            onChange={(e) => {
                e.preventDefault()
                mom.mom.state.sendingAddress = e.target.value;
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

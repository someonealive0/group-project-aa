import React from 'react';
import {useState} from 'react'
import * as firebase from 'firebase'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link  from 'react-router-dom/Link';
import Register from './Register';

const LoginForm = () => {
  const [open, setOpen] = useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setpassword('')
    setusername('')
  };

  const handleSubmit = () => {
    console.log({username, password});
  }
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            value = {username}
            fullWidth
            onChange={(e) => setusername(e.target.value)}
          />


          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setpassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText align='center'> New user?<Register /></DialogContentText>
          </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoginForm
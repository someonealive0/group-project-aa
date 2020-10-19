import React from 'react';
import { useState } from 'react'
import * as firebase from 'firebase'
import { Redirect, Link } from 'react-router-dom';
import Register from './Register';

//Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const LoginForm = () => {
  const [open, setOpen] = useState(false);
  const [loginDetails, setLoginDetails] = useState({username: '', password: ''})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoginDetails({username: '', password: ''})
  };

  const handleSubmit = () => {
    console.log(loginDetails);
    setLoginDetails({username: '', password: ''})
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>Login</Button>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            value={loginDetails.username}
            fullWidth
            onChange={(e) => setLoginDetails({...loginDetails, 'username': e.target.value})}
          />

          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            value={loginDetails.password}
            fullWidth
            onChange={(e) => setLoginDetails({...loginDetails, 'password': e.target.value})}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Login</Button>
        </DialogActions>

        <DialogContent>
          <DialogContentText align='center'>New user? <Register /></DialogContentText>
        </DialogContent>

      </Dialog>
    </>
  )
}

export default LoginForm
import React from 'react';
import {useState, useEffect} from 'react'
import * as firebase from 'firebase'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link  from 'react-router-dom/Link';
import { Redirect } from 'react-router-dom';

const Register = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setsignupDetails(initialState)
    setPasswordRepeat('')
  };

  const handleSubmit = () => {
    console.log({signupDetails});
    console.log(passwordRepeat);
    handleClose()
  }
  const initialState = {username:'', password:'', email:''}
  const [signupDetails, setsignupDetails] = useState(initialState)
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const regexUsername = /(\w+)/g

    const handleSignupDetailsSubmit = (event) => {
      event.preventDefault()

      //Make sure fields aren't empty
      if (!signupDetails.username || !signupDetails.password) {
        console.log("Username or password is missing")
        alert("Username or password is missing")
        return
      }
      //Disallow spaces in username
      if (signupDetails.username.split(' ').length != 1) {
        console.log("Username can't contain spaces")
        alert("Username can't contain spaces")
        return
      }
      //Disallow non-alphanumeric characters
      if (signupDetails.username.match(regexUsername)[0] != signupDetails.username) {
        console.log("Username can only contain alphanumeric characters")
        alert("Username can only contain alphanumeric characters")
        return
      }
      //Confirm password
      if (signupDetails.password != passwordRepeat) {
        console.log("Passwords don't match")
        alert("Passwords don't match")
        return    
      }
      
      firebase.auth().createUserWithEmailAndPassword(signupDetails.email, signupDetails.password).then(() => {
        setsignupDetails({username:'', password:'', email:''})
        setPasswordRepeat('')  
      }).catch((error) => {
        // Handle Errors here.
        console.log(error.code)
        console.log(error.message)
        // ...
      })
    }
    
    const handleSignupDetailsChange = (prop) => (
      (event) => {
        setsignupDetails({...signupDetails, [prop]:event.target.value})
      }
    )  
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  return (
    <div>
      <Link onClick={handleClickOpen}>
        Register
      </Link>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
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
          <TextField
            margin="dense"
            id="password"
            label="Confirm Password"
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
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Register
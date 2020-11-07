import React from 'react';
import { useState, useEffect } from 'react'
import * as firebase from 'firebase'
import { Redirect, Link } from 'react-router-dom';

//Material-UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Register = () => {
  const [open, setOpen] = useState(false)

  const regexUsername = /(\w+)/g
  const initialState = { username: '', password: '', email: '' }
  const [signupDetails, setSignupDetails] = useState(initialState)
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const handleClickOpen = (event) => {
    event.preventDefault()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSignupDetails(initialState)
    setPasswordRepeat('')
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const { username, email, password } = { ...signupDetails }

    //Check for empty fields
    if (!(username && email && password && passwordRepeat)) {
      alert("Missing field")
      console.log("Missing field")
      return
    }

    //Validate username
    if (username.split(' ').length != 1 || username.match(regexUsername)[0] != username) {
      console.log("Invalid username")
      alert("Invalid username")
      return
    }

    //Validate password
    if (password.length < 6) {
      console.log("Password must contain at least 6 characters")
      alert("Password must contain at least 6 characters")
      return
    }
    if (password != passwordRepeat) {
      console.log("Passwords don't match")
      alert("Passwords don't match")
      return
    }

    //Check if username is free, then create user and store them in firebase
    const usernameLC = username.toLowerCase()
    const dbUsersRef = firebase.database().ref('users')
    const dbUserDataRef = firebase.database().ref('userData')
    
    dbUsersRef.child(usernameLC).once('value', (snapshot) => {
      if (!snapshot.exists()) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
          dbUserDataRef.child(result.user.uid).set({
            "username": username,
            "email": email,
            "profileImg": "https://avatars.dicebear.com/api/male/" + username + ".svg",
            "groups": []
          }).catch((error) => console.log(error))

          var dbUserObj = {}
          dbUserObj[usernameLC] = result.user.uid
          dbUsersRef.update(dbUserObj)

          setSignupDetails(initialState)
          setPasswordRepeat('')
          console.log("signed up")
        }).catch((error) => console.log(error.message))
      } else {
        console.log("Username taken")
        alert("Username taken")
        return
      }
    })
  }

  return (
    <>
      <Button color='secondary' variant='outlined' onClick={handleClickOpen}>Register</Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            value={signupDetails.username}
            fullWidth
            onChange={(e) => setSignupDetails({ ...signupDetails, 'username': e.target.value })}
          />

          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="text"
            value={signupDetails.email}
            fullWidth
            onChange={(e) => setSignupDetails({ ...signupDetails, 'email': e.target.value })}
          />

          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            value={signupDetails.password}
            fullWidth
            onChange={(e) => setSignupDetails({ ...signupDetails, 'password': e.target.value })}
          />

          <TextField
            margin="dense"
            id="passwordRepeat"
            label="Confirm Password"
            type="password"
            value={passwordRepeat}
            fullWidth
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Register</Button>
        </DialogActions>

      </Dialog>
    </>
  );
}

export default Register
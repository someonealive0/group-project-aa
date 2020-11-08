import React from "react";
import { useState } from "react";
import * as firebase from "firebase";
import { Redirect, Link } from "react-router-dom";
import Register from "./Register";


//JavaScript based styling
import styles from "./styles/styles";
import Fade from "@material-ui/core/Fade";
//Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const provider = new firebase.auth.GoogleAuthProvider();


const LoginForm = () => {
  const [showForm, setShowForm] = useState(false)
  const classes = styles();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const handleSubmit = () => {
    console.log(loginDetails);
    firebase
      .auth()
      .signInWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then((result) => {
        console.log("logged in");
      })
      .catch((error) => alert(error.message));
  };

  setTimeout(() => {
    setShowForm(true)
  }, 3000);

  const handleGoogleSignin = () => {
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log("adding user to db")
      const user = result.user
      const username = user.email.slice(0, 5) + user.uid.slice(0, 5)

      firebase.database().ref('userData').child(user.uid).set({
        "username": username,
        "email": user.email,
        "profileImg": user.photoURL,
        "groups": []
      }).catch((error) => console.log(error))
      console.log("updated userdata")

      firebase.database().ref("groupData").child("allChat/members/" + result.user.uid).set(true)
      console.log("updated groupdata")

      const dbUserObj = {}
      dbUserObj[username.toLowerCase()] = user.uid
      firebase.database().ref('users').update(dbUserObj)

    }).catch((error) => alert(error.message))
  }

  return (
    <>
      <Fade in={showForm}>
        <Dialog open={true} aria-labelledby="form-dialog-title" className='popup-form'>
          <DialogTitle id="form-dialog-title">Login</DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="text"
              value={loginDetails.email}
              fullWidth
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, email: e.target.value })
              }
            />

            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              value={loginDetails.password}
              fullWidth
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleSubmit}
              color="primary"
              variant='contained'
              className={classes.submitBtn}
            >
              Login
            </Button>
          </DialogActions>
          <DialogContent>

            <DialogContentText align="center">
              <Button
                onClick={handleGoogleSignin}
                color="primary"
                variant='contained'
                className={classes.submitBtn}
              >Google sign-in</Button>
            </DialogContentText>

            <DialogContentText align="center">
              New user? <Register />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Fade>
    </>
  );
};

export default LoginForm;

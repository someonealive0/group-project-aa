import React, { useState, useEffect, useRef } from 'react'
import * as firebase from 'firebase'
import { Redirect, Link } from 'react-router-dom';

//Material-UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const CreateChannelForm = ({ currentGroup }) => {
  const [open, setOpen] = useState(false)
  const initialState = { "name": '', "description": '' }
  const [channelDetails, setChannelDetails] = useState(initialState)
  const charLimit = 30

  const handleClickOpen = (event) => {
    event.preventDefault()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChannelDetails(initialState)
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, description } = { ...channelDetails }

    //Check for empty fields
    if (!(name && description)) {
      alert("Missing field")
      console.log("Missing field")
      return
    }

    //Validate channel name
    if (!(name.length > 0 && name.length <= charLimit)) {
      console.log("Invalid channel name")
      alert("Invalid channel name")
      return
    }

    //Validate channel description
    if (!(description.length > 0 && description.length <= charLimit)) {
      console.log("Invalid description")
      alert("Invalid description")
      return
    }

    const ref = firebase.database().ref("groupData").child(currentGroup.id).child("channels").push(channelDetails)
    console.log(ref)
    setOpen(false)
    setChannelDetails(initialState)
  }

  if (!currentGroup) return (<></>)
  return (
    <>
      <div className="dbChannelAdd" onClick={handleClickOpen}><div className="dbChannelAddIcon">+</div></div>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Channel</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Channel name"
            type="text"
            inputProps={{
              maxLength: charLimit
            }}
            autoComplete='off'
            helperText={`${charLimit-channelDetails.name.length}/${charLimit} characters remaining`}
            value={channelDetails.name}
            fullWidth
            onChange={(e) => setChannelDetails({ ...channelDetails, 'name': e.target.value })}
          />

          <TextField
            margin="dense"
            id="description"
            label="Channel description"
            type="text"
            inputProps={{
              maxLength: charLimit
            }}
            autoComplete='off'
            helperText={`${charLimit-channelDetails.description.length}/${charLimit} characters remaining`}
            value={channelDetails.description}
            fullWidth
            onChange={(e) => setChannelDetails({ ...channelDetails, 'description': e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Done</Button>
        </DialogActions>

      </Dialog>
    </>
  );
}

export default CreateChannelForm
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import '../css/App.css'
import * as firebase from 'firebase'
import '../css/DashboardView.css'
import { useContext } from 'react'
import { userAuth } from '../App'
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent} from '@material-ui/core'

const UserProfile = () => {
    const currUser = useContext(userAuth)
    console.log('uid', firebase.auth().currentUser)
    
    if (currUser === null){ return (<h1>Null</h1>)} //Redirect to landing page if currUser logged out
    else if (currUser === undefined) {return (<h1>Undefined</h1>)}
    else
    var imgsrc = `https://robohash.org/${currUser.uid}`
    return (
        <div>
            <Card className='user-profile-card'>
                <CardContent className='user-profile-pic-holder'><img className='user-profile-pic' src={imgsrc}></img></CardContent>
                <CardContent className='user-card-content'>{currUser.uid}</CardContent>
                <CardContent className='btn-container'><Button classname='edit-btn' variant='contained' color='primary'>Edit Profile</Button></CardContent>
            </Card>
        </div>
    )
}

export default UserProfile
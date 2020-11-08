import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import '../css/App.css'
import * as firebase from 'firebase'
import '../css/DashboardView.css'
import { useContext } from 'react'
import { userAuth } from '../App'
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent} from '@material-ui/core'
import styled from 'styled-components';

const UserProfile = () => {
    const currUser = useContext(userAuth)
    const [userDetails, setUserDetails] = useState(undefined)
    console.log('uid', firebase.auth().currentUser)

    useEffect(() => {
        if (currUser) firebase.database().ref("userData").child(currUser.uid).on("value",(snapshot) => {
            setUserDetails(snapshot.val())
        })
    }, [currUser])
    
    if (currUser === null){ return (<h1>Null</h1>)} //Redirect to landing page if currUser logged out
    else if (currUser === undefined) {return (<h1>Undefined</h1>)}
    else
    var imgsrc = userDetails ? userDetails.profileImg : "/smile.png"
    return (
        <div>
            <Card className='user-profile-card'>
                <CardContent className='user-profile-pic-holder'><img className='user-profile-pic' src={imgsrc}></img></CardContent>
                <CardContent className='user-card-content'>{userDetails ? userDetails.username : ""}</CardContent>
                <CardContent className='btn-container'><Button classname='edit-btn' variant='contained' color='primary'>Edit Profile</Button></CardContent>
                <img src="/backInBlack.png" style={{padding:"10px"}} onClick={event => window.location.href='/home'}></img>
            </Card>
        </div>
    )
}

export default UserProfile
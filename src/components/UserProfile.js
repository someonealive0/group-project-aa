import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import * as firebase from 'firebase'
import '../css/DashboardView.css'
import { useContext } from 'react'
import { userAuth } from '../App'

const UserProfile = () => {
    const currUser = useContext(userAuth)
    console.log('uid', firebase.auth().currentUser)
    if (currUser === null){ return (<h1>Null</h1>)} //Redirect to landing page if currUser logged out
    else if (currUser === undefined) {return (<h1>Undefined</h1>)}
    else
    return (
        <div>
            <button onClick={() => console.log('current currUser', firebase.auth().currentUser)}>Button</button>
            <h1>{currUser.uid}</h1>
        </div>
    )
}

export default UserProfile
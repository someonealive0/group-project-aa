import React, { useState, useEffect, useContext } from 'react'
import testService from '../services/testService'
import * as firebase from 'firebase'
import { Redirect, Link } from 'react-router-dom';
import {userAuth} from '../App'
import Loading from './Loading';
const Home = () => {
    const [user, setUser] = useState(undefined)
    const currUser = useContext(userAuth)
    // useEffect(() => {
    //     const unsubscribe = firebase.auth().onAuthStateChanged((authState) => {
    //         if (authState) {
    //             console.log("Signed in as", authState)
    //             setUser(authState)
    //         } else {
    //             console.log("No user", user)
    //             setUser(null)
    //         }
    //     })
    //     return () => unsubscribe()
    // }, [])
    console.log('currUser', currUser);
    if (currUser === undefined) return (<></>) //User hasn't initialised yet
    else if (currUser === null) return (<Redirect to="/" />) //User is logged out, redirect to landing page
    else
    return (
        <>
            {console.log("home user (shouldn't be null)", user)}
            <h1>Signed in as {currUser.uid}</h1> <p></p>
            <button onClick={() => testService.test().then(result => console.log(result))}>Log a test message</button>
            <button onClick={() => firebase.auth().signOut()}>Log out</button>
            <Link to="/dashboard">Dashboard</Link>
            <br/>
            <Link to='/me'>User Profile</Link>
            
        </>
    )
}

export default Home
import React, { useState, useEffect } from 'react'
import testService from '../services/testService'
import * as firebase from 'firebase'
import { Redirect, Link } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((authState) => {
            if (authState) {
                console.log("Signed in as", authState)
                setUser(authState)
            } else {
                console.log("No user", user)
                setUser(null)
            }
        });
    }, [])

    if (user === undefined) return (<></>) //User hasn't initialised yet
    if (user === null) return (<Redirect to="/" />) //User is logged out, redirect to landing page
    return (
        <>
            {console.log("home user (shouldn't be null)", user)}
            <button onClick={() => testService.test().then(result => console.log(result))}>Log a test message</button>
        </>
    )
}

export default Home
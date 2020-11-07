import React, { useState, useEffect, useContext } from 'react'
import testService from '../services/testService'
import * as firebase from 'firebase'
import { Redirect, Link } from 'react-router-dom';
import {userAuth} from '../App'
import Loading from './Loading';
import styled from 'styled-components';

const Button = styled.button`
background-color: black;
color: white;
font-size: 20px;
padding: 10px 60px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
&:disabled {
  color: grey;
  opacity: 0.7;
  cursor: default;
}
`;
const ButtonGroup = styled.div`display: block, margin:auto`

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
        <div style={{margin: "20px"}}>
            {console.log("home user (shouldn't be null)", user)}
            <h1>Signed in as {currUser.uid}</h1> 
            <p>Welcome to Lighthouse. What would you like to do?</p>
            <ButtonGroup>
                <Link to='/me'><Button>User Profile</Button></Link>
                <Link to="/dashboard"><Button>Dashboard</Button></Link>
                <Button variant="light" onClick={() => testService.test().then(result => console.log(result))}>Log a test message</Button>
                <Button variant="light" onClick={() => firebase.auth().signOut()}>Log out</Button>
            </ButtonGroup>
            <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "30%"}} src="/logo.png"></img>
        </div>
    )
}

export default Home
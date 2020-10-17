import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Link} from "react-router-dom"
import * as firebase from 'firebase'

const SignupForm = () => {
    const [signupDetails, setsignupDetails] = useState({username:'', password:'', email:''})
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

    return (  
      <form className="loginForm" onSubmit={handleSignupDetailsSubmit}>
        <h1 className="recentPosts">Sign up</h1>
        <input className="loginUsername" placeholder="Username (alphanumeric only)" type="text" value={signupDetails.username} onChange={handleSignupDetailsChange('username')}></input>
        <input className="loginUsername" placeholder="Email" type="text" value={signupDetails.email} onChange={handleSignupDetailsChange('email')}></input>
        <input className="loginPassword" placeholder="Password" type="password" value={signupDetails.password} onChange={handleSignupDetailsChange('password')}></input>
        <input className="loginPassword" placeholder="Repeat your password" type="password" value={passwordRepeat} onChange={(event) => setPasswordRepeat(event.target.value)}></input>                
        <input className="loginBtn" type="submit"></input>
        <p className="registerHere">Already have an account? <Link className="registerHereLink" to="/login">Login here</Link></p>
      </form>
    )
}

export default SignupForm
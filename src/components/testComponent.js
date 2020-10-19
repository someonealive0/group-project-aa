import React, { useState, useEffect } from 'react'
import testService from '../services/testService'
import * as firebase from 'firebase'

const TestComponent = () => {
    const [users, setUsers] = useState()

    useEffect(() => {
        firebase.database().ref('users').on('value', (snapshot) => {
            console.log(users)
        })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log("User signed in", user)
            } else {
                console.log("User signed out")
            }
        });
    }, [])
    
    return (
        <>
            <p>Test</p>
            <button onClick={() => testService.test().then(result => console.log(result))}>Log a test message</button>
        </>
    )
}

export default TestComponent
import React, { useState, useEffect } from 'react'
import testService from '../services/testService'
import * as firebase from 'firebase'

const TestComponent = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.database().ref('users').on('value', (snapshot) => {
            snapshot.val() && setUsers(Object.values(snapshot.val()))
        })
    }, [])
    return (
        <>
            <p>Test</p>
            <button onClick={() => testService.test().then(result => console.log(result))}>Log a test message</button>
            <button onClick={() => console.log(users)}>Log a test message</button>
        </>
    )
}

export default TestComponent
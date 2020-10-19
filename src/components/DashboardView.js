import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import * as firebase from 'firebase'
import '../css/DashboardView.css'

const MessageView = () => {
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((authState) => {
            if (authState) {
                console.log("Signed in as", authState)
                setUser(authState)
            } else {
                console.log("No user", user)
                setUser(null)
            }
        })
        return () => unsubscribe()
    }, [])

    if (user === null) return (<Redirect to="/" />) //Redirect to landing page if user logged out
    return (
        <div className="dbWrapper">
            <div className="dbHeader">Discord (sort of)</div>
            <div className="dbMainContent">
                <div className="dbGroupIconList"></div>

                <div className="dbChannelCol">
                    <div className="dbChannelList"></div>
                    <div className="dbUserInfo"></div>
                </div>
                <div className="dbMessagesCol"></div>
                <div className="dbFriendsCol"></div>
            </div>
        </div>
    )
}

export default MessageView
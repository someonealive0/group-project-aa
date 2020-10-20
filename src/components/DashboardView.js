import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import * as firebase from 'firebase'
import '../css/DashboardView.css'

const MessageView = () => {
    const [user, setUser] = useState(undefined)
    const testChannelNames = ["general", "meme", "uni chat"]
    const testGroupName = "COMP3160 Group Project" //Should be <= 22 chars
    const testChannelDescription = "This is a description for the general channel"

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

    if (user === undefined) return (<></>) //User hasn't initialised yet

    return (
        <div className="dbWrapper">
            <div className="dbHeader">Discord (sort of)</div>
            <div className="dbMainContent">
                <div className="dbGroupIconList"></div>

                <div className="dbChannelCol">
                    <div className="dbColHeader">
                        <p className="dbGroupName">{testGroupName}</p>
                    </div>
                    <ul className="dbChannelList">
                        {testChannelNames.map((channel) => (
                            <li className="dbChannelListItem">
                                <div className="dbChannel">
                                    <span className="dbChannelIcon">#</span>
                                    <span className="dbChannelName">{channel}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="dbUserInfo">
                        <div className="dbUserImg"><img src={"/smile.png"}></img></div>
                        <span className="dbUsername">{user.uid}</span>
                    </div>
                </div>
                <div className="dbMessagesCol">
                    <div className="dbColHeader">
                        <div className="dbCurrentChannel">
                            <span className="dbChannelIcon">#</span>
                            <span className="dbChannelName">{testChannelNames[0]}</span>
                            <span className="dbChannelDesc">{testChannelDescription}</span>
                        </div>
                    </div>
                    <div className="dbMsgList"></div>
                    <div className="dbSubmitMsg"></div>
                </div>
                <div className="dbFriendsCol">
                    <div className="dbColHeader"></div>
                </div>
            </div>
        </div>
    )
}

export default MessageView
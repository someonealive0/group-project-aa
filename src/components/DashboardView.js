import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import * as firebase from 'firebase'
import '../css/DashboardView.css'

import DBMessagesCol from './dbMessagesCol'
import DBChannelCol from './dbChannelCol'

const DashboardView = () => {
    const [user, setUser] = useState(undefined)
    const [groupData, setGroupData] = useState(undefined)
    const [currentChannel, setCurrentChannel] = useState(undefined)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        //Set up user auth listener
        let unsubscribe = () => { }
        if (user === undefined) {
            unsubscribe = firebase.auth().onAuthStateChanged(async (authState) => {
                if (authState) {
                    console.log("Signed in as", authState)
                    setUser(authState)
                } else {
                    console.log("No user", user)
                    setUser(null)
                }
            })
        }

        const groupRef = firebase.database().ref('groupData').child('someid123')

        const initialise = async () => {
            if (user) {
                //Add authenticated user to userData lookup
                let userDetails = {}
                userDetails[user.uid] = await getUserDetails(user.uid)

                //Set groupdata for current group
                groupRef.on('value', (snapshot) => {
                    const groupData = snapshot.val()
                    setCurrentChannel({ "channelID": "channelid1", "channelData": groupData.channels["channelid1"] })
                    setGroupData(groupData)

                    //Populate userData lookup with group members' details
                    Promise.all(Object.entries(groupData.members).map(async ([uid, exists]) => {
                        userDetails[uid] = await getUserDetails(uid)
                    })).then(() => setUserData((prev) => ({ ...prev, ...userDetails })))

                })
            }
        }

        initialise()

        return () => { unsubscribe(); groupRef.off() }
    }, [user])

    const getUserDetails = (uid) => {
        return firebase.database().ref("userData").child(uid).once("value").then((details) => {
            return details.val()
        })
    }

    const setCurrentChannelFn = (channelID) => {
        setCurrentChannel({ "channelID": channelID, "channelData": groupData.channels[channelID] })
    }

    if (user === null) return (<Redirect to="/" />) //Redirect to landing page if user logged out
    if (user === undefined) return (<></>) //User hasn't initialised yet
    return (
        <div className="dbWrapper">
            <div className="dbHeader">Discord (sort of)</div>
            <div className="dbMainContent">
                <div className="dbGroupCol">
                    <div className="dbGroupHome">
                        <img className="dbGroupHomeImg" src="/logo.png"></img>
                    </div>
                    <div className="dbGroupList"><ul>
                        <li><div className="dbGroup dbGroupCurrent">
                            <img className="dbGroupImg" src="/logo.png"></img>
                        </div></li>

                        <li><div className="dbGroup">
                            <img className="dbGroupImg" src="/logo.png"></img>
                        </div></li>
                        <li><div className="dbGroup">
                            <img className="dbGroupImg" src="/logo.png"></img>
                        </div></li>
                        <li><div className="dbGroup">
                            <img className="dbGroupImg" src="/logo.png"></img>
                        </div></li>
                    </ul></div>
                </div>

                <DBChannelCol authUserData={userData[user.uid]} currentChannel={currentChannel} setCurrentChannel={setCurrentChannelFn}
                    groupName={groupData ? groupData.groupName : ""} channels={groupData ? groupData.channels : null} />

                <DBMessagesCol user={user} currentChannel={currentChannel} userData={userData} />

                <div className="dbUsersCol">
                    <div className="dbColHeader"></div>
                    <div className="dbUserList"><ul>
                        {groupData ? Object.entries(groupData.members).map(([groupUserID, groupUsername], index) => (
                            <li key={index} className="dbUserListItem">
                                <div className="dbUser">
                                    <div className="dbUserImg"><img src={userData[groupUserID] ? userData[groupUserID].profileImg : "/smile.png"}></img></div>
                                    <span className="dbUserListName">{groupUsername}</span>
                                </div>
                            </li>
                        )) : <></>}
                    </ul></div>
                </div>
            </div>
        </div>
    )
}

export default DashboardView
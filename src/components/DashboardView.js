import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import * as firebase from 'firebase'
import '../css/DashboardView.css'

import DBMessagesCol from './dbMessagesCol'
import DBChannelCol from './dbChannelCol'

const DashboardView = () => {
    const [user, setUser] = useState(undefined)
    const [groupData, setGroupData] = useState({ "empty": true })
    const [currentChannel, setCurrentChannel] = useState(undefined)
    const [currentGroup, setCurrentGroup] = useState(undefined)
    const [userData, setUserData] = useState({})

    var unsubscribe = () => { }
    const groupRef = firebase.database().ref('groupData')

    useEffect(() => {
        //Set up user auth listener
        if (user === undefined) {
            unsubscribe = firebase.auth().onAuthStateChanged((authState) => {
                if (authState) {
                    console.log("Signed in as", authState)
                    setUser(authState)
                } else {
                    console.log("No user", user)
                    setUser(null)
                }
            })
        }

        //Get user details for current user (profileImg, username, etc.)
        if (user && !userData[user.uid]) {
            firebase.database().ref("userData").child(user.uid).once("value").then((snapshot) => {
                setUserData((prev) => {
                    const newUserData = { ...prev }
                    newUserData[user.uid] = snapshot.val()
                    return newUserData
                })
            })
        }

        //Setup listener for updates to groupData -- should eventually only grab groups the user is a part of
        if (groupData.empty) {
            firebase.database().ref('groupData').on("value", (snapshot) => { setGroupData(snapshot.val()) })
        }

        return () => { unsubscribe(); groupRef.off() }
    }, [user])

    useEffect(() => {
        if (currentGroup) {
            const mainChannel = groupData[currentGroup.id].channels
            const [channelID, channelData] = Object.entries(mainChannel)[0]
            setCurrentChannel({ "channelID": channelID, "channelData": channelData })

            //Update userData for users in current group (get profileImg, usernames, etc.)
            Object.entries(groupData[currentGroup.id].members).map(([userID, exists]) => {
                if (!userData[userID]) {
                    updateUserData(userID)
                }
                console.log(userID)
            })
        }
    }, [currentGroup])


    const setCurrentChannelFn = (channelID) => {
        setCurrentChannel({ "channelID": channelID, "channelData": groupData[currentGroup.id].channels[channelID] })
    }

    const updateUserData = (uid) => {
        console.log("no userdata", uid)

        firebase.database().ref('userData').child(uid).on("value", (snapshot) => {
            setUserData((prev) => {
                const updatedUserData = { ...prev }
                updatedUserData[uid] = snapshot.val()
                return updatedUserData
            })
        })
    }

    if (user === null) return (<Redirect to="/" />) //Redirect to landing page if user logged out
    if (user === undefined) return (<></>) //User hasn't initialised yet
    return (
        <div className="dbWrapper">
            <div className="dbAppname">Lighthouse</div>
            <div className="dbMainContent">
                <div className="dbGroupCol">
                    <div className="dbGroupHome">
                        <img className="dbGroupHomeImg" src="/logo.png"></img>
                    </div>
                    <div className="dbGroupList"><ul>
                        {!groupData.empty && Object.entries(groupData).map(([groupID, groupDetails], index) => (
                            <li key={index}><div className={currentGroup && currentGroup.id == groupID ? "dbGroup dbGroupCurrent" : "dbGroup"} 
                                onClick={() => setCurrentGroup({ "id": groupID })}>
                                <img className="dbGroupImg" src={groupDetails.groupImg}></img>
                                <div className="tooltip"><span className="tooltiptext"><span>{groupDetails.groupName}</span></span></div>
                            </div></li>
                        ))}
                    </ul></div>
                </div>

                <DBChannelCol authUserData={userData[user.uid]} currentChannel={currentChannel} setCurrentChannel={setCurrentChannelFn}
                    groupName={currentGroup && groupData[currentGroup.id] ? groupData[currentGroup.id].groupName : ""} channels={currentGroup && groupData[currentGroup.id] ? groupData[currentGroup.id].channels : null} />

                <DBMessagesCol user={user} currentChannel={currentChannel} userData={userData} updateUserData={updateUserData} />

                <div className="dbUsersCol">
                    <div className="dbColHeader"></div>
                    <div className="dbUserList"><ul>
                        {currentGroup && groupData[currentGroup.id] ? Object.entries(groupData[currentGroup.id].members).map(([groupUserID, exists], index) => (
                            <li key={index} className="dbUserListItem">
                                <div className="dbUser">
                                    <div className="dbUserImg"><img src={userData[groupUserID] ? userData[groupUserID].profileImg : "/smile.png"} 
                                        onError={(event) =>  event.target.src = '/smile.png'}></img></div>
                                    <span className="dbUserListName">{userData[groupUserID] ? userData[groupUserID].username : ""}</span>
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
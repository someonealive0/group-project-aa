import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import * as firebase from 'firebase'
import '../css/DashboardView.css'

const DashboardView = () => {
    const [user, setUser] = useState(undefined)
    const [groupData, setGroupData] = useState(undefined)
    const [messageList, setMessageList] = useState([])
    const [currentChannel, setCurrentChannel] = useState(undefined)
    const [userData, setUserData] = useState({})

    useEffect(() => {
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

        const messagesRef = firebase.database().ref('messages').child('channelid1')
        const groupRef = firebase.database().ref('groupData').child('someid123')

        const initialise = async () => {
            if (user) {
                //Add authenticated user to userData lookup
                let userDetails = {}
                userDetails[user.uid] = await getUserDetails(user.uid)

                //Grab messages from current channel
                messagesRef.on('value', (snapshot) => {
                    let messages = []
                    if (!snapshot.exists()) { return }
                    snapshot.forEach((snap) => {
                        messages.push(snap.val())
                    })
                    setMessageList(messageList.concat(messages))
                })

                //Set groupdata for current group
                groupRef.on('value', (snapshot) => {
                    const groupData = snapshot.val()
                    setCurrentChannel({ "channelID": "channelid1", "channelData": groupData.channels["channelid1"] })
                    setGroupData(groupData)

                    //Populate userData lookup with group members' details
                    Promise.all(Object.entries(groupData.members).map(async ([uid, exists]) => {
                        userDetails[uid] = await getUserDetails(uid)
                    })).then(() => setUserData({ ...userData, ...userDetails }))

                })
            }
        }

        initialise()

        return () => { unsubscribe(); messagesRef.off(); groupRef.off() }
    }, [user])

    const getUserDetails = (uid) => {
        return firebase.database().ref("userData").child(uid).once("value").then((details) => {
            return details.val()
        })
    }

    if (user === null) return (<Redirect to="/" />) //Redirect to landing page if user logged out
    if (user === undefined) return (<></>) //User hasn't initialised yet
    return (
        <div className="dbWrapper">
            <div className="dbHeader">Discord (sort of)</div>
            <div className="dbMainContent">
                <div className="dbGroupCol"></div>

                <div className="dbChannelCol">
                    <div className="dbColHeader">
                        <p className="dbGroupName">{groupData ? groupData.groupname : <></>}</p>
                    </div>
                    <div className="dbChannelList"><ul>
                        {groupData ? Object.entries(groupData.channels).map(([channelID, channel], index) => (
                            <li key={index} className="dbChannelListItem">
                                <div className="dbChannel">
                                    <span className="dbChannelIcon">#</span>
                                    <span className="dbChannelName">{channel.name}</span>
                                </div>
                            </li>
                        )) : <></>}
                    </ul></div>
                    <div className="dbUserInfo">
                        <div className="dbUserImg"><img src={userData[user.uid] ? userData[user.uid].profileImg : "/smile.png"}></img></div>
                        {console.log(userData)}
                        <span className="dbUsername">{userData[user.uid] ? userData[user.uid].username : "username"}</span>
                    </div>
                </div>

                <div className="dbMessagesCol">
                    <div className="dbColHeader">
                        <div className="dbCurrentChannel">
                            <span className="dbChannelIcon">#</span>
                            <span className="dbChannelName">{currentChannel ? currentChannel.channelData.name : <></>}</span>
                            <span className="dbChannelDesc">{currentChannel ? currentChannel.channelData.description : <></>}</span>
                        </div>
                    </div>
                    <div className="dbMsgList"><ul>
                        {messageList.map((message, index) => (
                            <li key={index} className="dbMsgListItem">
                                <div className="dbMessage">
                                    <div className="dbMsgImg">
                                        <img src={userData[message.user] ? userData[message.user].profileImg : "/smile.png"}></img>
                                    </div>
                                    <div className="dbMsgContentWrap">
                                        <div className="dbMsgInfo">
                                            <span className="dbMsgName">{userData[message.user] ? userData[message.user].username : message.user}</span>
                                            <span className="dbMsgTime">{message.time}</span>
                                        </div>
                                        <div className="dbMsgContent">{message.content}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul></div>
                    <div className="dbSubmitMsg"></div>
                </div>

                <div className="dbUsersCol">
                    <div className="dbColHeader"></div>
                    <div className="dbUserList"><ul>
                        {groupData ? Object.entries(groupData.members).map(([groupUserID, groupUsername], index) => (
                            <li key={index} className="dbUserListItem">
                                <div className="dbUser">
                                    <div className="dbUserImg"><img src={userData[groupUserID] ? userData[groupUserID].profileImg : "/smile.png"}></img></div>
                                    <span className="dbUserName">{groupUsername}</span>
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
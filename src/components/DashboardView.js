import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import * as firebase from 'firebase'
import '../css/DashboardView.css'

const DashboardView = () => {
    const [user, setUser] = useState(undefined)
    const [groupData, setGroupData] = useState(undefined)
    const [messageList, setMessageList] = useState([])
    const [currentChannel, setCurrentChannel] = useState(undefined)
    const [userData, setUserData] = useState(undefined)  

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

        const messagesRef = firebase.database().ref('messages').child('channelid1')
        messagesRef.on('value', (snapshot) => {
            let messages = []
            if (!snapshot.exists()) {return}
            snapshot.forEach((snap) => {
                messages.push(snap.val())
            })
            setMessageList(messageList.concat(messages))
        })

        const groupRef = firebase.database().ref('groupData').child('someid123')
        groupRef.on('value', (snapshot) => {
            const groupData = snapshot.val()
            setCurrentChannel({"channelID": "channelid1", "channelData": groupData.channels["channelid1"]})
            setGroupData(groupData)
        })

        return () => {unsubscribe(); messagesRef.off(); groupRef.off()}
    }, [])

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
                        <div className="dbUserImg"><img src={"/smile.png"}></img></div>
                        <span className="dbUsername">{user.uid}</span>
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
                                        <img src={"/smile.png"}></img>
                                    </div>
                                    <div className="dbMsgContentWrap">
                                        <div className="dbMsgInfo">
                                            <span className="dbMsgName">{message.user}</span>
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
                        {groupData ? Object.entries(groupData.members).map(([user, exists], index) => (
                            <li key={index} className="dbUserListItem">
                                <div className="dbUser">
                                    <div className="dbUserImg"><img src={"/smile.png"}></img></div>
                                    <span className="dbUserName">{user}</span>
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
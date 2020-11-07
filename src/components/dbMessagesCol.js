import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import * as firebase from 'firebase'
import '../css/DashboardView.css'

//Timestamps
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
TimeAgo.addDefaultLocale(en)

const DBMessagesCol = ({ user, currentChannel, userData, updateUserData }) => {
    const [messageCache, setMessageCache] = useState({})
    const [messageRefCache, setMessageRefCache] = useState({})
    const [messageInput, setMessageInput] = useState("")
    const [shouldScroll, setShouldScroll] = useState(false)
    const [prevChannel, setPrevChannel] = useState(null)
    const msgListRef = useRef()
    const messagesEndRef = useRef()

    useEffect(() => {
        //let cleanUpSubscriptions = () => { console.log("cleaning"); Object.entries(messageRefCache).map(([channelID, msgRefData]) => msgRefData.ref.off()) }

        if (currentChannel) {
            messagesEndRef.current.scrollIntoView()

            if (!messageCache[currentChannel.channelID]) {
                const msgList = {}
                msgList[currentChannel.channelID] = []
                setMessageCache({ ...messageCache, ...msgList })

                const msgRef = {}
                msgRef[currentChannel.channelID] = { "ref": firebase.database().ref('messages').child(currentChannel.channelID), "listening": false }
                setMessageRefCache({ ...messageRefCache, ...msgRef })
            }
        }

        // return cleanUpSubscriptions
    }, [currentChannel])

    useEffect(() => {
        if (currentChannel) {
            const channelMsgRefData = messageRefCache[currentChannel.channelID]

            if (channelMsgRefData && !channelMsgRefData.listening) {

                channelMsgRefData.ref.on('child_added', (snapshot) => {
                    if (msgListRef.current)
                        setShouldScroll(msgListRef.current.scrollTop >= msgListRef.current.scrollHeight - msgListRef.current.clientHeight - 100)

                    if (!userData[snapshot.val().user]) {
                        updateUserData(snapshot.val().user)
                    }

                    setMessageCache((prev) => {
                        const message = { "msgID": snapshot.key, "msgDetails": snapshot.val() }
                        const newMsgList = prev[currentChannel.channelID].concat([message])
                        const updatedEntry = {}
                        updatedEntry[currentChannel.channelID] = newMsgList
                        return { ...prev, ...updatedEntry }
                    })
                })
        
                channelMsgRefData.ref.on('child_changed', (snapshot) => {
                    const changedMsgID = snapshot.key

                    setMessageCache((prev) => {
                        const newMsgList = prev[currentChannel.channelID].map((message) => message.msgID == changedMsgID ? { "msgID": changedMsgID, "msgDetails": snapshot.val() } : message)
                        const updatedEntry = {}
                        updatedEntry[currentChannel.channelID] = newMsgList
                        return { ...prev, ...updatedEntry }
                    })
                })

                channelMsgRefData.ref.on('child_removed', (snapshot) => {
                    const deletedMsgID = snapshot.key
                    if (msgListRef.current)
                        setShouldScroll(msgListRef.current.scrollTop >= msgListRef.current.scrollHeight - msgListRef.current.clientHeight - 100)

                    setMessageCache((prev) => {
                        const newMsgList = prev[currentChannel.channelID].filter((message) => message.msgID != deletedMsgID)
                        const updatedEntry = {}
                        updatedEntry[currentChannel.channelID] = newMsgList
                        return { ...prev, ...updatedEntry }
                    })
                })

                const newMmsgRefData = {}
                newMmsgRefData[currentChannel.channelID] = { "ref": channelMsgRefData.ref, "listening": true }
                setMessageRefCache({ ...messageRefCache, ...newMmsgRefData })
            }
        }

    }, [messageRefCache])


    //Scroll page down when new messages added and user is at bottom of message list
    useLayoutEffect(() => {
        if (shouldScroll && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView()
            setShouldScroll(false)
        }
    }, [messageCache])

    const handleMessageSubmit = (event) => {
        event.preventDefault()
        const message = { "content": messageInput, "time": firebase.database.ServerValue.TIMESTAMP, "user": user.uid }
        firebase.database().ref("messages").child(currentChannel.channelID).push(message)
        setMessageInput("")
    }

    return (
        <div className="dbMessagesCol">
            <div className="dbColHeader">
                <div className="dbCurrentChannel">
                    <span className="dbCurrentChannelIcon">#</span>
                    <span className="dbCurrentChannelName">{currentChannel ? currentChannel.channelData.name : <></>}</span>
                    <span className="dbChannelDesc">{currentChannel ? currentChannel.channelData.description : <></>}</span>
                </div>
            </div>
            <div className="dbMsgList" ref={msgListRef}><ul>
                {currentChannel && messageCache[currentChannel.channelID] ? messageCache[currentChannel.channelID].map(({ msgID, msgDetails }, index) => {
                    let date = new Date(msgDetails.time)
                    date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() //Formatted time as DD/MM/YYYY
                    return (
                        <li key={index} className="dbMsgListItem">
                            <div className="dbMessage">
                                <div className="dbMsgImg">
                                    <img src={userData[msgDetails.user] ? userData[msgDetails.user].profileImg : "/smile.png"} 
                                        onError={(event) =>  event.target.src = '/smile.png'}></img>
                                </div>
                                <div className="dbMsgContentWrap">
                                    <div className="dbMsgInfo">
                                        <span className="dbMsgName">{userData[msgDetails.user] ? userData[msgDetails.user].username : msgDetails.user}</span>
                                        {msgDetails.time < Date.now() - 24 * 60 * 60 * 1000 ? //Use relative time for messages < 24 hrs old, otherwise formatted time
                                            <span className="dbMsgTime">{date}</span> :
                                            <ReactTimeAgo className="dbMsgTime" date={new Date(msgDetails.time)} locale="en-US" timeStyle="round-minute" />
                                        }
                                    </div>
                                    <div className="dbMsgContent">{msgDetails.content}</div>
                                </div>
                            </div>
                        </li>
                    )
                }) : <></>}
            </ul><div ref={messagesEndRef} /></div>
            <div className="dbSubmitMsg">
                <div className="dbSubmitMedia"><div className="dbSubmitMediaIcon">+</div></div>
                <form className="dbSubmitForm" onSubmit={handleMessageSubmit}>
                    <input type="text" placeholder="Message this channel" value={messageInput} onChange={((event) => setMessageInput(event.target.value))}></input>
                </form>
            </div>
        </div>
    )
}

export default DBMessagesCol
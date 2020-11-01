import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import * as firebase from 'firebase'
import '../css/DashboardView.css'

const DashboardView = ({ user, currentChannel, userData }) => {
    const [messageList, setMessageList] = useState([])
    const [messageInput, setMessageInput] = useState("")
    const [shouldScroll, setShouldScroll] = useState(false)
    const messagesEndRef = useRef()
    const msgListRef = useRef()

    useEffect(() => {
        let cleanUpSubscriptions = () => { }

        if (user && currentChannel) {
            const messagesRef = firebase.database().ref('messages').child(currentChannel.channelID)
            cleanUpSubscriptions = () => { messagesRef.off() }

            messagesRef.on('child_added', (snapshot) => {
                setShouldScroll(msgListRef.current.scrollHeight - msgListRef.current.scrollTop === msgListRef.current.clientHeight)
                setMessageList((prev) => [...prev, { "msgID": snapshot.key, "msgDetails": snapshot.val() }])
            })

            messagesRef.on('child_removed', (snapshot) => {
                const deletedMsgID = snapshot.key
                setShouldScroll(msgListRef.current.scrollHeight - msgListRef.current.scrollTop === msgListRef.current.clientHeight)
                setMessageList((prev) => prev.filter((message) => message.msgID != deletedMsgID))
            })
        }

        return cleanUpSubscriptions
    }, [user, currentChannel])

    useLayoutEffect(() => {
        if (shouldScroll) {
            messagesEndRef.current.scrollIntoView()
            setShouldScroll(false)
        }
    }, [messageList])

    const handleMessageSubmit = (event) => {
        event.preventDefault()
        const message = { "content": messageInput, "time": firebase.database.ServerValue.TIMESTAMP, "user": user.uid }
        firebase.database().ref("messages").child(currentChannel.channelID).push(message)
        setMessageInput("")
    }

    if (user === null) return (<Redirect to="/" />) //Redirect to landing page if user logged out
    if (user === undefined) return (<></>) //User hasn't initialised yet
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
                {messageList.map(({ msgID, msgDetails }, index) => (
                    <li key={index} className="dbMsgListItem">
                        <div className="dbMessage">
                            <div className="dbMsgImg">
                                <img src={userData[msgDetails.user] ? userData[msgDetails.user].profileImg : "/smile.png"}></img>
                            </div>
                            <div className="dbMsgContentWrap">
                                <div className="dbMsgInfo">
                                    <span className="dbMsgName">{userData[msgDetails.user] ? userData[msgDetails.user].username : msgDetails.user}</span>
                                    <span className="dbMsgTime">{msgDetails.time}</span>
                                </div>
                                <div className="dbMsgContent">{msgDetails.content}</div>
                            </div>
                        </div>
                    </li>
                ))}
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

export default DashboardView
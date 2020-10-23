import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import * as firebase from 'firebase'
import '../css/DashboardView.css'

const DashboardView = () => {
    const [user, setUser] = useState(undefined)
    const testChannelNames = ["general", "meme", "uni chat","meme", "uni chat","meme", "uni chat","meme", "uni chat", "meme", "uni chat", "meme", "uni chat", "meme", "uni chat", "meme", "uni chat", "meme", "uni chat", "meme", "uni chat", "meme", "uni chat", "meme", "uni chat"]
    const testGroupName = "COMP3160 Group Project" //Should be <= 22 chars
    const testChannelDescription = "This is a description for the general channel"
    const testMessageList = [
        {
            "content": "This is a message by user C",
            "user": "Mandible",
            "time": "10/18/2020"
        },
        {
            "content": "This is a message by user D",
            "user": "Jean Tarrou",
            "time": "10/19/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user D",
            "user": "Jean Tarrou",
            "time": "10/19/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user D",
            "user": "Jean Tarrou",
            "time": "10/19/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        },
        {
            "content": "This is a message by user A",
            "user": "someonealive",
            "time": "10/20/2020"
        },
        {
            "content": "This is a message by user B",
            "user": "Bobalooba",
            "time": "10/21/2020"
        }
    ]

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
                    <div className="dbChannelList"><ul>
                        {testChannelNames.map((channel) => (
                            <li className="dbChannelListItem">
                                <div className="dbChannel">
                                    <span className="dbChannelIcon">#</span>
                                    <span className="dbChannelName">{channel}</span>
                                </div>
                            </li>
                        ))}
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
                            <span className="dbChannelName">{testChannelNames[0]}</span>
                            <span className="dbChannelDesc">{testChannelDescription}</span>
                        </div>
                    </div>
                    <div className="dbMsgList"><ul>
                        {testMessageList.map((message) => (
                            <li className="dbMsgListItem">
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
                </div>
            </div>
        </div>
    )
}

export default DashboardView
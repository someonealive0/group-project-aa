import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import * as firebase from 'firebase'
import '../css/DashboardView.css'

const DBChannelCol = ({ currentChannel, setCurrentChannel, groupName, channels, authUserData }) => {

    return (
        <div className="dbChannelCol">
            <div className="dbColHeader">
                <p className="dbGroupName">{groupName}</p>
            </div>
            <div className="dbChannelList"><ul>
                {channels ? Object.entries(channels).map(([channelID, channel], index) => (
                    <li key={index} className="dbChannelListItem">
                        <div onClick={() => setCurrentChannel(channelID)} 
                            className={currentChannel && currentChannel.channelID == channelID ? "dbSelectedChannel" : "dbChannel"}>

                            <span className="dbChannelIcon">#</span>
                            <span className="dbChannelName">
                                {channel.name}
                            </span>
                        </div>
                    </li>
                )) : <></>}
            </ul></div>
            <div className="dbUserInfo">
                <div className="dbUserImg"><img src={authUserData ? authUserData.profileImg : "/smile.png"} 
                    onError={(event) =>  event.target.src = '/smile.png'}></img></div>
                <span className="dbUsername">{authUserData ? authUserData.username : "username"}</span>
            </div>
        </div>
    )
}

export default DBChannelCol
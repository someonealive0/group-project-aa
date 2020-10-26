const express = require('express')
const path = require('path')
const admin = require('firebase-admin')
const appRef = admin.initializeApp()

const apiRouter = express.Router()

apiRouter.get('/api/test/*', function(req, res) {

  res.status(200).json({"message": "This is a test message from the API.", "rq": req.url})
})

apiRouter.get('/api/auth/clear_all_users', (req, res) => {
  const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken).then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        admin.auth().deleteUser(userRecord.uid)
      })
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken)
      }
    }).catch((error) => res.status(500).json({'Error': error}))
  }
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers()
  res.status(200).end()
})


module.exports = apiRouter
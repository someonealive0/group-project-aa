# COMP3120 Group AA Application - Lighthouse Realtime Chat

This group project was created using [Create React App](https://github.com/facebook/create-react-app)

## Deployment

This application has been deployed with Google Firebase and is available at the following addresses:

- https://comp3120-groupaa-project.web.app
- https://comp3120-groupaa-project.firebaseapp.com

By default, every Firebase project offers free sub-domains at web.app and firebaseapp.com. The deployment itself follows a number of steps that are best described within the official Firebase documentation at https://firebase.google.com/docs/hosting#implementation_path. The application already has a number of predefined users that can be used as credentials for login, and email resgistration is also supported.

To reproduce the application, there are number of items that need to be addressed in order for the application to work properly:

1. After cloning the application repository, install its dependencies via `npm install` in both the `root` directory *and* the `/functions` directory (this is an artefact of how Firebase handles deployment)
2. Create a new `.env` file based of existing sample file `.env.sample` provided. The file contains the environmental variables that are necessary for the application to access firebase and to generate and validate JWT tokens at your local Express and node.js servers. It should contain references to your own database and a JWT secret (make sure to add `.env` file into `.gitignore`).

## Running and Updating the Application

### Quickstart guide 

To start the local front and backend servers run `npm run serve:dev` in the `functions/` directory and `npm start` in the `root` directory.

### Back-End

The command `npm run serve:dev` starts the Express backend within the `functions/`, which is mounted with Firebase Functions, with NodeMon to automatically update changes (it will automatically restart upon changing anything in the backend files). Default port is 5000. The most recent built application can be viewed at `localhost:5000`, however updating the application on the front-end and have them displayed here, it's required to execute `npm build` again.

### Front-End

The command `npm start` starts the React font-end server. This would be used to view any changes that are made to the application, as static-files served by Express server require the command `npm run build` to be executed for it to see any changes. After staging and committing the changes you made to the files, push it to the master repository. Default port is 3000. Make changes to the front-end here and you can view them straight away at `localhost:3000`. Communication to the back-end is rerouted via a proxy to port 5000.

## Database Initilisations

## Project Structure

## TODO

- Implement firebase access rules

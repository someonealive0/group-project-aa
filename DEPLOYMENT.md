# COMP3120 Group AA Application - Lighthouse Realtime Chat Depolyment

## Deployment Details

This application has been deployed with Google Firebase and is available at the following addresses:

> - https://comp3120-groupaa-project.web.app
> - https://comp3120-groupaa-project.firebaseapp.com

By default, every Firebase project offers free sub-domains at web.app and firebaseapp.com. The deployment itself follows a number of steps that are best described within the official Firebase documentation at https://firebase.google.com/docs/hosting#implementation_path. The application already has a number of predefined users that can be used as credentials for login, and email resgistration is also supported.

To reproduce the application, there are number of items that need to be addressed in order for the application to work properly:

1. After cloning the application repository, install its dependencies via `npm install` in both the `root` directory _and_ the `/functions` directory (this is an artefact of how Firebase handles deployment)
2. Create a new `.env` file based of existing sample file `.env.sample` provided. The file contains the environmental variables that are necessary for the application to access firebase and to generate and validate JWT tokens at your local Express and node.js servers. It should contain references to your own database and a JWT secret (make sure to add `.env` file into `.gitignore`).

---

## Quickstart guide - How to Run and Build the Project

To start the local front and backend servers run `npm run serve:dev` in the `functions/` directory and `npm start` in the `root` directory. Make sure that you have the [Firebase CLI](https://firebase.google.com/docs/cli) installed first, and installed Firebase Tools with the command `npm install -g firebase-tools`

### Back-End

The command `npm run serve:dev` starts the Express backend within the `functions/`, which is mounted with Firebase Functions, with NodeMon to automatically update changes (it will automatically restart upon changing anything in the backend files). Default port is 5000. The most recent built application can be viewed at `localhost:5000`, however updating the application on the front-end and have them displayed here, it's required to execute `npm build` again.

### Front-End

The command `npm start` starts the React font-end server. This would be used to view any changes that are made to the application, as static-files served by Express server require the command `npm run build` to be executed for it to see any changes. After staging and committing the changes you made to the files, push it to the master repository. Default port is 3000. Make changes to the front-end here and you can view them straight away at `localhost:3000`. Communication to the back-end is rerouted via a proxy to port 5000.

### Deploying

To deploy your changes to the live production build, first run `npm run build` in the `root` directory, then run `npm run deploy` in the `/functions` directory.

## Database Initilisations

This application uses Google's [Firebase Realtime Database](https://firebase.google.com/docs/database) for data storage. In the application's current state, user data is added to the database upon registration, and similarly messages are added to the database upon being submitted by users. However, the automatic creation of groups is still a work in progress, and as such new groups need to be added manually to the database.

## Available Scripts

Project root directory

### `npm start`

Runs the application in the development mode.<br />
View it in browser at [http://localhost:3000](http://localhost:3000)

### `npm test`

Runs the test in interactive watch mode.<br />
Additional information on [running tests](https://facebook.github.io/create-react-app/)

### `npm run build`

Runs a script for building the application to the `build` directory
Bundles React in production mode and optimizes it at the same time

You should see a message in the log `Your app is ready to be deployed!` after it's finished

Additional information on [deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run eject`

Run the script if you're not happy with the build tool and configuration choices. It will remove the single build dependency from your project

It will copy all configuration files and then the transitive dependencies into your project for full control over them. All commands except `eject` will work after this, however they will point to the copied scripts if you want to modify them.

It's not necessary to use `eject` as curated feature set is only suitable for small and middle deployments.

## More Information

Additional information on [Creating React App documentations](https://facebook.github.io/create-react-app/docs/getting-started).

Additional guides on [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analysing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

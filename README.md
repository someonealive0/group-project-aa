# COMP3120 Group AA Application

This group project was create using [Create React App](https://github.com/facebook/create-react-app)

## Deployment

Application has been deployed using Firebase and is available at https://comp3120-groupaa-project.web.app and comp3120-groupaa-project.firebaseapp.com. By default, every Firebase project offers free sub-domains; including on web.app and firebaseapp.com. The deployment itself follows number of steps that can be viewed at https://firebase.google.com/docs/hosting#implementation_path. Application has already number of predefined users that can be used a credentials for login

For re-producing this application, there are number of items that need to be addressed in order for the application to work properly. After cloning the application repository and installed all dependencies via 'npm install', make sure to create a new '.env' file based of existing sample file '.env.sample' provided. The file contains the environmental variables that are necessary for the application to access firebase and to generate and validate JWT tokens at your local Express and node.js servers. It should contain references to your own database and a JWT secret (make sure to add '.env' file into '.gitignore').

## Running and Updating the Application

For locally running and updating the application, run the following commands in separate console tabs:

Run it within 'functions/' directory

- npm serve:dev

Run it within the root directory

- npm start

### Back-End

The command 'npm serve:dev' starts the Express backend, which is mounted with Firebase Functions, with NodeMon to automatically update changes (it will automatically restart upon changing anything in the backend files). Default port is 5000. The most recent built application can be viewed at 'localhost:5000', however updating the application on the front-end and have them displayed here, it's required to execute 'npm build' again.

### Front-End

The command 'npm start' starts the React font-end server. This would be used to view any changes that are made to the application, as static-files served by Express server require the command 'npm run build' to be executed for it to see any changes. After staging and committing the changes you made to the files, push it to the master repository.

## Origional stuff

## Running the server

### Initialisation

Run `npm install` from within the root directory _and_ in the `functions` directory (this is a side-effect of how firebase manages deployment). Then make a `.env` file in the root directory which appropriately mimics the `.env.sample` file provided (_this is currently empty_). Then run `npm build` from the root directory.

### Express/Firebase Back-End

Use the command `npm serve:dev` within the `functions/` directory to run the Express server mounted with Firebase Functions, with Nodemon to automatically update changes. Default port is 5000. You can view the most recently built app at `localhost:5000`, but to update any changes you've made on the front-end and have them reflected here, you need to run `npm build` again.

### React Front-End

Use the command `npm start` to run the React server. Default port is 3000. Make changes to the front-end here and you can view them straight away at `localhost:3000`. Communication to the back-end is rerouted via a proxy to port 5000.

## Deployment

Use the command `npm run deploy` to deploy the app to firebase. You will likely get a prompt to sign into firebase with your google account first (group members use student emails for correct permissions).

## TODO

- Implement firebase access rules

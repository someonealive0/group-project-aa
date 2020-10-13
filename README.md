# COMP3120 Group AA Application

## Running the server

## Initialisation
Run `npm install` from within the root directory *and* in the `functions` directory (this is a side-effect of how firebase manages deployment). Then make a `.env` file in the root directory which appropriately mimics the `.env.sample` file provided (*this is currently empty*). Then run `npm build` from the root directory.

### Express/Firebase Back-End
Use the command `npm serve:dev` within the `functions/` directory to run the Express server mounted with Firebase Functions, with Nodemon to automatically update changes. Default port is 5000. You can view the most recently built app at `localhost:5000`, but to update any changes you've made on the front-end and have them reflected here, you need to run `npm build` again.

### React Front-End
Use the command `npm start` to run the React server. Default port is 3000. Make changes to the front-end here and you can view them straight away at `localhost:3000`. Communication to the back-end is rerouted via a proxy to port 5000.


## Deployment
Use the command `npm run deploy` to deploy the app to firebase. You will likely get a prompt to sign into firebase with your google account first (group members use student emails for correct permissions).

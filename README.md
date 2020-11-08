# COMP3120 Group AA Application - Lighthouse Realtime Chat

This group project was created using [Create React App](https://github.com/facebook/create-react-app). A video explanation is available in the `screenshots` under the file names `part1` and `part2`.

## Project Outline
The application we have created is a messaging platform where users can communicate with each other in real-time; taking inspiration form the popular messaging platform [Discord](https://discord.com/). Users are able to communicate with each other or, if they prefer, create groups where they can message other users who are also part of that group. This project was aimed at capturing a young demographic by creating a simple, clutter-free interface that allows communication without any distraction. We aimed to build a fully featured application but with the tight time constrainsts were limited to what we could achieve; especially working with new components and on new platforms including [firebase](https://firebase.google.com/).  

## Description of MVP
The MVP was able to include the functionality we aimed for at the outset in the project proposal. These include:
- User registration and login
- User sign-out
- Creating chat groups
- Joining groups
- View user profiles
- Unique user profile images
- Group Images
- Real-time messaging (appears as each user posts, continuously scrolls to the latest message)
- Multiple views (for each group chat)

As mentioned, the limited project timeline meant we needed to work efficiently. We first set up the firebase and Github repositories, created a base application and implemented some basic functionality. We then decided on what features we would like to implement and what was possible in the given timeframe. With the remaining time we populated the database, implemented the listed features, revised the features, implemented some styling and worked on more (some unsuccessfully, which we have included below to look at in the future).

## Guide to Project Source Code
The application is simple by nature as an instant messaing platform, though the implementation becomes quite complex to ensure that multiple users can access the application in a synchronous manner without breaking the application.

Users are able to:
- Sign in with an email and password or with Google
- Log out
- View their user profile
- Go to the dashboard where they can message groups and rooms in real-time
- Add new channels to groups
- Mention other users with a @ tag

The dashboard is the main functionality of the application and where users will spend most of thier time. Users are able to view and join chats in groups as well as rooms within these groups to futher distinguish certain chat rooms between users. All messages appear in real time after a users sends a message with timestamps that update too. Users can tag each other and delete messages by pressing the trash can next to any of their messages which will remove it from the conversation.

Styling was done with a combination of css, inline styling and Material-UI for the bulk of the work, which gave us a clean looking application with a high degree of design modularity and customisability.

The project is seperated into the functions folder which contains the Firebase/Express backend and middleware with which to call the api. The bulk of the functionality is contained in the src folder with the main base application files as well as the folders housing the styling, services and most importantly all the components. Calls to the custom Express backend are rare as the Firebase library handles the vast majority of the application's functionality in its current limited state. The backend is ready for further development as it is already setup with Firebase Functions.

### `/functions`

This directory holds the Express backend hosted with Firebase functions. In its current state it is quite bare, as the vast majority of the application's functionality is handled directly with the Firebase Auth api and the RTDB. In future, a number of controllers (e.g. permissions controller, aggregated user info controller, etc.) can be added to service those needs of the application that are best handled on the backend rather than the client.


### `/public`

This directory holds the publicly accessible assets which the application makes use of, such as the placeholder profile images and the font files. Any additional assets needed in future should be placed here, and can be accessed from the client as if they were in the root directory (e.g. `<img src ="/smile.png">`).

### `/src` 

This directory holds the individual components and styling necessary for the application to render on the client in the `/components` and `/css` subdirectories, respectively. Additionally, the `/services` directory holds a test service function for accessing the backend API. As the project develops, this will expand to provide helper functions for the necessary backend operations that the client can pass off. 

The `App.js` file is the base component which determines the routing for the application to the login page, home page or dashboard based on the authentication status of the user. New 'pages' of the application can added to this file with the appropriate routing upon creating new components. The key components that are rendered are the `Home.js` and `DashboardView.js` files, which display the logged in screen and main application, respectively. The dashboard relies on the `dbChannelCol.js` and `dbMessagesCol.js`, which implement the majority of the application's functionality. Future development will likely be focused on these two components and their subcomponents (e.g. `createChannelForm.js`).

### Data model

The client stores a live cache of the Firebase Realtime database (RTDB) in the variables userData and groupData. These variables effectively mirror the database structure of the RTDB, however only fetches the data that it needs as it is requested (for example, the messages for a certain channel of a certain group are only acquired when that channel is selected, and only the messages submitted since the user was last in that channel are requested to save bandwidth)

In keeping with the suggested method of storing data in the Firebase RTDB, there are multiple copies of data in different places in order to accelerate indexing (for example, the list of all users is kept in the `/users` database directory while the userIDs of a particular group's members are also listed in the `/members` section of a group directory).

### Security Rules

The Firebase Functions routes and Firebase RTDB are protected by the Firebase security rules, which limit access to the database and api based on the authentication status of the user. Currently this is set to allow any request from any authenticated user in the interest of keeping the application accessible and in preperation for further development of the user roles/permissions aspect of the application.

### Components
- Spinner: displayed to users between components loading.
![Spinner](SCREENSHOTS/spinner.png)
- Login form: Dispayed if no user is logged in, users can input their information and login or choose to register. 
![LoginForm](SCREENSHOTS/LoginScreen.png)
- Registration form: Users can inout their username, email and password to register with the application which registers a user into firebase.
![RegistrationForm](SCREENSHOTS/RegistrationScreen.png)
- Home: This is the fisrt page a user sees when they login. They can view their user profile, go to the dashboard or logout.
![Home](SCREENSHOTS/HomeScreen.png)
- Dashboard: The dashboard is the main component of the application. The user can navigate between groups and chat rooms within these groups by clicking on the icons and rooms. Users can post messages into their groups and chat rooms which are logged and timestamps are displayed in real-time. Users can tag each other and also delete messages.
![Dashboard](SCREENSHOTS/DashboardTimestamps.png)
- Firebase: Below is a screenshot of an example realtime database in firebase
![Firebase](SCREENSHOTS/firebase.png)

Check the [SCREENSHOTS](SCREENSHOTS) folder out for more images of the application in action and the explanation videos (`part1` and `part2`).

## Next Steps in the Future
On the outset of this project, our group was aiming to implement further additional features and functionality than what was achieved in the end, however significant progress was made in implementing the foundational functionality required for the application, namely the seperation of messages in channels and groups, and the realtime chat updates. If the group had more time than the limited windows available, we would hope to implement a number of extra features to improve the application's capabilities. A number of this improvements include:
- Auido feedback for actions when receiving messages
- Implementing a News API that sends through the latest headline every 'x' minutes into the messaging feed
- Automated messages (similar to News API; a bot that would display automated messages at given increments)
- Implement testing for all components (unsuccessfully implemented, removed due to not functioning correctly with firebase)
- Custom user roles
- Video embedding
- Audio messaging
- Content filters


## Group AA

Most of our communication took place via Discord, where we regularly updated each other on the development of each of our sections of work. We often shared pictures or short videos sharing what functionality we were working on had had recently completed, and communicated requests to each other on what aspects of the application needed to be completed before moving onto the next area of development. A brief rundown of our roles is as follows:

- Nathan Soares (45382417)
> Front and Back-end development (Dashboard layout, Firebase Auth setup, Database Integration), 
- Michael Dimovski (45270708)
> Design, testing, reports, misc tasks
- Robert Kanepe (45364265)
> Database, design, misc tasks
- Bhavya Bhavsar (45560935)
> Front and Back-end development, misc tasks


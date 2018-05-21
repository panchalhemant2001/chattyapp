# Chatty App

Project Duration: 5 days

## Project Description

Chatty allows users to communicate with each other without having to register accounts.

### Functional Specifications

- Primarily Chatty App is a client-side SPA (single-page app) built with ReactJS.
- Based on the HTML and CSS provided.
- Contains a chat log displaying messages and notifications.
- Contains an input field to change your name and an input field to send a message.
- The client-side app communicates with a server via WebSockets for multi-user real-time updates.
- No persistent database is involved; the focus is on the client-side experience.


### Behavioural Specifications

- When any connected user sends a chat message, all connected users receive and display the message.
- When any connected user changes their name, all connected users are notified of the name change
- Notifications are styled differently from chat messages
- Header will display the count of connected users
- When the number of connected users changes, this count will be updated for all connected users
- Application is equipped with basic data validations included.


### Technical Specifications


This application is developed using React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

###### Stack:

- Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
- WebSockets using Node package ws on the server-side, and native WebSocket on client side ReactJS

###### React component guidelines:

- A single root component (e.g. App) should be responsible for the main application state, as well as communication with the WebSocket serv included.
- A message list component renders the chat log (chat messages and system notifications)
- A chat bar component provides an input field for changing your username and an input field for sending messages. These input fields do not need to be React-style "controlled inputs", although they can be.
- A TotalUsersOnline component displays the number of online users on Chatty App.


###### Client websocket behaviour:

- The socket connection as soon as the App component is mounted
the connection stays open until the client closes the page (or otherwise disconnects).
- Sends chat messages and (name change) notifications initiated by the current user.
- Handles broadcast messages (chat, notifications, user count) from the server and may alter state accordingly

###### Websocket server specs:

- The Chatty client app and Chatty websocket server are separate Node apps each with their own package.json.
-- It's a simple server using express and ws
-- The server should .send and receive JSON-encod- Sd messages

###### When a client sends a chat message:
- The server should determine what to do based on the message's type property.
- A message to send back in response with a corresponding type and a generated unique id (e.g. a UUID)
- When a client connects or disconnects, the server should broadcast the current user count to all connected clients.
- The server assigns and keep track of user colours.

## Dependencies

- react
- react-dom
- Webpack
- [babel-loader](https://github.com/babel/babel-loader)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- Express
- Node JS
- UUID
- WS (Web Sockets)
- babel-core
- babel-preset-es2015
- babel-preset-react
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader

## Getting Started

Open two terminal windows. One for the client App and other for the Server App.

### Start Server App

- From within a client app directory, write following commands that installs the dependencies and starts the server application which listen to PORT 3001.

```
cd chatty_server
npm install --save
npm start
```

### Start Client App:

From within a client app directory, write the following commands that install the dependencies and stats the client application which can be opened in a browser using http://localhost:3000.


```
npm install --save
npm start
open http://localhost:3000
```
### Linting

This project includes React ESLint configuration.

```
npm run lint
```

### Final Product


[Step 1: Start Chat Server](docs/1_start_chat_server.png)

[Step 2: Start Chat Client](docs/2_start_chat_client.png)

[Step 3: Start Chat App in the Browser](docs/3_starting_chat_app_in_browser.png)

[Step 4: Change User Name](docs/4_change_user_name.png)

[Step 5: User Count Status](docs/5_user_count_status.png)

[Step 6: Sending Messages](docs/6_sending_message.png)

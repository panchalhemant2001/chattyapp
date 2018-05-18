//server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');


//set the port to 3001
const PORT = 3001;

//Create a new express Server
const server = express()
  //Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

//Create the WebSockets Server
const wss = new SocketServer({server});

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const msg = JSON.parse(message);
    console.log('%s said %s',msg.username, msg.content);
    msg.id = uuidv1();    //Generating unique ID for the message
    //ws.send(JSON.stringify(msg));


    //broadcasting the message to all connected clients
    wss.clients.forEach(function each(client) {
      //console.log(JSON.stringify(msg));
      //if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg));
      //}
    });
  });



  //Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

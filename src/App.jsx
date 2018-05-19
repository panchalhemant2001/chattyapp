import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import TotalUsersOnline from './TotalUsersOnline.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    //Creating a client web socket that listens to the chat server on port number 3001
    this.socket = '';

    this.state= {
        connections: 0,
        color: '',
        loading: true,
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [],   //stores messages and notifications
    };
  }


  render() {

    const addNewMessage = (newMessage) => {
      //sending message typed by user to the socket server in string format
      this.socket.send(JSON.stringify(newMessage));
    }

    if(this.state.loading) {
      return (<h1>Loading....</h1>);
    } else {
      return (
          <div>
            <nav className='navbar'>
              <a href='/' className='navbar-brand'>Chatty</a>
              {/*
                <span className='user-status'>
                  {this.state.connections} Users Online
                </span>
              */}

              <TotalUsersOnline connections={ this.state.connections } />

            </nav>
            <main className='messages'>
              {/* <Message /> */}
              {this.state.color}
              <MessageList messages={ this.state.messages } />
            </main>

            <ChatBar currentUser={this.state.currentUser}
              addNewMessage={addNewMessage}
            />

          </div>
        );
    }
  }

  componentDidMount() {
    setTimeout(
      () =>
        {
          this.setState({loading: false})
        },
      1000);

      console.log("componentDidMount <App />");

      //Initializing a client Websocket and connecting it to the chat server on port 3001 (localhost)
      this.socket = new WebSocket('ws://localhost:3001');


      this.socket.onopen = (event) => {
        console.log('Connected to Server');
        this.socket.send(JSON.stringify({type: 'connectionDetails'}));
      };


      this.socket.onerror = (event) => {
        console.log('Error');
      }

      this.socket.onmessage = (event) => {
        console.log(event);
        const data = JSON.parse(event.data);
        console.log(data.totalConnections);

        if(data.type == 'connectionDetails') {
          //code to update number of _connections
          //alert(data.totalConnections);
          this.setState({connections: data.totalConnections});
          if(this.state.color == '') {
            this.setState({color: data.color});
          }
          //this.state.connections = data.totalConnections;
          //document.getElementById('connDetails').innerHtml(data.totalConnections);

        } else {
          //code to handle incoming message / notifications
          const incomingMsgOrNotification = JSON.parse(event.data);
          const oldMessages = this.state.messages;
          const updatedMessages = [incomingMsgOrNotification, ...oldMessages];
          this.setState({currentUser: {name: incomingMsgOrNotification.username}});
          this.setState({messages: updatedMessages});
        }
      }

  }
}

export default App;

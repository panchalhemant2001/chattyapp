import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    //Creating a client web socket that listens to the chat server on port number 3001
    this.socket = '';

    this.state= {
        loading: true,
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
    };
  }


  render() {

    const addNewMessage = (newMessage) => {
      //sending message typed by user to the socket server in string format
      this.socket.send(JSON.stringify(newMessage));

      this.socket.onmessage = (event) => {
        console.log(event);

        //code to handle incoming message
        const incomingMessage = JSON.parse(event.data);
        const oldMessages = this.state.messages;



        const updatedMessages = [incomingMessage, ...oldMessages];

        this.setState({messages: updatedMessages});
        this.setState({currentUser: {name: incomingMessage.username}});
      }

    }

    if(this.state.loading) {
      return (<h1>Loading....</h1>);
    } else {
      return (
          <div>
            <nav className='navbar'>
              <a href='/' className='navbar-brand'>Chatty</a>
            </nav>
            <main className='messages'>
              {/* <Message /> */}
              <MessageList messages={this.state.messages}/>
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

      /*
      setTimeout(
        () => {
          console.log("Simulating incoming message");
          const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
          const messages = this.state.messages.concat(newMessage);
          this.setState({messages: messages});
        }, 3000
      );
      */

      //Initializing a client Websocket and connecting it to the chat server on port 3001 (localhost)
      this.socket = new WebSocket('ws://localhost:3001');


      this.socket.onopen = (event) => {
        console.log('Connected to Server');
      };

      this.socket.onerror = (event) => {
        console.log('Error');
      }
  }
}

export default App;

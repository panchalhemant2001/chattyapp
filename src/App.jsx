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
        lastMessageId: 3,
        loading: true,
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            id: 1,
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            id: 2,
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
    };
    /*
    this.state = {
      messages: [
        {
          type: "incomingMessage",
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        },
        {
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom"
        },
        {
          type: "incomingMessage",
          content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
        },
        {
          type: "incomingMessage",
          content: "...",
          username: "nomnom"
        },
        {
          type: "incomingMessage",
          content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2"
        },
        {
          type: "incomingMessage",
          content: "This isn't funny. You're not funny",
          username: "nomnom"
        },
        {
          type: "incomingNotification",
          content: "Anonymous2 changed their name to NotFunny",
        }
      ]
    };
    */
  }


  render() {

    const addNewMessage = (newMessage) => {
      const oldMessages = this.state.messages;
      const lastMessageId = this.state.lastMessageId + 1;

      newMessage.id =lastMessageId;
      const updatedMessages = [...oldMessages, newMessage];

      this.setState({lastMessageId: lastMessageId, messages: updatedMessages});
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
      setTimeout(
        () => {
          console.log("Simulating incoming message");
          const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
          const messages = this.state.messages.concat(newMessage);
          this.setState({messages: messages});
        }, 3000
      );


      //Initializing a client Websocket and connecting it to the chat server on port 3001 (localhost)
      this.socket = new WebSocket('ws://localhost:3001')
      this.socket.onopen = (event) => {
        console.log('Connected to Server');
      };
  }
}

export default App;

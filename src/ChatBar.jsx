import React, {Component} from 'react';

export default class ChatBar extends React.Component {
  render() {
    const username = this.props.currentUser.name;

    const handleOnKeyPress = (event) => {
      if(event.key === "Enter") {
        //alert("Enter key is pressed");
        const id = 0; //new message so id is unknown so it is 0
        const content = event.target.value;
        const addNewMessage = this.props.addNewMessage;
        addNewMessage({id: id, username: username, content: content});

        event.target.value='';
        event.target.focus();
      }
    }

    return (
      <footer className='chatbar'>
        <input className='chatbar-username' placeholder='Your Name (Optional)' defaultValue={username}/>
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyPress={handleOnKeyPress} />
      </footer>
    );
  }
}

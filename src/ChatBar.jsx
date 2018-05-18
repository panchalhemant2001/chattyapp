import React, {Component} from 'react';

export default class ChatBar extends React.Component {
  render() {
    let username = this.props.currentUser.name;

    const handleOnKeyPress = (event) => {
      if(event.key === "Enter") {
        //alert("Enter key is pressed");
        const content = event.target.value;
        const addNewMessage = this.props.addNewMessage;

        if(content.trim() === '') {
          alert("Empty message");
        } else {
          addNewMessage({username: username, content: content});
          //addNewMessage({id: id, username: username, content: content});
          event.target.value='';
        }

        event.target.focus();
      }
    }


    const handleOnChange = (event) => {
      username = event.target.value;
    }

    return (
      <footer className='chatbar'>
        <input className='chatbar-username' placeholder='Your Name (Optional)' defaultValue={username} onChange={handleOnChange} />
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyPress={handleOnKeyPress} />
      </footer>
    );
  }
}

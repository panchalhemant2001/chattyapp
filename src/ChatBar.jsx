import React, {Component} from 'react';

export default class ChatBar extends React.Component {
  render() {
    let username = this.props.currentUser.name;
    let oldUsername = username; //document.getElementById('uname').value;


    const handleOnKeyPress = (event) => {
      if(event.key === "Enter") {
        switch(event.target.name) {
          case 'message':
            let content = event.target.value;
            let addNewMessage = this.props.addNewMessage;
            username = document.getElementById('uname').value;
            if(content.trim() === '') {
              alert("Empty message");
            } else {
              addNewMessage({type: "postMessage", username: username, content: content});
              //addNewMessage({id: id, username: username, content: content});
              event.target.value='';
            }
            event.target.focus();
            break;
          case 'usrname':
            if(event.target.value.trim() === '') {
              alert("Username cannot be empty!");
              event.target.value = username;
            } else {
              //alert("User name is changed");

              username = event.target.value;

              //incase if the user changes the user name which is different than the current user name
              if(oldUsername !== username) {
                //content and addNewMessage already declared in above case, so no need to use const/let
                let content = `*** ${oldUsername} *** changed their name to *** ${username} ***`;
                let addNewMessage = this.props.addNewMessage;
                addNewMessage({type: "postNotification", username: username, content: content});
              }
            }
            event.target.focus();
            break;
        }
      }
    }

    const handleOnFocus = (event) => {
      oldUsername = document.getElementById('uname').value;
    }

    const handleOnBlur = (event) => {
      if(oldUsername !== event.target.value) {
        //alert("You must press ENTER to change the user name");
        event.target.value = oldUsername;
      }
      //oldUsername = '';
      //event.target.focus();
    }

    return (
      <footer className='chatbar'>
        <input className='chatbar-username' name="usrname" id="uname" placeholder='Your Name (Optional)' defaultValue={username} onKeyPress={handleOnKeyPress} onFocus={handleOnFocus} onBlur={handleOnBlur} />
        <input className='chatbar-message' name="message" placeholder='Type a message and hit ENTER' onKeyPress={handleOnKeyPress} />
      </footer>
    );
  }
}

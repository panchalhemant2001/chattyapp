import React, {Component} from 'react';

export default class Message extends React.Component {
  render() {
    const msgId = this.props.id; //for later use
    const msgType = this.props.type;  //type incomingMessage or incomingNotification


    switch(msgType) {
      case 'incomingMessage':
        return (
          <div className='message'>
              <span className='message-username'>{this.props.username}</span>
              <span className='message-content'>{this.props.content}</span>
          </div>
        );
        break;
      case 'incomingNotification':
        return (
          <div className='message'>
              <span className='message-username'></span>
              <span className='message-content'>{this.props.content}</span>
          </div>
        );
        break;
    }


  }
}

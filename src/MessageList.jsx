import React, {Component} from 'react';

export default class MessageList extends React.Component {
  render() {
      const messages = this.props.messages.map(
        (message) => <div className='message' key={message.id}>
            <span className='message-username'>{message.username}</span>
            <span className='message-content'>{message.content}</span>
          </div>
      );

      return (
        <div>
          {messages}
        </div>
      );
  }
}

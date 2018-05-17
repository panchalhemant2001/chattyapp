import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends React.Component {
  render() {
      const messages = this.props.messages.map(
        (message) => <Message
                        key={message.id}
                        id={message.id}
                        username={message.username}
                        content={message.content}
                      />
      );

      return (
        <div>
          {messages}
        </div>
      );
  }
}

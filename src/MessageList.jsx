import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends React.Component {
  render() {
      const messages = this.props.messages.map(
        (message) => <Message
                        key={message.id}
                        id={message.id}
                        type={message.type}
                        username={message.username}
                        content={message.content}
                        color={message.color}
                      />
      );

      return (
        <div>
          {messages}
        </div>
      );
  }
}

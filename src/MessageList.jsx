import React, { Component } from 'react';
import Messages from './Messages.jsx';

class MessageList extends Component {
  render() {
    const messageContent = this.props.messages.map(message => {
      return (
        <Messages
          key={message.id}
          type={message.type}
          content={message.content}
          username={message.username}
        />
      );
    });
    return <div className="messages">{messageContent}</div>;
  }
}
export default MessageList;

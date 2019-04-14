import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.state = {
      currentUser: { name: null },
      messages: [],
      onlineUsers: null
    };
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    this.socket.onopen = event => {
      console.log('Connected to web socket.');
    };
    // Setting new states upon receiving messages from the socket server
    this.socket.onmessage = event => {
      const receivedMessage = JSON.parse(event.data);

      if (Number.isInteger(receivedMessage)) {
        const onlineUsers = receivedMessage;
        this.setState({ onlineUsers });
      } else {
        const oldMessages = this.state.messages;
        const newMessages = [...oldMessages, receivedMessage];
        switch (receivedMessage.type) {
          case 'incomingMessage':
            this.setState({ messages: newMessages });
            break;
          case 'incomingNotification':
            this.setState({ messages: newMessages });
            break;
          default:
            throw new Error('Unknown event type ' + clientMessage.type);
        }
      }
      document.getElementById('scrollToMe').scrollIntoView();
    };
  }

  addMessage(username, content) {
    let currentUser = this.state.currentUser.name;

    // Initial state of currentUser is a null name. Sets local variable for next conditional statement.
    if (currentUser === null) {
      currentUser = 'Anonymous';
    }

    // Sends notification if different currentUser than in this.state.
    if (currentUser !== username) {
      const notification = {
        type: 'postNotification',
        content: `${currentUser} has changed their name to ${username}.`
      };
      this.socket.send(JSON.stringify(notification));

      // User's message
      const chatData = {
        type: 'postMessage',
        username: username,
        content: content
      };
      this.socket.send(JSON.stringify(chatData));
      this.setState({ currentUser: { name: username } });
    } else {
      // User's message
      const chatData = {
        type: 'postMessage',
        username: username,
        content: content
      };
      this.socket.send(JSON.stringify(chatData));
    }
  }

  render() {
    return (
      <main>
        <nav className="navbar">
          <img src="/assets/alligator.png" className="logo" />
          <a href="/" className="navbar-brand">
            tinyChatr
          </a>
          <div className="navbar-users">
            Users Online: {this.state.onlineUsers} 
          </div>
        </nav>
        <div className="messages">
          <MessageList messages={this.state.messages} />
          <div id="scrollToMe" />
          <ChatBar
            currentUser={this.state.currentUser.name}
            chatData={this.addMessage}
          />
        </div>
      </main>
    );
  }
}
export default App;

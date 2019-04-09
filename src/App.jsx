import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.state = {
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket.onopen = function(event) {
      console.log('Connected to web socket.');
    };

    this.socket.onmessage = event => {
      console.log('RECEIVING FROM SERVER', JSON.parse(event.data));
      const receivedMessage = JSON.parse(event.data);

      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, receivedMessage];

      if (event.data.username !== this.state.currentUser.name) {
        const newUser = { name: receivedMessage.username };
        this.setState({ currentUser: newUser, messages: newMessages });
      } else {
        this.setState({ messages: newMessages });
      }
    };
  }

  addMessage(username, content) {
    const newData = {
      username: username,
      content: content
    };

    console.log('Sending:', JSON.stringify(newData));
    this.socket.send(JSON.stringify(newData));
  }

  render() {
    console.log('RENDERING <App />');
    console.log('Returning New messages', this.state);
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          chatData={this.addMessage}
        />
      </div>
    );
  }
}
export default App;

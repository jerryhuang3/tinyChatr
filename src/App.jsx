import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        { 
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?'
        },
        {
          id: 2,
          username: 'Anonymous',
          content:
            'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };
  }

  render() {
    console.log("RENDERING APP", this);
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;

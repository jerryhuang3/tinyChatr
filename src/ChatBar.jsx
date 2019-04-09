import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.submitMessage = this.submitMessage.bind(this);
  }

  handleInput(event) {}

  submitMessage(event) {
    if (event.keyCode === 13) {
      const content = event.target.value;
      const username = this.refs.username.value;
      this.props.chatData(username, content);
      event.target.value = '';
    }
  }

  render() {
    console.log('RENDERING <ChatBar />');
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          ref="username"
          defaultValue={this.props.currentUser}
          onChange={this.handleInput}
          placeholder="Your Name (Optional)"
        />

        <input
          className="chatbar-message"
          name="message"
          placeholder="Type a message and hit ENTER"
          onChange={this.handleInput}
          onKeyDown={this.submitMessage}
        />

        <div />
      </footer>
    );
  }
}

export default ChatBar;

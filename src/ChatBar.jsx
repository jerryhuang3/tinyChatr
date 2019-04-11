import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.submitMessage = this.submitMessage.bind(this);
  }

  submitMessage(event) {
    if (event.keyCode === 13) {
      const content = event.target.value;
      let username = this.refs.username.value;

      // Set default username to Anonymous if there is no input in the username
      if (username === '') {
        username = 'Anonymous';
      }

      this.props.chatData(username, content);
      event.target.value = '';
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          ref="username"
          defaultValue={this.props.currentUser}
          placeholder="Your Name (Optional)"
        />

        <input
          className="chatbar-message"
          name="message"
          placeholder="Type a message and hit ENTER"
          onKeyDown={this.submitMessage}
        />
      </footer>
    );
  }
}

export default ChatBar;

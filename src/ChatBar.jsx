import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.submitMessage = this.submitMessage.bind(this);
  }



  submitMessage(event) {
    if (event.keyCode === 13) {
        console.log(event.target.value);
      this.props.sendData(event.target.value);
    event.target.value = '';
    }
  }

  render() {
    console.log('RENDERING <ChatBar />');
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          name="username"
          defaultValue={this.props.currentUser}
          placeholder="Your Name (Optional)"
          onChange={this.handleInput}
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

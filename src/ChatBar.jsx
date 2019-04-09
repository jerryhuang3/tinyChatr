import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  handleInput(event) {
    console.log('handleInput', [event.target.name]);
    this.setState({ [event.target.name]: event.target.value });
  }

  submitMessage(event) {
    if (event.keyCode === 13) {
      this.props.sendData(this.state);
      this.setState({ message: '' });
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
          value={this.state.message}
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

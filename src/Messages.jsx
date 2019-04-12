import React, { Component } from 'react';
import moment from 'moment';

class Messages extends Component {
  render() {
    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/gi;

    const newContent = this.props.content.replace(regex, '');

    const imageURL = this.props.content.match(regex);

    return this.props.username ? (
      <div className="message">
        <span className="message-time">
          {moment(this.props.time).format('h:mm a')}
        </span>
        <span className="message-username" style={{ color: this.props.color }}>
          {this.props.username}:
        </span>
        <p className="message-content">{newContent}</p>
        <span className="message-content">
          <img className="message-img" src={imageURL} />
        </span>
      </div>
    ) : (
      <div className="message system">{this.props.content}</div>
    );
  }
}
export default Messages;

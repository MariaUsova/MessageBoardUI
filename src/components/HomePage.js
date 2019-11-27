import React from 'react';
import { Link } from 'react-router-dom';

import userService from '../services/user-service';
import messageService from '../services/message-service';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      users: [],
      messages: [],
      error: ''
    };

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(messageId) {
    messageService.remove(messageId).then(
      () => {
        messageService.getAll().then(messages => this.setState({ messages }));
      },
      error => this.setState({ error })
    );
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user')),
      users: { loading: true },
      messages: { loading: true }
    });
    userService.getAll().then(users => this.setState({ users }));
    messageService.getAll().then(messages => this.setState({ messages }));
  }

  render() {
    const { user, users, messages, error } = this.state;

    const getUsernameById = userId => {
      if (!users.length) {
        return '';
      }

      const user = users.find(u => u.id === userId);
      if (!user || !user.username) {
        return '';
      }

      return user.username;
    };

    return (
      <div className="col-md-12">
        <h1>
          Hi <b>{user.username}</b>!
        </h1>

        <p>
          <Link to="/login">Logout</Link>
        </p>

        <p>
          <Link to="/add">Add message</Link>
        </p>

        {users.loading && <em>Loading users...</em>}
        {messages.loading && <em>Loading messages...</em>}

        {users.length && (
          <div>
            <h2>All Users:</h2>
            <ul className="list-inline">
              {users.map((user, index) => (
                <li key={user.id}>
                  <span className="label label-info">{user.username}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && <div className={'alert alert-danger'}>{error}</div>}

        {messages.length && (
          <div>
            <h2>All Messages:</h2>
            <ul className="list-group">
              {messages.map((message, index) => (
                <li className="list-group-item" key={message.id}>
                  <span className="label label-info">
                    By: {getUsernameById(message.userId)}
                  </span>
                  &nbsp;
                  <span className="label label-success">
                    Created At: {message.createdAt}
                  </span>
                  &nbsp;
                  <span className="label label-default">
                    Updated At: {message.updatedAt}
                  </span>
                  <p>{message.content}</p>
                  {user.id === message.userId && (
                    <div>
                      <Link to={`/edit/${message.id}`}>
                        <button type="button" className="btn btn-info btn-xs">
                          Edit
                        </button>
                      </Link>
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-danger btn-xs"
                        onClick={() => this.handleRemove(message.id)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default HomePage;

import React from 'react';
import { Link } from 'react-router-dom';

import messageService from '../services/message-service';

class EditMessagePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageId: '',
      message: '',
      submitted: false,
      loading: false,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    this.setState({
      messageId: params.messageId,
      loading: true
    });

    messageService.get(params.messageId).then(
      msg => this.setState({ message: msg.content, loading: false }),
      error => this.setState({ error, loading: false })
    );
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { messageId, message } = this.state;

    // stop here if form is invalid
    if (!message.trim()) {
      return;
    }

    this.setState({ loading: true });
    messageService.update(messageId, message).then(
      msg => {
        const { from } = this.props.location.state || {
          from: { pathname: '/' }
        };
        this.props.history.push(from);
      },
      error => this.setState({ error, loading: false })
    );
  }

  render() {
    const { message, submitted, loading, error } = this.state;
    return (
      <div className="col-md-12">
        <h1>Edit message</h1>

        <p>
          <Link to="/">Back to Home Page</Link>
        </p>

        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              'form-group' + (submitted && !message ? ' has-error' : '')
            }
          >
            <label htmlFor="message">Message</label>
            <textarea
              type="text"
              className="form-control"
              name="message"
              value={message}
              onChange={this.handleChange}
            />
            {submitted && !message.trim() && (
              <div className="help-block">Message is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary" disabled={loading}>
              Update
            </button>
            {loading && (
              <img
                alt="loading"
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
            )}
          </div>
          {error && <div className={'alert alert-danger'}>{error}</div>}
        </form>
      </div>
    );
  }
}

export default EditMessagePage;

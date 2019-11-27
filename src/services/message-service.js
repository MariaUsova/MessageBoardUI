import authHeader from '../helpers/auth-header';

export const messageService = {
  getAll,
  get,
  create,
  remove,
  update
};

const API_HOST = process.env.REACT_APP_API_HOST;

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${API_HOST}/message`, requestOptions).then(handleResponse);
}

function create(message) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify({ message })
  };

  return fetch(`${API_HOST}/message`, requestOptions).then(handleResponse);
}

function get(messageId) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    }
  };

  return fetch(`${API_HOST}/message/${messageId}`, requestOptions).then(
    handleResponse
  );
}

function remove(messageId) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    }
  };

  return fetch(`${API_HOST}/message/${messageId}`, requestOptions).then(
    handleResponse
  );
}

function update(messageId, message) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify({ message })
  };

  return fetch(`${API_HOST}/message/${messageId}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export default messageService;

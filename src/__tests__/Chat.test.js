import React from 'react';
import ReactDOM from 'react-dom';

import Chat from '../views/Chat';
import { useAuth0 } from '../react-auth0-spa.js';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
configure({ adapter: new Adapter() });

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746'
};

jest.mock('../react-auth0-spa.js');

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user,
    logout: jest.fn(),
    loginWithRedirect: jest.fn()
  });
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;

  jest.clearAllMocks()
});

describe('Chat', () => {
  it('Renders button to send message', () => {
    let originalError = console.error;
    console.error = jest.fn();

    act(() => {
      ReactDOM.render(<Chat />, container);
    });
    const button = container.querySelector('button');

    expect(button.textContent).toBe('Send Message');
    console.error = originalError;
  });

  it('Provides welcome message', () => {
    let originalError = console.error;
    console.error = jest.fn();

    act(() => {
        ReactDOM.render(<Chat />, container);
      });

      const header = container.querySelector('h1');
      expect(header.textContent).toBe('Welcome!');
      console.error = originalError;
  })
});

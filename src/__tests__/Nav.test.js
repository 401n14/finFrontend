import React from 'react';
import Nav from '../components/NavBar';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { useAuth0 } from '../react-auth0-spa.js';
import renderer from 'react-test-renderer';
import { BrowserRouter } from "react-router-dom";

configure({adapter:new Adapter()});

const user = {
    email: 'johndoe@me.com',
    email_verified: true,
    sub: 'google-oauth2|2147627834623744883746',
  };

  jest.mock('../react-auth0-spa.js');

describe('Nav Tests', () => {
    beforeEach(() => {
      // Mock the Auth0 hook and make it return a logged in state
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });
    });
    it('Renders with required props', async () => {
      const wrapper = mount(
          <BrowserRouter>
      <Nav />
          </BrowserRouter>
      );
      
      expect(wrapper).toBeTruthy();
    });
    it('renders correctly', () => {
        const page = renderer.create(          <BrowserRouter>
            <Nav />
                </BrowserRouter>).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('Logout Button', async () => {
        const wrapper = mount(
            <BrowserRouter>
        <Nav />
            </BrowserRouter>
        );
        let logout = wrapper.find('#qsLogoutBtn').at(5).text();
        expect(logout).toEqual('Log out');
      });
  });
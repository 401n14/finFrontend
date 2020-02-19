import React from 'react';
import Nav from '../components/NavBar';
import {configure, mount, shallow} from 'enzyme';
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

  let auth = true;

const  mockLogin=()=>{
    auth=true
  }
const  mockLogout=()=>{
    auth=false
  }

describe('Nav Tests', () => {
    beforeEach(() => {
        auth = true;
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: auth,
            user,
            logout: mockLogout,
            loginWithRedirect: mockLogin,
        });
    });
    
    it('Renders with required props', async () => {
        const wrapper = shallow(
          <BrowserRouter>
      <Nav>
      </Nav>
          </BrowserRouter>
      );
      
      expect(wrapper).toBeTruthy();
    });
    xit('renders correctly, Snapshot', () => {
        const page = renderer.create(          <BrowserRouter>
                <Nav>
                </Nav>
                </BrowserRouter>).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('Logout Button', async () => {
        const wrapper = mount(
            <BrowserRouter>
            <Nav>
            </Nav>
            </BrowserRouter>
        );
        let logout = wrapper.find('#qsLogoutBtn').at(5).text();
        expect(logout).toEqual('Log out');
      });
      it('Logout Button 1 works', () => {
        let wrapper = mount(
            <BrowserRouter>
            <Nav>
            </Nav>
            </BrowserRouter>)
        let logoutBtn = wrapper.find('#qsLogoutBtn').at(0);
        logoutBtn.simulate('click');
        expect(auth).toBeFalsy();
});
      it('Logout Button 2 works', () => {
        let wrapper = mount(
            <BrowserRouter>
            <Nav>
            </Nav>
            </BrowserRouter>)
        let logoutBtn = wrapper.find('#qsLogoutBtn').at(2);
        logoutBtn.simulate('click');
        expect(auth).toBeFalsy();
});
  });
  describe('If User is not logged in', () => {
      beforeEach(() => {
        auth = false;
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: auth,
            loginWithRedirect: mockLogin,
            logout: mockLogout,
        });
    });
    it('Login Button 1', () => {
            let wrapper = mount(
                <BrowserRouter>
                <Nav>
                </Nav>
                </BrowserRouter>)
            let loginBtn = wrapper.find('#qsLoginBtn').at(0);
            expect(auth).toBeFalsy();
            loginBtn.simulate('click')
            expect(auth).toBeTruthy();
    });
    it('Login Button 2', () => {
            let wrapper = mount(
                <BrowserRouter>
                <Nav>
                </Nav>
                </BrowserRouter>)
            let loginBtn = wrapper.find('#qsLoginBtn').at(2);
            expect(auth).toBeFalsy();
            loginBtn.simulate('click')
            expect(auth).toBeTruthy();
    });
});
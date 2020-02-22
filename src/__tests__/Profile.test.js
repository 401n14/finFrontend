import React from 'react';
import Profile from '../views/Profile';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { useAuth0 } from '../react-auth0-spa.js';


configure({adapter:new Adapter()});

const user = {
    email: 'johndoe@me.com',
    email_verified: true,
    sub: 'google-oauth2|2147627834623744883746',
  };

  jest.mock('../react-auth0-spa.js');



describe('Snapshot Test', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
        });
    });
    it('renders correctly, Snapshot', () => {
        const page = renderer.create(<Profile />).toJSON();
        expect(page).toMatchSnapshot();
    });
});
describe('Renders without a user', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
            loading: jest.fn(),
        });
    });
    it('renders loading page', () => {
        let wrapper = shallow(<Profile />)
        expect(wrapper.text()).toEqual('<Loading />');

    });
});
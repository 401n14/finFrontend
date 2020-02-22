import React from 'react';
import Home from '../views/Home';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { useAuth0 } from "../react-auth0-spa";
import { BrowserRouter } from "react-router-dom";




configure({adapter:new Adapter()});
jest.mock('../react-auth0-spa.js');
let auth = true;
const  mockLogin=()=>{
    auth=true
  }


describe('Home page Test', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: auth,
            loginWithRedirect: mockLogin,
        });
    });
    it('renders correctly, Snapshot', () => {
        const page = renderer.create(<BrowserRouter><Home /></BrowserRouter>).toJSON();
        expect(page).toMatchSnapshot();

    });
});


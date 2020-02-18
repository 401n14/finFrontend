import React from 'react';
import PrivateRoute from '../components/PrivateRoute';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { BrowserRouter } from "react-router-dom";
import { useAuth0 } from '../react-auth0-spa.js';

configure({adapter:new Adapter()});

jest.mock('../react-auth0-spa.js');

function testComp(){
    return (
        <div>
            Test
        </div>
    )
}
describe('Loading Tests', () => {
    const wrapper = shallow(
<PrivateRoute />
    );
    it('Exists on Render', () => {
        expect(wrapper).toBeTruthy();
    });
});
describe('Snapshot Test', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            loginWithRedirect: jest.fn(),
        });
    });
    it('renders correctly logged in, Snapshot', () => {
        const page = renderer.create(
        <BrowserRouter>
        <PrivateRoute 
        path="/" exact component={testComp}
        />
        </BrowserRouter>
        ).toJSON();
        expect(page).toMatchSnapshot();
    });
});

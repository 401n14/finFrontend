import React from 'react';
import App from '../App';

import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { BrowserRouter } from "react-router-dom";
import { useAuth0 } from '../react-auth0-spa.js';


configure({adapter:new Adapter()});

jest.mock('../react-auth0-spa.js');

describe('Snapshot Test', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            loading: false
        });
    });
    it('renders correctly logged in, Snapshot', () => {
        const page = renderer.create(
        <BrowserRouter>
        <App />
        </BrowserRouter>
        ).toJSON();
        expect(page).toMatchSnapshot();
    });
});
describe('Works when loading', () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            loading: true
        });
    });
    it('renders correctly', () => {
            let wrapper = shallow(<App />)
            expect(wrapper.text()).toEqual('<Loading />');
    });
});
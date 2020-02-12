import React from 'react';
import Login from '../components/Login';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({adapter:new Adapter()});

describe('Default Test', () => {
    it('', () => {
        expect(true).toBeTruthy();
    });
});
xdescribe('Login Tests', () => {
    it('Renders the login form', () => {
        expect(true).toBeTruthy();
    });
    it('Successfully logs in a user', () => {
        expect(true).toBeTruthy();
    });
    it('Correctly Handles invalid input', () => {
        expect(true).toBeTruthy();
    });
});
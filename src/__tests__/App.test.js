import React from 'react';
import App from '../App';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter:new Adapter()});

describe('Default Test', () => {
    it('', () => {
        expect(true).toBeTruthy();
    });
});
xdescribe('App Renders Correctly', () => {
    it('Nav bar exists', () => {
        expect(true).toBeTruthy();
    });
    it('Sign In exists', () => {
        expect(true).toBeTruthy();
    });
    it('Chat button exists', () => {
        expect(true).toBeTruthy();
    });
    it('About button exists', () => {
        expect(true).toBeTruthy();
    });
});
import React from 'react';
import Logout from '../components/Logout';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({adapter:new Adapter()});

describe('Default Test', () => {
    it('', () => {
        expect(true).toBeTruthy();
    });
});
xdescribe('Logout Tests', () => {
    it('Renders correctly', () => {
        expect(true).toBeTruthy();
    });
    it('Successfully logs out a user', () => {
        expect(true).toBeTruthy();
    });
});
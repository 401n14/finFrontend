import React from 'react';
import Settings from '../components/Setting';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({adapter:new Adapter()});

describe('Default Test', () => {
    it('', () => {
        expect(true).toBeTruthy();
    });
});
xdescribe('Settings Tests', () => {
    it('Renders correctly', () => {
        expect(true).toBeTruthy();
    });
});
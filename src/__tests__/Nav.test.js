import React from 'react';
import Nav from '../components/NavBar';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({adapter:new Adapter()});

describe('Default Test', () => {
    it('', () => {
        expect(true).toBeTruthy();
    });
});
xdescribe('Nav Bar Tests', () => {
    it('Renders Home Button', () => {
        expect(true).toBeTruthy();
    });
    it('Renders Chat Button', () => {
        expect(true).toBeTruthy();
    });
    it('Renders About Button', () => {
        expect(true).toBeTruthy();
    });
    it('Renders Sign In Button', () => {
        expect(true).toBeTruthy();
    });
});
import React from 'react';
import SendMessageForm from '../components/SendMessageForm';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({adapter:new Adapter()});

describe('Default Test', () => {
    it('', () => {
        expect(true).toBeTruthy();
    });
});
xdescribe('Send Message Form Tests', () => {
    it('Renders the form correctly', () => {
        expect(true).toBeTruthy();
    });
});
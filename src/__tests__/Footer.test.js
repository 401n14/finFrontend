import React from 'react';
import Footer from '../components/Footer';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({adapter:new Adapter()});

describe('Snapshot Test', () => {
    it('renders correctly, Snapshot', () => {
        const page = renderer.create(<Footer />).toJSON();
        expect(page).toMatchSnapshot();
    });
});
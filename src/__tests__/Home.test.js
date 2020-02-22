import React from 'react';
import Home from '../views/Home';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';


configure({adapter:new Adapter()});

describe('Snapshot Test', () => {
    xit('renders correctly, Snapshot', () => {
        const page = renderer.create(<Home />).toJSON();
        expect(page).toMatchSnapshot();
    });
});


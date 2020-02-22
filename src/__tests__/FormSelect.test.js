import React from 'react';
import FormSelect from '../components/FormSelect';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({adapter:new Adapter()});

let options = {
    "Languages": [
      { "name": "English" },
      { "name": "Espanol"}
    ]
  }

describe('Snapshot Test', () => {
    it('renders correctly, Snapshot', () => {
        const page = renderer.create(<FormSelect 
            list={options.Languages}
             />).toJSON();
        expect(page).toMatchSnapshot();
    });
});

describe('Form Tests', () => {
    it('renders without a user & calls the Loading component', () => {
        let wrapper = mount(<FormSelect
            list={options.Languages}
            />)
        expect(wrapper.find('option').at(0).text()).toEqual(' -- Select Language -- ');
        expect(wrapper.find('option').at(1).text()).toEqual('English');
        expect(wrapper.find('option').at(2).text()).toEqual('Espanol');

    });
});
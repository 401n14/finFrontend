import React from 'react';
import Loading from '../components/Loading';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter:new Adapter()});

xdescribe('Default Test', () => {
    it('', () => {
        expect(true).toBeTruthy();
    });
});
describe('Loading Test', () => {
    const wrapper = shallow(
<Loading />
    );
    expect(wrapper).toBeTruthy();
});
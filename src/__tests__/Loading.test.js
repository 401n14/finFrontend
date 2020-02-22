import React from 'react';
import Loading from '../components/Loading';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter:new Adapter()});

describe('Loading page Test', () => {
    const wrapper = shallow(
<Loading />
    );
    it('', () => {
    expect(wrapper).toBeTruthy();
});

});
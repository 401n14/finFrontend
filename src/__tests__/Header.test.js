import React from 'react';
import Header from '../components/Header';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter:new Adapter()});

describe('Header Test', () => {
   let welcome = 'welcome'
    let activeUsers = 'Captain'
        it('renders with props', () => {
            const wrapper = shallow(
                <Header>
                    {welcome}
                    {activeUsers}
                </Header>
                    );
                expect(wrapper).toBeTruthy();
    });
});
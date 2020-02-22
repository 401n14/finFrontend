import React from 'react';
import ChatMessages from '../components/ChatMessages';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter:new Adapter()});

describe('Chat Message Test', () => {
    let timestamp = '12:53';
    let message = 'Hello';
    let user = 'Captain';
    let pic = 'Image';
    let groupMessage = [timestamp, message, user, pic]
    let none = '';
        it('renders with message information', () => {
            const wrapper = shallow(
                <ChatMessages>
                    {groupMessage}
                </ChatMessages>
                    );
                expect(wrapper).toBeTruthy();
    });

        it('renders without message information', () => {
            const wrapper = shallow(
                <ChatMessages>
                    {none}
                </ChatMessages>
                    );
                expect(wrapper).toBeTruthy();
    });
});
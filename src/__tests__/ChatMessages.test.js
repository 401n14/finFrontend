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
        it('renders', () => {
            const wrapper = shallow(
                <ChatMessages>
                    {timestamp}
                    {message}
                    {user}
                    {pic}
                </ChatMessages>
                    );
                expect(wrapper).toBeTruthy();
    });
});
import React from 'react';
import Chat from '../views/Chat';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { useAuth0 } from '../react-auth0-spa.js';
import FormSelect from "../components/FormSelect";
import Data from '../components/data/data';
import renderer from 'react-test-renderer';

configure({adapter:new Adapter()});

const user = {
    email: 'johndoe@me.com',
    email_verified: true,
    sub: 'google-oauth2|2147627834623744883746',
  };

  jest.mock('../react-auth0-spa.js');

describe('Chat Tests', () => {
    beforeEach(() => {
      // Mock the Auth0 hook and make it return a logged in state
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user
      });
    });
    it('Renders with required props', async () => {
      const wrapper = mount(<Chat />);
      expect(wrapper).toBeTruthy();
    });
    it('renders correctly', () => {
        const page = renderer.create(<Chat />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('changes state message on change', async () => {
      const wrapper = mount(<Chat />);
      let message = wrapper.find('input.chat-input');
      message.simulate('change', {target: {value: 'hello'}});

      expect(message.instance().value).toEqual('hello');
    });
    it('renders language selector', async () => {
      const wrapper = mount(<Chat
      />)
      let language = wrapper.find('select').first();
      language.simulate('change', {target: {value: 'English'}});
      expect(language.instance().value).toEqual('-- Select Language --');
    });
  });
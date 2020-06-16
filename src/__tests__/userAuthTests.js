import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, { Component } from 'react';
import App from '../App';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../App.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { Provider } from 'react-redux';
import store from '../store.js';

configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const wrapper = shallow(<App/>);
});

// console.log(wrapper.debug());

/*
*  This module tests the main component for the Test Vortex React web application
*  Author: Kyle McCain
*  Date: 12 August 2020
*/

// Import React dependencies
import React from 'react';

// Import Axios dependencies
import Axios from 'axios';
jest.mock('axios');

// Import Enzyme dependencies
import { shallow } from 'enzyme';

// Import component being tested
import App from './App';

// Test that the App component renders without crashing (No User Info)
test('App component renders without crashing (No User Info)', () => {
    shallow(<App/>, { disableLifecycleMethods: true});
});

// Test for mock Axios response with correct user account info
test('Correctly receives user info and updates state', () => {
    // Create correct user data format
    const adminUser = {
        username: 'kmccain',
        firstName: 'Kyle',
        lastName: 'McCain',
        permissionLevel: 'User'
    };

    // Resolve mock Axios call Promise with Admin user info
    Axios.get.mockResolvedValue({data: adminUser});

    // Create shallow render and test that state is updated with response
    const app = shallow(<App/>);
    return app.instance().componentDidMount().then(() => {
        // Test that user info state is updated
        expect(app.state()).toMatchObject(adminUser);
        // Test that flag for user data being requested is set to true
        expect(app.state('userDataRequested')).toEqual(true);
        // Test that error message is not changed
        expect(app.state('errorCode')).toBeNull();
    })
})

// Test for mock Axios response with authentication error from server
test('Handles authentication errors in user info Axios request', () => {
    // Declare test error message
    const errorMessage = 'User information was not found!';

    // Reject mock Axios call Promise with 401 error response
    Axios.get.mockRejectedValue({response: {status: 401, data: errorMessage}});

    // Create shallow render and test that state is updated with response
    const app = shallow(<App/>);
    return app.instance().componentDidMount().then(() => {
        // Test that state for user info is not updated
        expect(app.state()).toMatchObject({
            username: null,
            firstName: null,
            lastName: null,
            permissionLevel: null
        });
        // Test that flag for user data being requested is set to true
        expect(app.state('userDataRequested')).toEqual(true);
        // Test that error message is updated correctly
        expect(app.state('errorCode')).toEqual(401);
    })
})
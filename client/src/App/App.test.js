import React from 'react';
import Axios from 'axios';
import {shallow} from 'enzyme';
import App from './App';

jest.mock('axios');

test('App component renders without crashing (No User Info)', () => {
    shallow(<App/>, {disableLifecycleMethods: true});
});

test('Correctly receives user info and updates state', () => {
    const adminUser = {
        username: 'kmccain',
        firstName: 'Kyle',
        lastName: 'McCain',
        permissionLevel: 'User'
    };

    Axios.get.mockResolvedValue({data: adminUser});

    const app = shallow(<App/>);
    return app.instance().componentDidMount().then(() => {
        expect(app.state()).toMatchObject(adminUser);
        expect(app.state('userDataRequested')).toEqual(true);
        expect(app.state('errorCode')).toBeNull();
    });
});

test('Handles authentication errors in user info Axios request', () => {
    const errorMessage = 'User information was not found!';

    Axios.get.mockRejectedValue({response: {status: 401, data: errorMessage}});

    const app = shallow(<App/>);
    return app.instance().componentDidMount().then(() => {
        expect(app.state()).toMatchObject({
            username: null,
            firstName: null,
            lastName: null,
            permissionLevel: null
        });
        expect(app.state('userDataRequested')).toEqual(true);
        expect(app.state('errorCode')).toEqual(401);
    });
});
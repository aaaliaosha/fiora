import Store from '../store';
import socket from '../socket';

const dispatch = Store.dispatch;

const actions = {
    login: function (username, password) {
        return new Promise(resolve => {
            socket.post('/auth', { username, password }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'LoginSuccess',
                        user: response.data.user,
                    });
                    socket.setToken(response.data.token);
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },

    signup: function (username, password) {
        return new Promise(resolve => {
            socket.post('/user', { username, password }, response => {
                resolve(response);
            });
        });
    },

    reConnect: function (token) {
        socket.setToken(token);
        return new Promise(resolve => {
            socket.post('/auth/re', { }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'LoginSuccess',
                        user: response.data,
                    });
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },

    sendGroupMessage: function (linkmanId, content) {
        return new Promise(resolve => {
            socket.post('/groupMessage', { linkmanId, content }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'AddGroupMessage',
                        message: response.data,
                    });
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },

    addGroupMessage: function (message) {
        return new Promise(resolve => {
            dispatch({
                type: 'AddGroupMessage',
                message: message,
            });
            resolve(message);
        });
    },

    createGroup: function (name) {
        return new Promise(resolve => {
            socket.post('/group', { name: name }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'CreateGroup',
                        user: response.data,
                    });
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },
};

export default actions;
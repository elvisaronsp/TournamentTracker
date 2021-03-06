﻿import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router'; //Use # history instead of HTML5 history API
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducer';

import * as navActions from './actions/nav_actions';
import * as userActions from './actions/user_actions';

import authMiddleware from './middleware/auth_middleware';
import fetcherMiddleware from './middleware/fetcher_middleware';
import redirectMiddleware from './middleware/redirect_middleware';
import notificationsMiddleware from './middleware/notifications_middleware';

import App from './components/App';
import HomePageContainer from './components/HomePage';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';

import PlayerProfile from './components/users/PlayerProfile';
import UserProfileForm from './components/users/UserProfileForm';
import AccountForm from './components/users/AccountForm';

import ChallengesContainer from './components/challenges/ChallengesContainer';

import NotificationList from './components/notifications/NotificationList';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const loggerMiddleware = createLogger();



const store = createStore(
    reducer,
    applyMiddleware(routerMiddleware(hashHistory),
                    thunkMiddleware, //Lets us dispatch() functions
                    authMiddleware, //Makes sure any failed login actions exit from the app
                    
                    redirectMiddleware,
                    
                    notificationsMiddleware,
                    fetcherMiddleware,
                    loggerMiddleware) //Neat middleware that logs actions
);

userActions.initiateReceiveCurrentUser()(store.dispatch)
.then(() => {
    const history = syncHistoryWithStore(hashHistory, store);
    history.listen(location => store.dispatch(navActions.routerDidNavigate(location.pathname)));


    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/" component ={App}>
                    <Route path="/home" component={HomePageContainer}/>
                    <Route path="/account" component={AccountForm} />
                    <Route path="/challenges" component={ChallengesContainer} />
                    <Route path="/player/:playerId" component={PlayerProfile}/>
                    <Route path="/notifications/:playerId" component={NotificationList}/>
                </Route>
            </Router>
        </Provider>,
    document.getElementById('app')
    );
});


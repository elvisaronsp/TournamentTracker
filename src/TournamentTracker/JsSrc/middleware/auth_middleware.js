import * as userActions from '../actions/user_actions';
import {push} from 'react-router-redux';

export default store => next => action => {
    // if (action.type === userActions.LOGIN_FAILED){
    //     store.dispatch(push('/login'));
    // } else 
    if (action.type === userActions.RECEIVE_ACTIVE_USER_COMPLETE && !store.getState().activeUser.isLoggingIn){
        store.dispatch(push('/home'));
    // } else if ((!store.activeUser || !store.activeUser.user) 
    //             && action.type != userActions.RECEIVE_ACTIVE_USER 
    //             && action.type != userActions.REQUEST_LOGIN
    //             && action.type != userActions.REQUEST_REGISTER){ //We don't have a user, and they aren't logging in...they must be re-auth'd
    //     store.dispatch(push('/login'));
    } else if (action.type === userActions.LOGOUT_USER){
        store.dispatch(push('/login'));
    }
    return next(action); //This sends the action to the store after middleware is complete
};
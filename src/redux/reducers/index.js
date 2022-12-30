import { combineReducers } from 'redux';
import { postsReducer } from "./PostReducer";
//import { currentUserReducer } from "./UserReducer";
import { tokenReducer } from "./AuthReducer";
import { groupsReducer } from "./GroupReducer";
import { socketReducer } from './SocketReducer';

export const reducers = combineReducers({
    allPosts: postsReducer,
    token: tokenReducer,
    allGroups: groupsReducer,
    socket: socketReducer
    //currentUser: currentUserReducer
});
import { combineReducers } from 'redux';
import { postsReducer } from "./PostReducer";
//import { currentUserReducer } from "./UserReducer";
import { tokenReducer } from "./AuthReducer";
import { groupsReducer } from "./GroupReducer";
<<<<<<< HEAD
import { socketReducer } from './SocketReducer';
=======
import { socketsReducer } from "./SocketReducer";
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193

export const reducers = combineReducers({
    allPosts: postsReducer,
    token: tokenReducer,
    allGroups: groupsReducer,
<<<<<<< HEAD
    socket: socketReducer
=======
    socket: socketsReducer
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
    //currentUser: currentUserReducer
});
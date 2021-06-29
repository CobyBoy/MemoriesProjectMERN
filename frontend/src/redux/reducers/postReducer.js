import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../../constants/actionTypes';

const postReducer = (posts = [], action) => {
    console.log("recuer", posts, "action: ", action)
    switch (action.type) {
        case FETCH_ALL:
            console.log('reducer', action)
            return action.payload;
        case CREATE:
            console.log('reducer', action)
            return [...posts, action.payload];
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.filter(post => post._id !== action.payload);
        default:
            return posts;
    }
}
export default postReducer;
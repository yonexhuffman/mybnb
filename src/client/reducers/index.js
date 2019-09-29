import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import postsReducer from './postsReducer';
import postReducer from './postReducer';
import homepageReducer from './homepageReducer';
import citypageReducer from './citypageReducer';

export default combineReducers({
    form: formReducer,
    posts: postsReducer,
    post: postReducer,
    homepageData: homepageReducer , 
    citypageData: citypageReducer
});
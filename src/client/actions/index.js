import { landingPageAPI } from './../endpoints';
import webConfig from './../../../webConfig';
import axios from 'axios';
import querystring from 'querystring';

export const fetchPost = (postID) => async (dispatch, getState, api) => {

    const _query = {
        query: `{
            Blog(slug: "${postID}"){
                postTitle
                post
                imageURL
            }
        }`
    };

    await api.post(landingPageAPI, _query).then(response => {
        dispatch({
            type: 'FETCH_POST',
            payload: response.data
        })
    }).catch((err) => {
        console.log('error', err);
    })

};

export const fetchPosts = () => async (dispatch, getState, api) => {

    const _query = {
        query: `{
            allBlogs {
                postTitle
                shortdescription
                slug
                imageURL
              }
        }`
    };

    await api.post(landingPageAPI, _query).then(response => {
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        })
    }).catch((err) => {
        console.log('error', err);
    })

};

export const clearPostData = () => (dispatch) => {
    dispatch({
        type: 'CLEAR_POST_DATA'
    })
};

export const fetchToppageData = () => async (dispatch, getState, api) => {
    await axios.post('/gettoppagedata').then(response => {
        let toppageData = response.data
        dispatch({
            type: 'FETCH_LIST_TOPVISITCITIES',
            list_topvisitcities: toppageData.list_topvisitcities
        })

        dispatch({
            type: 'FETCH_POPULAR_PLACE_LIST',
            popular_place_list: toppageData.popular_place_list
        })

        dispatch({
            type: 'FETCH_BLOG_CATEGORY',
            blog_categories: toppageData.blog_categories
        })

        dispatch({
            type: 'FETCH_BLOG_LIST',
            blog_list: toppageData.blog_list
        })
    }).catch((err) => {
        // console.log('error', err);
    })
};

export const fetchCitypageData = (cityID) => async (dispatch, getState, api) => {
    let postdata = {
        cityID: cityID
    }
    await axios.post('/getcitypagedata', querystring.stringify(postdata)).then(response => {
        let pageData = response.data
        dispatch({
            type: 'FETCH_SELECTED_CITYDATA',
            selected_citydata: pageData.selected_citydata
        })    

        dispatch({
            type: 'FETCH_POPULAR_PLACE_LIST',
            popular_place_list: pageData.popular_place_list
        })

    }).catch((err) => {
        // console.log('error', err);
    })
};
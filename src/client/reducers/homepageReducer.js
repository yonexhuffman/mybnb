export default function (state = {
    homepageData: null
}, action) {
    switch (action.type) {
        case 'FETCH_LIST_TOPVISITCITIES':
            return { ...state, topVisitCities: action.list_topvisitcities || [] };
        case 'FETCH_POPULAR_PLACE_LIST':
            return { ...state, topPopularPlaceList: action.popular_place_list || [] };
        case 'FETCH_BLOG_CATEGORY':
            return { ...state, topBlogCategories: action.blog_categories || [] };
        case 'FETCH_BLOG_LIST':
            return { ...state, topBlogList: action.blog_list || [] };
        default:
            return state;
    }
}
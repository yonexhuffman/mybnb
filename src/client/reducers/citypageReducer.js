export default function (state = {
    citypageData: null
}, action) {
    switch (action.type) {
        case 'FETCH_SELECTED_CITYDATA':
            return { ...state, selected_citydata: action.selected_citydata || false };
        case 'FETCH_POPULAR_PLACE_LIST':
            return { ...state, topPopularPlaceList: action.popular_place_list || [] };
        default:
            return state;
    }
}
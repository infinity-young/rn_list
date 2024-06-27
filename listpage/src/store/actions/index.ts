export function fetchHeadDataSuccess(data) {
    return {
        type: 'SEARCH_HEAD_SUCCESS',
        payload: data
    };
}
export function fetchListDataSuccess(data) {
    return {
        type: 'SEARCH_LIST_SUCCESS',
        payload: data
    };
}
export function fetchHeadData(data) {
    return {
        type: 'SEARCH_HEAD',
        payload: data
    };
}
export function fetchListData(data) {
    return {
        type: 'SEARCH_LIST',
        payload: data
    };
}
export function refreshListData(data) {
    return {
        type: 'REFRESH_LIST',
        payload: data
    };
}
export function refreshListDataSuccess(data) {
    return {
        type: 'REFRESH_LIST_SUCCESS',
        payload: data
    };
}
export function initPage(data) {
    return {
        type: 'INIT_PAGE',
        payload: data
    };
}
export function setMoreListState(data) {
    return {
        type: 'SET_MORE_LISTSTATE',
        payload: data
    };
}
export function setHeadState(data) {
    return {
        type: 'SET_HEADSTATE',
        payload: data
    };
}
export function setPageState(data) {
    return {
        type: 'SET_PAGESTATE',
        payload: data
    };
}
export function sharePage(data) {
    return {
        type: 'SHARE_PAGE',
        payload: data
    };
}
export function setListState(data) {
    return {
        type: 'SET_LISTSTATE_STATE',
        payload: data
    };
}

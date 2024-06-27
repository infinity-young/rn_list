import { call, put, all, takeLatest } from 'redux-saga/effects';
import {
    fetchListDataSuccess,
    fetchHeadDataSuccess,
    refreshListDataSuccess,
    setMoreListState,
    setHeadState,
    setPageState,
    setListState
} from '@src/store/actions';
import { ListType, HeadType, PageState, ListState } from '@src/Interface';
import { headData, listData } from './mock';

function* performListSearch(params) {
    try {
        let data: ListType;
        if (!data) {
            yield put(setListState(ListState.LOADING));
            data = yield call(fetchListData, params);
        }
        if (data.error) {
            yield put(setListState(ListState.FALIED));
            console.log(' data error');
            return;
        }
        if (!data) {
            yield put(setMoreListState(false));
            yield put(setListState(ListState.EMPTY));
            return;
        }
        if (data) {
            yield put(fetchListDataSuccess(data));
            yield put(setMoreListState(true));
            yield put(setListState(ListState.SUCCESS));
        }
    } catch (e) {
        console.log('performListSearch,error====',e);
    }
}
function fetchListData(data): Promise<ListType> {
    return new Promise((resolve, reject) => {
        resolve(listData.data)
        // const url = 'https://mock/14789/trip/list';
        // const queryParams = new URLSearchParams(data).toString();
        // const fullUrl = `${url}?${queryParams}`;
    
        // fetch(fullUrl, {
        //   method: 'GET', 
        // })
        //     .then(response => {
        //    if (response.ok) {
        //     return response.json(); 
        //   } else {
        //     throw new Error('Network response was not ok.');
        //   }
        // })
        //     .then(response => {
        //  resolve(response.data); 
        // })
        //     .catch(error => {
        //  reject(error); 
        // });
      });
}
function* performHeadSearch(params) {
    try {
        let data;
        if (!data) {
            data = yield call(fetchHeadData, params);
        }

        if (data.error) {
            yield put(setHeadState(1));
            console.log(' data error');
            return;
        }
        if (!data) {
            yield put(setHeadState(3));
            return;
        }
        yield put(fetchHeadDataSuccess(data));
    } catch (e) {
        console.log('performHeadSearch,error');
    }
}

function fetchHeadData(data): Promise<HeadType> {
    return new Promise((resolve, reject) => {
        resolve(headData)
        // const url = 'https://test.com/mock/14789/trip/detail';
        // const queryParams = new URLSearchParams(data).toString();
        // const fullUrl = `${url}?${queryParams}`;
        // fetch(fullUrl, {
        //   method: 'GET', 
        // })
        // .then(response => {
        //     if (response.ok) {
        //     return response.json(); 
        //   } else {
        //     throw new Error('Network response was not ok.');
        //   }
        // })
        // .then(response => {
        //   resolve(response.data); 
        // })
        // .catch(error => {
        //   reject(error); 
        // });
      });
}
function* performrefreshListSearch(params) {
    try {
        let data;
        if (!data) {
            data = yield call(fetchListData, params);
        }
        if (data.error) {
            console.log(' data error');
            return;
        }
        if (data) {
            yield put(refreshListDataSuccess(data));
            return;
        }
    } catch (e) {
        console.log('performrefreshListSearch,error');
    }
}
function* initPage(params) {
    try {
        let head:HeadType;
        head = yield call(fetchHeadData, params.payload.head);
        let list;
        list = yield call(fetchListData, params.payload.list);
        if (list.error || head.error) {
            yield put(setPageState(PageState.FALIED));
            console.log(' data error');
            return;
        } else if (!list || !head) {
            yield put(setPageState(PageState.EMPTY));
            return;
        } else {
            yield put(fetchListDataSuccess(list));
            yield put(fetchHeadDataSuccess(head));
            yield put(setPageState(PageState.SUCCESS));
            yield put(setListState(ListState.SUCCESS));
        }
    } catch (e) {
        console.log('initPage,error');
    }
}
function performShare(params) {
    console.log("======分享===")
    // KNB.share({
    //     title: params.payload.title,
    //     desc: params.payload.recommendation,
    //     content:
    //         '【' + params.payload.title + '】' + params.payload.recommendation,
    //     image: params.payload.headerUrl,
    //     url: 'http://i.meituan.com',
    //     channel: [KNB.share.WECHAT_FRIENDS, KNB.share.WECHAT_TIMELINE],

    //     success: function () {
    //         KNB.toast({
    //             content: '分享成功',
    //             duration: 1
    //         });
    //     },
    //     fail: function (res) {
    //         if (res != null && res.errorCode === 0) {
    //             KNB.toast({
    //                 content: '分享失败',
    //                 duration: 1
    //             });
    //         }
    //     }
    // });
}
export default function* () {
    yield all([
        takeLatest('SEARCH_LIST', performListSearch),
        takeLatest('SEARCH_HEAD', performHeadSearch),
        takeLatest('REFRESH_LIST', performrefreshListSearch),
        takeLatest('INIT_PAGE', initPage),
        takeLatest('SHARE_PAGE', performShare)
    ]);
}

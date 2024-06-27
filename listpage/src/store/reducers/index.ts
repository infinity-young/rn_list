import { ListData, stateType } from '@src/Interface';

export default (state: stateType, action) => {
    switch (action.type) {
        case 'SEARCH_HEAD_SUCCESS':
            return {
                ...state,
                head: action.payload
            };
        case 'SEARCH_LIST_SUCCESS':
            let existData: Array<ListData> = state?.list?.data;
            let newData: Array<ListData> = action?.payload?.data;
            if (state?.list&&newData?.length>0) {
                return {
                    ...state,
                    list: {
                        data: existData.concat(newData)
                    }
                };
            } else {
                return {
                    ...state,
                    list: action.payload
                };
            }
        case 'REFRESH_LIST_SUCCESS':
            return {
                ...state,
                list: action.payload
            };
        case 'SET_PAGESTATE':
            return {
                ...state,
                pageState: action.payload
            };
        case 'SET_MORE_LISTSTATE':
            return {
                ...state,
                moreList: action.payload
            };
        case 'SET_LISTSTATE_STATE':
            return {
                ...state,
                listState: action.payload
            };
        default:
            return state;
    }
};

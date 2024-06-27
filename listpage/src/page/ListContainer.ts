import { connect } from 'react-redux';
import List from './List';
import { ListConfig, reInitProps, HeadData } from '@src/Interface';
import {
    fetchListData,
    refreshListData,
    initPage,
    sharePage
} from '@src/store/actions';

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = (dispatch: any) => ({
    loadMoreListData: (params: ListConfig) => dispatch(fetchListData(params)),
    refreshListData: (params: ListConfig) => dispatch(refreshListData(params)),
    refreshPage: (params: reInitProps) => dispatch(initPage(params)),
    share: (params: HeadData) => dispatch(sharePage(params))
});
const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);
export default ListContainer as any;

//export default connect(mapStateToProps, mapDispatchToProps)(List);红线问题

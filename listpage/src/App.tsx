import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Saga from '@src/store/saga';
import Reducer from '@src/store/reducers';
import React from 'react';
import { setMoreListState, setPageState, initPage } from '@src/store/actions';
import { View } from 'react-native';
import ListContainer from './page/ListContainer';
import { PageState } from '@src/Interface';
import { getID } from '@src/utils/getID';

export interface PropsType {}

interface State {
    rootStore;
}

export default class App extends React.PureComponent<PropsType, State> {
    constructor(props) {
        super(props);
        const sagaMiddleware = createSagaMiddleware();
        const rootStore = createStore(Reducer, applyMiddleware(sagaMiddleware));
        this.state = { rootStore: rootStore };
        sagaMiddleware.run(Saga);
        const initProps = {
            list: {
                start: 0,
                limit: 5,
                id: getID() ? getID() : 35
            },
            head: {
                id: getID() ? getID() : 35 //如果跳链能将id带入则使用带入id
            }
        };
        rootStore.dispatch(initPage(initProps));
        rootStore.dispatch(setPageState(PageState.LOADING));
        rootStore.dispatch(setMoreListState(true));
    }
    render() {
        return (
            <Provider store={this.state.rootStore}>
                <View>
                    <ListContainer />
                </View>
            </Provider>
        );
    }
}

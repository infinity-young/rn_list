import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Image,
    StyleSheet,
    Text,
    ActivityIndicator,
} from 'react-native';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import {
    PageProps,
    ListConfig,
    reInitProps,
    HeadData,
    ListState
} from '@src/Interface';
import Cell from './Cell';
import { AnyAction } from 'redux';
import Head from '@src/page/Head';
import { isIphoneX } from '@src/utils/iPhoneX';
import Loading from './Loading';
import {CouponItemAnimation} from './CouponItemAnimation'

const { width, height } = Dimensions.get('window');
let widthStateBar = 10;
let startNumber = 5;
const styles = StyleSheet.create({
    backButton: {
        width: 29,
        height: 29,
        position: 'absolute',
        left: widthStateBar
    },
    shareButton: {
        width: 29,
        height: 29,
        position: 'absolute',
        right: widthStateBar
    },
    listLine: {
        height: 1,
        backgroundColor: '#E8EAEC'
    },
    container: { flexGrow: 1 },
    containerHead: {
        width: Math.round(width) + 1,
        height: 200,
        marginBottom: 60
    },
    backImage: {
        width: Math.round(width) + 1,
        height: 200
    },
    headBar: {
        width: width,
        height: isIphoneX() ? 94 : 64,
        zIndex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    backTouch: {
        width: 29,
        height: 29,
        position: 'absolute',
        left: widthStateBar,
        marginTop: isIphoneX() ? 40 : 20,
        zIndex: 2
    },
    shareTouch: {
        width: 29,
        height: 29,
        position: 'absolute',
        right: widthStateBar,
        zIndex: 2,
        marginTop: isIphoneX() ? 40 : 20
    },
    loadMoreText: {
        fontSize: 15,
        color: 'red',
        textAlign: 'center'
    },
    loadMoreContainer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    flatlistContainer: {
        flexGrow: 1,
        height: isIphoneX() ? height - 50 : height - 20,
        marginTop: isIphoneX() ? -50 : -20
    },
    texBarContainer: {
        marginTop: isIphoneX() ? 40 : 20,
        zIndex: 1
    },
    textBar: {
        fontFamily: 'PingFangSC-Regular',
        fontWeight: '400',
        color: '#111111',
        fontSize: 17,
        zIndex: 1
    },
    loading: { flex: 1 }
});
const BackButton = () => {
    return (
        <Image style={styles.backButton} source={require('@assets/back.png')} />
    );
};
const ShareButton = () => {
    return (
        <Image
            style={styles.shareButton}
            source={require('@assets/share.png')}
        />
    );
};
const ListLine = () => {
    return <View style={styles.listLine} />;
};
const onPress = () => {
    //to do
    console.log("=====返回按钮=====");
};
let renderItem = (item, index) => {
    return <Cell data={item} index={index} key={index} />;
};
const initProps = {
    list: {
        start: 0,
        limit: 5,
        id: 35
    },
    head: {
        id: 35
    }
};
interface Props extends PageProps {
    loadMoreListData: (params: ListConfig) => AnyAction;
    refreshListData: (params: ListConfig) => AnyAction;
    refreshPage: (params: reInitProps) => AnyAction;
    share: (params: HeadData) => AnyAction;
}
interface state {
    isLoading: boolean;
    onEndReachedCalledDuringMomentum: boolean;
    opacityValue: number;
}

export default class List extends Component<Props, state> {
    private listRef;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            onEndReachedCalledDuringMomentum: true,
            opacityValue: 0
        };
    }

    setOnEndReachedCalledDuringMomentum(event) {
        this.setState({ onEndReachedCalledDuringMomentum: false });
        const {
            nativeEvent: {
                contentOffset: { y }
            }
        } = event;
        if (y < 0) {
            this.setState({
                opacityValue: 0
            });
        } else if (y > 240) {
            this.setState({
                opacityValue: 1
            });
        } else {
            this.setState({
                opacityValue: y / 240
            });
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.scrollToTop();
        }, 5000);
    }
    loadMoreData() {
        if (
            !this.state.onEndReachedCalledDuringMomentum &&
            this.props.moreList
        ) {
            const listProps = {
                start: startNumber,
                limit: 5,
                id: 35
            };
            this.props.loadMoreListData(listProps);
            startNumber = startNumber + 5;
            this.setState({ onEndReachedCalledDuringMomentum: true });
        }
    }

    renderLoadMoreView() {
        if (this.props.moreList) {
            let str = '';
            switch (this.props.listState) {
                case ListState.LOADING:
                    str = '正在加载';
                    break;
                case ListState.FALIED:
                    str = '请检查网络后重试';
                    break;
                // case ListState.EMPTY:
                //     str = '暂无数据，请点击重试';
                //     break;//返回数据为空是否一定为无更多数据，暂用moreList状态的管理是否还会有更多数据，现在的处理逻辑是如果在加载更多的时候返回空则表示没有数据，如果在初次加载的时候为空则重新请求
            }
            return (
                <View style={styles.loadMoreContainer}>
                    <View style={styles.loading} />

                    <View style={styles.loading}>
                        {this.props.listState === ListState.LOADING && (
                            <ActivityIndicator
                                animating={true}
                                color="red"
                                size="large"
                            />
                        )}
                        <Text style={styles.loadMoreText}>{str}</Text>
                    </View>
                    <View style={styles.loading} />
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={styles.loadMoreText}>
                        别拉了，我是有底线的
                    </Text>
                </View>
            );
        }
    }
    loadData() {
        this.setState({
            isLoading: true
        });
        const listProps = {
            start: 0,
            limit: 5,
            id: 35
        };
        this.props.refreshListData(listProps);
        startNumber = 5;

        this.setState({
            isLoading: false
        });
    }

    renderHead() {
        return <Head data={this.props?.head} />;
    }

    scrollToTop = () => {
        this.listRef?.scrollToOffset?.({
            offset: 0,
            animated: true
        });
    };

    _listRef = ref => {
        this.listRef = ref;
    };


    render() {
        if (this.state != null && this.props.pageState === 2) {
            return (
                <View style={styles.container}>
                    <TouchableHighlight
                            style={styles.backTouch}
                            onPress={onPress}
                            underlayColor="rgba(52,52,0)"
                        >
                            <BackButton />
                        </TouchableHighlight>
                        <View
                            style={{
                                ...styles.headBar,
                                opacity: this.state.opacityValue
                            }}
                        >
                            <View style={styles.texBarContainer}>
                                <Text style={styles.textBar}>榜单详情</Text>
                            </View>
                        </View>
                        <TouchableHighlight
                            style={styles.shareTouch}
                        onPress={() => {
                            // console.log("=======",this.props?.head)
                            this.props.share(this.props?.head)
                            }}
                            underlayColor="rgba(52,52,0)"
                        >
                            <ShareButton />
                        </TouchableHighlight>
                    <View style={styles.flatlistContainer}>
                    {/* 动画测试 因布局的关系需要注释掉列表才能看到动画效果*/}
                    {/* <CouponItemAnimation
                    animateLoopCount={3}
                    width={'100%'}
                    height={'100%'}
                >
                    <Text style={{height:1000,backgroundColor:'red'}}>hhh</Text>
                </CouponItemAnimation> */}
                    <FlatList
                        style={styles.flatlistContainer}
                        data={this.props?.list}
                        renderItem={({ item, index }) =>
                            renderItem(item, index)
                        }
                        ref={this._listRef}
                        ItemSeparatorComponent={ListLine}
                        ListHeaderComponent={this.renderHead()}
                        ListFooterComponent={this.renderLoadMoreView()}
                        onEndReached={() => this.loadMoreData()}
                        onEndReachedThreshold={0.2}
                        refreshing={this.state.isLoading}
                        onScroll={event =>
                            this.setOnEndReachedCalledDuringMomentum(
                                event
                            )
                        }
                        onRefresh={() => {
                            this.loadData();
                        }}
                    />
                   </View>
                </View>
            );
        } else {
            return (
                <Loading
                    pageState={this.props.pageState}
                    onClick={() => {
                        this.props.refreshPage(initProps);
                    }}
                />
            );
        }
    }

}

import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { PageState } from '@src/Interface';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    pageContainer: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingContent: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 200,
        height: 200,
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderRadius: 6
    },
    loadingIcon: {
        width: 100,
        height: 100
    },
    loadingText: {
        paddingLeft: 6,
        fontFamily: 'PingFangSC-Regular',
        fontSize: 20,
        color: '#111111',
        textAlign: 'center'
    }
});

interface IProps {
    pageState: number;
    onClick: () => void;
}

export default class Loading extends PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        let str = '';
        switch (this.props.pageState) {
            case PageState.LOADING:
                str = '加载中';
                break;
            case PageState.FALIED:
                str = '请检查网络后点击重试';
                break;
            case PageState.EMPTY:
                str = '暂无数据，请点击重试';
                break;
        }
        const loading = this.props.pageState === PageState.LOADING;
        const retry =
            this.props.pageState === PageState.EMPTY ||
            this.props.pageState === PageState.FALIED;
        return (
            <View style={styles.pageContainer}>
                <View style={styles.loadingContent}>
                    {loading && (
                        <Image
                            style={styles.loadingIcon}
                            source={require('@assets/loading.gif')}
                        />
                    )}

                    {loading && <Text style={styles.loadingText}>{str}</Text>}
                    {retry && (
                        <TouchableHighlight
                            onPress={() => this.props.onClick()}
                            underlayColor="rgba(52,52,0)"
                        >
                            <Text style={styles.loadingText}>{str}</Text>
                        </TouchableHighlight>
                    )}
                </View>
            </View>
        );
    }
}

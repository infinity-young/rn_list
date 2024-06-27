import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { HeadType } from '@src/Interface';
import { Dimensions } from 'react-native';
export interface Props extends HeadType {}
const { width } = Dimensions.get('window');
let widthStateBar = 10;
const styles = StyleSheet.create({
    containerHead: {
        width: Math.round(width) + 1,
        height: 180,
        marginBottom: 50
    },
    backImage: {
        width: Math.round(width) + 1,
        height: 180
    },
    backTouch: {
        width: 40,
        height: 40,
        position: 'absolute',
        left: widthStateBar,
        top: 20
    },
    shareTouch: {
        width: 40,
        height: 40,
        position: 'absolute',
        right: widthStateBar,
        top: 20
    },
    cardContainer: {
        borderRadius: 5,
        width: width - 16,
        marginHorizontal: 8,
        position: 'absolute',
        marginTop: 80,
        height: 125,
        flexShrink: 1,
        backgroundColor: '#ffffff'
    },
    cardContainerPosition: {
        marginLeft: 15,
        marginTop: 20,
        marginRight: 15,
        marginBottom: 15
    },
    cardImage: {
        width: 99,
        height: 31,
        marginBottom: 6
    },
    title: {
        fontSize: 22,
        color: '#000A14',
        fontWeight: '600',
        fontFamily: 'PingFangSC-Semibold'
    },
    recommendation: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'PingFangSC-Regular',
        color: '#6D6E6F'
    }
});

export default class OHPOITitleViewA extends PureComponent<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("====this.props?.data?.headerUrl===",this.props)
        return (
            <View style={styles.containerHead}>
                <Image
                    style={styles.backImage}
                    source={{
                        uri: this.props?.data?.data?.headerUrl
                    }}
                />
                <View style={styles.cardContainer}>
                    <View style={styles.cardContainerPosition}>
                        <Image
                            style={styles.cardImage}
                            source={require('@assets/log.png')}
                        />
                        <Text style={styles.title}>
                            {this.props?.data?.title}
                        </Text>
                        <Text style={styles.recommendation}>
                            {this.props?.data?.recommendation}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

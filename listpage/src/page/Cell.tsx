import React, { PureComponent } from 'react';
import { ListData } from '@src/Interface';

import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
const styles = StyleSheet.create({
    viewRoot: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        margin: 20
    },
    viewleft: {
        width: 120,
        height: 116,
        marginRight: 12
    },
    frontImg: {
        position: 'absolute',
        width: 120,
        height: 116,
        borderRadius: 3
    },
    info: {
        backgroundColor: '#D23817',
        height: 24,
        width: 42,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },

    viewright: {
        height: 116,
        justifyContent: 'space-between'
    },
    poiNameText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#0B0D0F',
        fontFamily: 'PingFangSC-Medium'
    },
    starAndCommon: {
        flexDirection: 'row',
        height: 12
    },
    starContainer: {
        flexDirection: 'row'
    },
    score: {
        width: 12,
        height: 12,
        marginHorizontal: 1
    },
    markNum: {
        fontSize: 12,
        color: '#FF6633',
        marginLeft: 6
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tag: {
        borderColor: '#E5C085',
        color: '#D19C4F',
        borderWidth: 2,
        fontSize: 10,
        marginLeft: 4,
        borderRadius: 3,
        fontWeight: '400'
    },
    priceAndDistance: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginHorizontal: 3.5
    },
    textCotainer: {
        height: 16,
        paddingHorizontal: 3.5
    },
    viewRightLastRow: {
        fontSize: 12,
        borderRightWidth: 2,
        borderRightColor: 'gray',
        paddingHorizontal: 3.5,
        color: '#6D6E6F',
        fontWeight: '400'
    },
    describle: {
        flexWrap: 'wrap',
        overflow: 'hidden'
    },
    changeTop: {
        backgroundColor: '#E5C085'
    },
    partitionLine: {
        height: 10,
        width: 2,
        backgroundColor: '#ACACAC',
        marginHorizontal: 3.5
    },
    topText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: '800'
    }
});
interface CellProps {
    data: ListData;
    index: number;
}
export default class Cell extends PureComponent<CellProps> {
    onPressList(item) {
         //to do
         console.log("=====打开URL===")
    }
    StarNum = [];
    numOfScore(score) {
        this.StarNum = [];
        let j = score;
        for (let i = 0; i < score - 1; i++) {
            this.StarNum.push(1);
            j = j - 1;
        }
        if (j < 1) this.StarNum.push(0.5);
        else this.StarNum.push(1);
        return this.StarNum.map((tag, index) => {
            return tag === 1 ? (
                <View key={index}>
                    <Image
                        style={styles.score}
                        source={require('@assets/star.png')}
                    />
                </View>
            ) : (
                <View key={index}>
                    <Image
                        style={styles.score}
                        source={require('@assets/halfStar.png')}
                    />
                </View>
            );
        });
    }
    render() {
        const frontImgAfterReplace = this.props.data.frontImg.replace(
            'w.h',
            '120.120'
        );
        return (
            <TouchableHighlight
                onPress={() => this.onPressList(this.props.data)}
                underlayColor="rgba(52,52,0)"
            >
                <View style={[styles.viewRoot]}>
                    <View style={[styles.viewleft]}>
                        <View>
                            <Image
                                style={[styles.frontImg]}
                                source={{ uri: frontImgAfterReplace }}
                            />
                        </View>

                        <View
                            style={[
                                styles.info,
                                this.props.index > 2 ? styles.changeTop : null
                            ]}
                        >
                            <Text style={styles.topText}>
                                TOP{this.props.index + 1}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.viewright]}>
                        <View>
                            <Text style={styles.poiNameText}>
                                {this.props.data.poiName}
                            </Text>
                        </View>
                        <View style={styles.starAndCommon}>
                            {
                                <View style={styles.starContainer}>
                                    {this.numOfScore(this.props.data.score)}
                                </View>
                            }
                            <View>
                                <Text style={styles.markNum}>
                                    {this.props.data.markNum}条评价
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tagContainer}>
                            {this.props.data.honeyBombTags.map((tag, index) => {
                                return (
                                    <Text style={[styles.tag]} key={index}>
                                        {tag.title}
                                    </Text>
                                );
                            })}
                        </View>
                        <View style={styles.priceAndDistance}>
                            <Text style={styles.viewRightLastRow}>
                                {this.props.data.lowestPrice}起
                            </Text>
                            <View style={styles.partitionLine} />
                            <Text style={[styles.viewRightLastRow]}>
                                {this.props.data.areaName}
                            </Text>
                            <Text style={styles.viewRightLastRow}>
                                {this.props.data.distance}
                            </Text>
                        </View>

                        <View style={styles.describle}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                                style={styles.viewRightLastRow}
                            >
                                "{this.props.data.recommendBooth}”
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

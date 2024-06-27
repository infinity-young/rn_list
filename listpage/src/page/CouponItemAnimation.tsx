import React, { PureComponent } from 'react';
import {
    ViewProps,
    View,
    StyleSheet,
    Animated,
    LayoutChangeEvent,
    InteractionManager,
    Easing
} from 'react-native';

export interface CouponItemAnimationProps extends ViewProps {
    animateLoopCount?: number; // 默认3次
    width: number | string;
    height: number | string;
}

interface IState {
    animateStart: boolean;
    showAnimateImg: boolean;
}

const styles = StyleSheet.create({
    container: {
        opacity: 1,
        overflow: 'hidden',
        flex: 1
    },
    amContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        overflow: 'hidden'
    }
});
export class CouponItemAnimation extends PureComponent<
    CouponItemAnimationProps,
    IState
> {
    animateX = new Animated.Value(-30);
    pzItemWidth = 0;
    animateLoopCount = 0;

    constructor(props) {
        super(props);
        this.state = {
            animateStart: false,
            showAnimateImg: true
        };
    }
    _barItemLayout = (event: LayoutChangeEvent) => {
        this.pzItemWidth = event.nativeEvent.layout.width;
        setTimeout(() => {
            if (!this.state.animateStart) {
                this.setState(
                    {
                        animateStart: true
                    },
                    () => {
                        this.startAnimation();
                    }
                );
            }
        }, 1000);
    };

    startAnimation = () => {
        if (this.animateLoopCount >= this.props.animateLoopCount ?? 2) {
            this.setState({
                showAnimateImg: false
            });
            return;
        }
        this.animateLoopCount++;
        this.animateX.setValue(-30);
        InteractionManager.runAfterInteractions(() => {
            Animated.timing(this.animateX, {
                toValue: this.pzItemWidth,
                duration: 730,
                easing: Easing.bezier(0.26, 0, 0.6, 0.2),
                useNativeDriver: true,
                delay: this.animateLoopCount === 1 ? 0 : 540
            }).start(() => {
                this.startAnimation();
            });
        });
    };

    render(): React.ReactNode {
        return (
            <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={[
                    styles.container,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                        width: this.props.width,
                        height: this.props.height
                    }
                ]}
                {...this.props}
                onLayout={this._barItemLayout}
            >
                {this.props.children}
                <View style={styles.amContainer}>
                    {this.state.showAnimateImg && (
                        <Animated.Image
                            source={require('../assets/icon_couponbar_pzq_shine.png')}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: 30,
                                height: this.props.height,
                                transform: [{ translateX: this.animateX }]
                            }}
                        />
                    )}
                </View>
            </View>
        );
    }
}

import React from 'react';
import {
    useAnimatedGestureHandler,
    Easing,
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    useDerivedValue,
    interpolate,
    Extrapolate,
    sequence
} from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

import { SeekButton, TimeQuantity, Prev, Next, RunText } from './styles';

export default function ControlView({ inverted, onPress }) {
    const animation = useSharedValue(0);
    const translation = useSharedValue(0);

    const tapGestureHandler = useAnimatedGestureHandler({
        onEnd: () => {
            animation.value = sequence(withTiming(1, config), withTiming(0, config));
            translation.value = sequence(
                withTiming(inverted ? - 50 : 50, config),
                withTiming(0, { ...config, duration: 0 })
            );
            onPress();
        }
    });

    const config = {
        duration: 50,
        easing: Easing.inOut(Easing.ease),
    };

    const rotate = useDerivedValue(() => {
        return interpolate(animation.value,
            [0, 1],
            [0, inverted ? -30 : 30],
            Extrapolate.CLAMP
        );
    });

    const scale = useDerivedValue(() => {
        return interpolate(animation.value,
            [0, 1],
            [1, 0.8],
            Extrapolate.CLAMP
        );
    });

    const scaleStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scale.value
                },
                {
                    rotate: `${rotate.value}deg`
                }
            ]
        }
    });

    const labelStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(animation.value, [0, 0.1, 1], [1, 0, 0], Extrapolate.CLAMP)
        }
    });

    const runTextStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translation.value
            }]
        }
    });

    return (
        <TapGestureHandler onGestureEvent={tapGestureHandler}>
            <SeekButton style={scaleStyle}>
                {inverted && <Prev name="refresh" />}
                {!inverted && <Next name="refresh" />}
                <TimeQuantity
                    style={labelStyle}
                >{inverted ? "-10" : "10+"}</TimeQuantity>
                <RunText
                    style={runTextStyle}
                >{inverted ? "-10" : "10+"}</RunText>
            </SeekButton>
        </TapGestureHandler>
    )
}
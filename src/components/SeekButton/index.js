import React from 'react';
import Animated, {
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

export default function ControlView({ inverted, onPress, reference, opacity }) {
    const animation = useSharedValue(0);
    const translation = useSharedValue(0);

    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

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

    const doubleTapGesstureHandler = useAnimatedGestureHandler({
        onEnd: () => {
            animation.value = sequence(withTiming(1, config), withTiming(0, config));
            translation.value = sequence(
                withTiming(inverted ? - 50 : 50, config),
                withTiming(0, { ...config, duration: 0 })
            );
            onPress();
        }
    });

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
            ],
            opacity: withTiming(opacity.value, config)
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
        <TapGestureHandler
            onGestureEvent={doubleTapGesstureHandler}
            numberOfTaps={2}
            maxDelayMs={150}
            ref={reference}
        >
            <Animated.View style={{
                height: '100%',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
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
            </Animated.View>
        </TapGestureHandler>
    )
}
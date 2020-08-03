import React from 'react';
import { Dimensions } from 'react-native';
import { Container, Progress, Cursor } from './styles';

import {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    useAnimatedGestureHandler,
    withTiming,
    Easing,
    delay
} from 'react-native-reanimated';

import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';

export default function ProgressBar({ progress, length, opacity, play, pause, playerRef }) {

    const translateX = useSharedValue(0);
    const cursorOpacity = useSharedValue(0);

    function getProgress(value, total) {
        'worklet';
        return (100 * value) / total;
    }

    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const width = useDerivedValue(() => {
        return getProgress(progress.value, length.value);
    });

    const onStart = () => {
        pause(false);
        cursorOpacity.value = withTiming(1, config);
    }

    const onActive = (event, ctx) => {
        translateX.value = event.absoluteX;
    }

    const onEnd = () => {
        play();
        cursorOpacity.value = delay(2500, withTiming(0, config));
        const width = Dimensions.get('window').width - 15 - 45;
        const goTo = (length.value * translateX.value) / width;

        playerRef.current.seek(goTo);
    }

    const gestureHandler = useAnimatedGestureHandler({
        onStart,
        onActive,
        onEnd
    });

    const panGestureHandler = useAnimatedGestureHandler({
        onStart,
        onActive,
        onEnd
    });

    const style = useAnimatedStyle(() => {
        return {
            width: `${width.value}%`,
            opacity: withTiming(opacity.value, config)
        };
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, config)
        };
    });

    const cursorStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translateX.value - 15
            }],
            opacity: cursorOpacity.value
        };
    });

    return (
        <TapGestureHandler
            onGestureEvent={gestureHandler}
            hitSlop={{ top: 20, bottom: 20 }}
        >
            <Container style={containerStyle}>
                <Progress {...{ style }} />
                <PanGestureHandler
                    onGestureEvent={panGestureHandler}
                    hitSlop={{ top: 20, bottom: 20 }}
                >
                    <Cursor style={cursorStyle} />
                </PanGestureHandler>
            </Container>
        </TapGestureHandler >
    )
}
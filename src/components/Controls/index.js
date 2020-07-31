import React, { useState, useEffect, useRef, createRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated,
{
    useAnimatedGestureHandler,
    Easing, useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

import { Container, Controls, Button, Icon, Row } from './styles';

import Orientarion from '../Orientarion';
import ProgressBar from '../ProgressBar';
import SeekButton from '../SeekButton';

export default function ControlView({
    opacity,
    progress,
    length,
    paused,
    loading,
    play,
    pause,
    reload,
    restart,
    hideControls,
    showControls,
    isFullscreen,
    setFullscreen,
    forward10Sec,
    backward10Sec
}) {
    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const name = reload ? 'reload' : paused ? 'play' : 'pause';
    const onPress = reload ? restart : paused ? play : pause;

    console.log(paused);

    const buttomGestureHandler = useAnimatedGestureHandler({
        onEnd: () => {
            console.log(paused);
            onPress();
        }
    });

    const doubleTapLeft = createRef();
    const doubleTapRight = createRef();
    const centerButton = createRef();

    const style = StyleSheet.absoluteFillObject;

    const styledControl = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, config),
            //zIndex: opacity.value === 1 ? 10 : -100
        }
    });

    const onGestureHandler = useAnimatedGestureHandler({
        onEnd: () => {
            if (opacity.value === 1)
                hideControls();
            else
                showControls();
        }
    })

    return (
        <TapGestureHandler
            onGestureEvent={onGestureHandler}
            waitFor={[doubleTapLeft, doubleTapRight, centerButton]}
        >
            <Container {...{ style }}>
                {!loading &&
                    <Controls style={[style, styledControl]}>
                        <Row>
                            <SeekButton
                                inverted
                                onPress={backward10Sec}
                                reference={doubleTapLeft}
                            />
                            <TapGestureHandler
                                onGestureEvent={buttomGestureHandler}
                                ref={centerButton}
                            >
                                <Button>
                                    <Icon
                                        {...{ name }}
                                        size={40}
                                    />
                                </Button>
                            </TapGestureHandler>
                            <SeekButton
                                onPress={forward10Sec}
                                reference={doubleTapRight}
                            />
                        </Row>
                        <Orientarion
                            {...{
                                isFullscreen,
                                setFullscreen
                            }}
                        />
                        <ProgressBar {...{ progress, length }} />
                    </Controls>
                }
            </Container >
        </TapGestureHandler>
    )
}
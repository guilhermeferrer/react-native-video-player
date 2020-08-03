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
    backward10Sec,
    playerRef
}) {
    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const playGestureHandler = useAnimatedGestureHandler({
        onEnd: () => {
            play();
        }
    });

    const pauseGestureHandler = useAnimatedGestureHandler({
        onEnd: () => {
            pause();
        }
    });

    const restartGestureHandler = useAnimatedGestureHandler({
        onEnd: () => {
            restart();
        }
    });

    const doubleTapLeft = createRef();
    const doubleTapRight = createRef();
    const centerButton = createRef();

    const style = StyleSheet.absoluteFillObject;

    const buttonStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, config)
        }
    });

    const onGestureHandler = useAnimatedGestureHandler({
        onEnd: () => {
            if (opacity.value === 1)
                hideControls();
            else
                showControls();
        }
    });

    function renderPlayButtom() {
        if (!paused || reload) return null;
        return (
            <TapGestureHandler
                onGestureEvent={playGestureHandler}
                ref={centerButton}
            >
                <Button>
                    <Icon
                        name={'play'}
                        size={40}
                    />
                </Button>
            </TapGestureHandler>
        )
    }

    function renderPauseButton() {
        if (paused) return null;
        return (
            <TapGestureHandler
                onGestureEvent={pauseGestureHandler}
                ref={centerButton}
            >
                <Button>
                    <Icon
                        name={'pause'}
                        size={40}
                    />
                </Button>
            </TapGestureHandler>
        )
    }

    function renderRestartButtom() {
        if (!reload) return null;
        return (
            <TapGestureHandler
                onGestureEvent={restartGestureHandler}
                ref={centerButton}
            >
                <Button>
                    <Icon
                        name={'reload'}
                        size={40}
                    />
                </Button>
            </TapGestureHandler>
        )
    }

    return (
        <TapGestureHandler
            onGestureEvent={onGestureHandler}
            waitFor={[doubleTapLeft, doubleTapRight, centerButton]}
        >
            <Container {...{ style }}>
                <Controls style={[style]}>
                    <Row>
                        <SeekButton
                            inverted
                            onPress={backward10Sec}
                            reference={doubleTapLeft}
                            {...{ opacity }}
                        />
                        <Animated.View style={buttonStyle}>
                            {!loading && renderPauseButton()}
                            {!loading && renderPlayButtom()}
                            {!loading && renderRestartButtom()}
                        </Animated.View>
                        <SeekButton
                            onPress={forward10Sec}
                            reference={doubleTapRight}
                            {...{ opacity }}
                        />
                    </Row>
                    <Orientarion
                        {...{
                            isFullscreen,
                            setFullscreen,
                            opacity
                        }}
                    />
                    <ProgressBar {...{ progress, length, opacity, play, pause, playerRef }} />
                </Controls>
            </Container >
        </TapGestureHandler>
    )
}
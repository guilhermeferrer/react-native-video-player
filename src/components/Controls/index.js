import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { useAnimatedGestureHandler, Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

import { Container, Controls, Button, Icon } from './styles';

import Orientarion from '../Orientarion';
import ProgressBar from '../ProgressBar';

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
    setFullscreen
}) {

    const tapGestureHandler = useAnimatedGestureHandler({
        onEnd: () => {
            opacity.value = 1;
        }
    });

    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const style = StyleSheet.absoluteFillObject;

    const styledControl = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, config),
            zIndex: opacity.value === 1 ? 10 : -100
        }
    });

    function renderButton() {
        const name = reload ? 'reload' : paused ? 'play' : 'pause';
        const onPress = reload ? restart : paused ? play : pause;

        return (
            <Button {...{ onPress }}>
                <Icon
                    {...{ name }}
                    size={40}
                />
            </Button>
        )
    }

    return (
        <Container {...{ style }}>
            {!loading &&
                <Controls style={[style, styledControl]}>
                    <TouchableWithoutFeedback onPress={() => {
                        if (opacity.value === 1)
                            hideControls();
                        else
                            showControls();
                    }}>
                        <View {...{ style }} />
                    </TouchableWithoutFeedback>
                    {renderButton()}
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
    )
}